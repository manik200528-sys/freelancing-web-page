export type UserRole = 'client' | 'freelancer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  captchaToken?: string;
}

export interface Client extends User {
  role: 'client';
  company?: string;
  industry?: string;
  description?: string;
  location?: string;
}

export interface Freelancer extends User {
  role: 'freelancer';
  title: string;
  skills: string[];
  hourlyRate: number;
  bio: string;
  location?: string;
  experience: number; // years
  portfolioItems: PortfolioItem[];
  education?: Education[];
  availability: 'available' | 'limited' | 'unavailable';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  link?: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to?: string;
  current: boolean;
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  skills: string[];
  category: string;
  budget: {
    min: number;
    max: number;
  };
  type: 'fixed' | 'hourly';
  duration?: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  location: 'remote' | 'onsite' | 'hybrid';
  createdAt: string;
  proposals: number;
  expiry?: string;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  bid: number;
  estimatedDuration: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: string;
}

export interface Contract {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  proposalId: string;
  terms: string;
  milestones: Milestone[];
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'submitted' | 'approved' | 'released' | 'rejected';
  submissionDate?: string;
  approvalDate?: string;
}

export interface Review {
  id: string;
  contractId: string;
  reviewerId: string;
  receiverId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachments?: string[];
  readAt?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}