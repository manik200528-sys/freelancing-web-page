export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'client' | 'freelancer' | 'admin';
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: 'client' | 'freelancer' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'client' | 'freelancer' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          company: string | null;
          industry: string | null;
          description: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company?: string | null;
          industry?: string | null;
          description?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company?: string | null;
          industry?: string | null;
          description?: string | null;
          location?: string | null;
          created_at?: string;
        };
      };
      freelancers: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          skills: string[];
          hourly_rate: number;
          bio: string;
          location: string | null;
          experience: number;
          availability: 'available' | 'limited' | 'unavailable';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          skills: string[];
          hourly_rate: number;
          bio: string;
          location?: string | null;
          experience: number;
          availability: 'available' | 'limited' | 'unavailable';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          skills?: string[];
          hourly_rate?: number;
          bio?: string;
          location?: string | null;
          experience?: number;
          availability?: 'available' | 'limited' | 'unavailable';
          created_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          client_id: string;
          title: string;
          description: string;
          skills: string[];
          category: string;
          budget_min: number;
          budget_max: number;
          type: 'fixed' | 'hourly';
          duration: string | null;
          status: 'open' | 'in-progress' | 'completed' | 'cancelled';
          location: 'remote' | 'onsite' | 'hybrid';
          created_at: string;
          expiry: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          title: string;
          description: string;
          skills: string[];
          category: string;
          budget_min: number;
          budget_max: number;
          type: 'fixed' | 'hourly';
          duration?: string | null;
          status: 'open' | 'in-progress' | 'completed' | 'cancelled';
          location: 'remote' | 'onsite' | 'hybrid';
          created_at?: string;
          expiry?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          title?: string;
          description?: string;
          skills?: string[];
          category?: string;
          budget_min?: number;
          budget_max?: number;
          type?: 'fixed' | 'hourly';
          duration?: string | null;
          status?: 'open' | 'in-progress' | 'completed' | 'cancelled';
          location?: 'remote' | 'onsite' | 'hybrid';
          created_at?: string;
          expiry?: string | null;
        };
      };
      proposals: {
        Row: {
          id: string;
          job_id: string;
          freelancer_id: string;
          cover_letter: string;
          bid: number;
          estimated_duration: string;
          status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          freelancer_id: string;
          cover_letter: string;
          bid: number;
          estimated_duration: string;
          status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          freelancer_id?: string;
          cover_letter?: string;
          bid?: number;
          estimated_duration?: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at?: string;
        };
      };
      contracts: {
        Row: {
          id: string;
          job_id: string;
          client_id: string;
          freelancer_id: string;
          proposal_id: string;
          terms: string;
          status: 'active' | 'completed' | 'cancelled';
          start_date: string;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          client_id: string;
          freelancer_id: string;
          proposal_id: string;
          terms: string;
          status: 'active' | 'completed' | 'cancelled';
          start_date: string;
          end_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          client_id?: string;
          freelancer_id?: string;
          proposal_id?: string;
          terms?: string;
          status?: 'active' | 'completed' | 'cancelled';
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
        };
      };
      milestones: {
        Row: {
          id: string;
          contract_id: string;
          title: string;
          description: string;
          amount: number;
          due_date: string | null;
          status: 'pending' | 'in-progress' | 'submitted' | 'approved' | 'released' | 'rejected';
          submission_date: string | null;
          approval_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          contract_id: string;
          title: string;
          description: string;
          amount: number;
          due_date?: string | null;
          status: 'pending' | 'in-progress' | 'submitted' | 'approved' | 'released' | 'rejected';
          submission_date?: string | null;
          approval_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          contract_id?: string;
          title?: string;
          description?: string;
          amount?: number;
          due_date?: string | null;
          status?: 'pending' | 'in-progress' | 'submitted' | 'approved' | 'released' | 'rejected';
          submission_date?: string | null;
          approval_date?: string | null;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          contract_id: string;
          milestone_id: string | null;
          client_id: string;
          freelancer_id: string;
          amount: number;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          payment_method: string;
          transaction_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          contract_id: string;
          milestone_id?: string | null;
          client_id: string;
          freelancer_id: string;
          amount: number;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          payment_method: string;
          transaction_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          contract_id?: string;
          milestone_id?: string | null;
          client_id?: string;
          freelancer_id?: string;
          amount?: number;
          status?: 'pending' | 'completed' | 'failed' | 'refunded';
          payment_method?: string;
          transaction_id?: string | null;
          created_at?: string;
        };
      };
    };
  };
} 