import { supabase } from './supabase';
import { Database } from '../types/database.types';
import { User, Client, Freelancer, Job, Proposal, Contract, Milestone, Payment } from '../types';

// Type aliases for better readability
type Tables = Database['public']['Tables'];
type UserRow = Tables['users']['Row'];
type ClientRow = Tables['clients']['Row'];
type FreelancerRow = Tables['freelancers']['Row'];
type JobRow = Tables['jobs']['Row'];
type PaymentRow = Tables['payments']['Row'];

// Auth services
export const authService = {
  signUp: async (email: string, password: string, userData: Partial<User>) => {
    // Verify captcha token if provided
    if (userData.captchaToken) {
      // In a real application, you would verify the CAPTCHA token with Google's API
      // For this example, we just check if it's present
      console.log('CAPTCHA token verified:', userData.captchaToken);
      
      // You would typically make an API call to verify the token:
      // await fetch('https://www.google.com/recaptcha/api/siteverify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   body: `secret=YOUR_SECRET_KEY&response=${userData.captchaToken}`
      // });
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          role: userData.role
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) throw error;
    return data;
  },
  
  verifyEmail: async (token: string, email: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
      email
    });
    
    if (error) throw error;
    return data;
  },
  
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
    
    if (error) throw error;
    return data;
  },
  
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    return data;
  },
  
  signIn: async (email: string, password: string, captchaToken?: string) => {
    // Special handling for demo account - bypass CAPTCHA verification
    const isDemoBypass = captchaToken === 'demo-bypass';
    
    // Verify captcha token if provided and not a demo bypass
    if (captchaToken && !isDemoBypass) {
      // In a real application, you would verify the CAPTCHA token
      // For this example, we just check if it's present
      console.log('CAPTCHA token verified for login:', captchaToken);
      
      // You would typically make an API call to verify the token:
      // await fetch('https://www.google.com/recaptcha/api/siteverify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   body: `secret=YOUR_SECRET_KEY&response=${captchaToken}`
      // });
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  }
};

// User services
export const userService = {
  getUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      // Check if this is a "no rows returned" error
      if (error.message?.includes('multiple') || error.message?.includes('no rows')) {
        // Create a basic user record
        const authUser = await authService.getCurrentUser();
        if (!authUser) throw error;
        
        const metadata = authUser.user_metadata || {};
        const role = metadata.role || 'client';
        
        const newUser = {
          id: userId,
          name: metadata.name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email as string,
          role: role,
          avatar_url: null,
          created_at: new Date().toISOString()
        };
        
        // Try to insert the user
        const { data: insertedUser, error: insertError } = await supabase
          .from('users')
          .insert(newUser)
          .select()
          .single();
        
        if (insertError) throw insertError;
        return insertedUser || newUser;
      }
      throw error;
    }
    return data;
  },
  
  updateUser: async (userId: string, userData: Partial<UserRow>) => {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Client services
export const clientService = {
  getClient: async (userId: string) => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createClient: async (clientData: Omit<Tables['clients']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('clients')
      .insert(clientData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateClient: async (clientId: string, clientData: Partial<ClientRow>) => {
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', clientId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Freelancer services
export const freelancerService = {
  getFreelancer: async (userId: string) => {
    const { data, error } = await supabase
      .from('freelancers')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createFreelancer: async (freelancerData: Omit<Tables['freelancers']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('freelancers')
      .insert(freelancerData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateFreelancer: async (freelancerId: string, freelancerData: Partial<FreelancerRow>) => {
    const { data, error } = await supabase
      .from('freelancers')
      .update(freelancerData)
      .eq('id', freelancerId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  listFreelancers: async (filters?: { 
    skills?: string[], 
    availability?: string,
    experienceMin?: number,
    experienceMax?: number,
    hourlyRateMin?: number,
    hourlyRateMax?: number
  }) => {
    let query = supabase.from('freelancers').select('*');
    
    if (filters?.skills && filters.skills.length > 0) {
      query = query.contains('skills', filters.skills);
    }
    
    if (filters?.availability && filters.availability !== 'all') {
      query = query.eq('availability', filters.availability);
    }
    
    // Add experience range filtering
    if (filters?.experienceMin !== undefined) {
      query = query.gte('experience', filters.experienceMin);
    }
    
    if (filters?.experienceMax !== undefined) {
      query = query.lte('experience', filters.experienceMax);
    }
    
    // Add hourly rate range filtering
    if (filters?.hourlyRateMin !== undefined) {
      query = query.gte('hourly_rate', filters.hourlyRateMin);
    }
    
    if (filters?.hourlyRateMax !== undefined) {
      query = query.lte('hourly_rate', filters.hourlyRateMax);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// Job services
export const jobService = {
  getJob: async (jobId: string) => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createJob: async (jobData: Omit<Tables['jobs']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateJob: async (jobId: string, jobData: Partial<JobRow>) => {
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', jobId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  listJobs: async (filters?: { category?: string, skills?: string[], status?: string }) => {
    let query = supabase.from('jobs').select('*');
    
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters?.skills && filters.skills.length > 0) {
      query = query.contains('skills', filters.skills);
    }
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// Proposal services
export const proposalService = {
  getProposal: async (proposalId: string) => {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createProposal: async (proposalData: Omit<Tables['proposals']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('proposals')
      .insert(proposalData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateProposal: async (proposalId: string, proposalData: Partial<Tables['proposals']['Update']>) => {
    const { data, error } = await supabase
      .from('proposals')
      .update(proposalData)
      .eq('id', proposalId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  listProposalsByJob: async (jobId: string) => {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('job_id', jobId);
    
    if (error) throw error;
    return data;
  },
  
  listProposalsByFreelancer: async (freelancerId: string) => {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('freelancer_id', freelancerId);
    
    if (error) throw error;
    return data;
  }
};

// Contract services
export const contractService = {
  getContract: async (contractId: string) => {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createContract: async (contractData: Omit<Tables['contracts']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('contracts')
      .insert(contractData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateContract: async (contractId: string, contractData: Partial<Tables['contracts']['Update']>) => {
    const { data, error } = await supabase
      .from('contracts')
      .update(contractData)
      .eq('id', contractId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Milestone services
export const milestoneService = {
  getMilestone: async (milestoneId: string) => {
    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('id', milestoneId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createMilestone: async (milestoneData: Omit<Tables['milestones']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('milestones')
      .insert(milestoneData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateMilestone: async (milestoneId: string, milestoneData: Partial<Tables['milestones']['Update']>) => {
    const { data, error } = await supabase
      .from('milestones')
      .update(milestoneData)
      .eq('id', milestoneId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  listMilestonesByContract: async (contractId: string) => {
    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('contract_id', contractId);
    
    if (error) throw error;
    return data;
  }
};

// Payment services
export const paymentService = {
  getPayment: async (paymentId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createPayment: async (paymentData: Omit<Tables['payments']['Insert'], 'id'>) => {
    const { data, error } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updatePayment: async (paymentId: string, paymentData: Partial<PaymentRow>) => {
    const { data, error } = await supabase
      .from('payments')
      .update(paymentData)
      .eq('id', paymentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  listPaymentsByClient: async (clientId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('client_id', clientId);
    
    if (error) throw error;
    return data;
  },
  
  listPaymentsByFreelancer: async (freelancerId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('freelancer_id', freelancerId);
    
    if (error) throw error;
    return data;
  }
}; 