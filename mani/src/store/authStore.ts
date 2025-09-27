import { create } from 'zustand';
import { User } from '../types';
import { authService, userService } from '../lib/api';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, captchaToken?: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  
  login: async (email: string, password: string, captchaToken?: string) => {
    set({ isLoading: true, error: null });
    try {
      const { session } = await authService.signIn(email, password, captchaToken);
      
      if (session?.user) {
        // Try to get additional user data from the users table
        try {
          const userData = await userService.getUser(session.user.id);
          
          set({ 
            user: {
              id: session.user.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatar: userData.avatar_url || undefined,
              createdAt: userData.created_at
            }, 
            isLoading: false 
          });
        } catch (error) {
          // If user record doesn't exist in the users table, create it
          const metadata = session.user.user_metadata || {};
          const role = metadata.role || 'client'; // Default to client if role not specified
          
          // Create user record in users table
          await supabase.from('users').insert({
            id: session.user.id,
            name: metadata.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email as string,
            role: role,
            created_at: new Date().toISOString()
          });
          
          // Set user state with available data
          set({
            user: {
              id: session.user.id,
              name: metadata.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email as string,
              role: role as 'client' | 'freelancer' | 'admin',
              createdAt: new Date().toISOString()
            },
            isLoading: false
          });
          
          // Create client or freelancer record if needed
          if (role === 'client') {
            await supabase.from('clients').insert({
              user_id: session.user.id,
              created_at: new Date().toISOString()
            });
          } else if (role === 'freelancer') {
            await supabase.from('freelancers').insert({
              user_id: session.user.id,
              title: '',
              skills: [],
              hourly_rate: 0,
              bio: '',
              experience: 0,
              availability: 'available',
              created_at: new Date().toISOString()
            });
          }
        }
      } else {
        set({ error: 'Invalid email or password', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message || 'An error occurred during login', isLoading: false });
    }
  },
  
  register: async (userData: Partial<User>, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Register user with Supabase Auth - with email confirmation
      const { user: authUser, session } = await authService.signUp(
        userData.email as string, 
        password, 
        userData
      );
      
      if (!authUser) {
        throw new Error('Registration failed');
      }

      // Check if email confirmation is required
      if (!session) {
        set({ 
          user: null,
          isLoading: false,
          error: 'Please check your email for a confirmation link to complete your registration' 
        });
        return;
      }
      
      // If email confirmation is not required or already confirmed
      try {
        await supabase.from('users').insert({
          id: authUser.id,
          name: userData.name as string,
          email: userData.email as string,
          role: userData.role as 'client' | 'freelancer' | 'admin',
          avatar_url: userData.avatar as string || null,
          created_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error creating user record:', error);
        // Continue anyway, user might already exist
      }
      
      // If the user is a client, create a client record
      if (userData.role === 'client') {
        try {
          await supabase.from('clients').insert({
            user_id: authUser.id,
            created_at: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error creating client record:', error);
          // Continue anyway
        }
      }
      
      // If the user is a freelancer, create a freelancer record
      if (userData.role === 'freelancer') {
        try {
          await supabase.from('freelancers').insert({
            user_id: authUser.id,
            title: '',
            skills: [],
            hourly_rate: 0,
            bio: '',
            experience: 0,
            availability: 'available',
            created_at: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error creating freelancer record:', error);
          // Continue anyway
        }
      }
      
      set({ 
        user: {
          id: authUser.id,
          name: userData.name as string,
          email: userData.email as string,
          role: userData.role as 'client' | 'freelancer' | 'admin',
          avatar: userData.avatar,
          createdAt: new Date().toISOString()
        }, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message || 'An error occurred during registration', isLoading: false });
    }
  },
  
  logout: async () => {
    try {
      await authService.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear the user even if there's an error
      set({ user: null });
    }
  },
  
  clearError: () => {
    set({ error: null });
  }
}));

// Initialize auth state on app load
const initAuth = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      try {
        // Try to get user data from the users table
        const userData = await userService.getUser(session.user.id);
        
        useAuthStore.setState({ 
          user: {
            id: session.user.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            avatar: userData.avatar_url || undefined,
            createdAt: userData.created_at
          },
          isLoading: false
        });
      } catch (error) {
        // If user data doesn't exist, create a minimal user
        console.error('Error fetching user data, creating minimal user:', error);
        const metadata = session.user.user_metadata || {};
        
        useAuthStore.setState({
          user: {
            id: session.user.id,
            name: metadata.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email as string,
            role: 'client', // Default role
            createdAt: new Date().toISOString()
          },
          isLoading: false
        });
      }
    } else {
      useAuthStore.setState({ isLoading: false });
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
    useAuthStore.setState({ isLoading: false });
  }
};

// Initialize auth state
initAuth();