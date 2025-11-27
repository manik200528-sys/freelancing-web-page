import { create } from 'zustand';
import { Conversation, Message } from '../types';
import { conversations as mockConversations, messages as mockMessages } from '../lib/dummy-data';

interface MessagesState {
  conversations: Conversation[];
  activeConversationId: string | null;
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  fetchConversations: () => Promise<void>;
  setActiveConversation: (id: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  activeConversation: null,
  messages: [],
  isLoading: false,
  error: null,
  
  fetchConversations: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulated API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter conversations for current user (in a real app, the API would handle this)
      const userConversations = mockConversations.filter(c => 
        c.participants.includes('user1')
      );
      
      // Sort conversations by last updated
      const sortedConversations = [...userConversations].sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      
      set({ 
        conversations: sortedConversations,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch conversations', isLoading: false });
    }
  },
  
  setActiveConversation: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Find the conversation
      const conversation = get().conversations.find(c => c.id === id) || null;
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      
      // Simulated API call to fetch messages
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter messages for this conversation
      const conversationMessages = mockMessages
        .filter(m => m.conversationId === id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      set({ 
        activeConversationId: id,
        activeConversation: conversation,
        messages: conversationMessages,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to load conversation', 
        isLoading: false 
      });
    }
  },
  
  sendMessage: async (content: string) => {
    if (!get().activeConversationId) {
      set({ error: 'No active conversation' });
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create a new message
      const newMessage: Message = {
        id: `message-${Date.now()}`,
        conversationId: get().activeConversationId!,
        senderId: 'user1', // Current user ID
        content,
        readAt: null,
        createdAt: new Date().toISOString(),
      };
      
      // Add the message to the local state
      set(state => ({
        messages: [...state.messages, newMessage],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to send message', isLoading: false });
    }
  }
}));