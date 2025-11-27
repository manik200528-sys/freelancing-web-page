import { create } from 'zustand';
import { Job } from '../types';
import { jobs as mockJobs } from '../lib/dummy-data';

// Define sort options
export type JobSortOption = 'newest' | 'budgetHighToLow' | 'budgetLowToHigh';

interface JobsState {
  jobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  error: string | null;
  sortOption: JobSortOption;
  filters: {
    search: string;
    category: string;
    skills: string[];
    type: 'all' | 'fixed' | 'hourly';
    budgetMin: number | null;
    budgetMax: number | null;
  };
  fetchJobs: () => Promise<void>;
  setFilter: <K extends keyof JobsState['filters']>(
    key: K,
    value: JobsState['filters'][K]
  ) => void;
  setSortOption: (option: JobSortOption) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  sortJobs: (jobs: Job[]) => Job[];
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  isLoading: false,
  error: null,
  sortOption: 'newest',
  filters: {
    search: '',
    category: '',
    skills: [],
    type: 'all',
    budgetMin: null,
    budgetMax: null,
  },
  
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulated API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call
      const sortedJobs = get().sortJobs(mockJobs);
      set({ jobs: mockJobs, filteredJobs: sortedJobs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch jobs', isLoading: false });
    }
  },
  
  setFilter: (key, value) => {
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value,
      }
    }));
  },
  
  setSortOption: (option) => {
    set({ sortOption: option });
    // Re-apply sorting to the filtered jobs
    const { filteredJobs } = get();
    const sortedJobs = get().sortJobs([...filteredJobs]);
    set({ filteredJobs: sortedJobs });
  },
  
  sortJobs: (jobs) => {
    const { sortOption } = get();
    let sortedJobs = [...jobs];
    
    switch (sortOption) {
      case 'budgetHighToLow':
        // Sort by max budget, from highest to lowest
        sortedJobs.sort((a, b) => b.budget.max - a.budget.max);
        break;
      case 'budgetLowToHigh':
        // Sort by min budget, from lowest to highest
        sortedJobs.sort((a, b) => a.budget.min - b.budget.min);
        break;
      case 'newest':
      default:
        // Sort by created date, newest first
        sortedJobs.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    
    return sortedJobs;
  },
  
  applyFilters: () => {
    const { jobs, filters } = get();
    let filtered = [...jobs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    
    // Apply skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(job => {
        return filters.skills.some(skill => job.skills.includes(skill));
      });
    }
    
    // Apply job type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(job => job.type === filters.type);
    }
    
    // Apply budget filters
    if (filters.budgetMin !== null) {
      filtered = filtered.filter(job => job.budget.max >= filters.budgetMin!);
    }
    
    if (filters.budgetMax !== null) {
      filtered = filtered.filter(job => job.budget.min <= filters.budgetMax!);
    }
    
    // Sort the filtered results
    const sortedJobs = get().sortJobs(filtered);
    set({ filteredJobs: sortedJobs });
  },
  
  clearFilters: () => {
    set(state => ({
      filters: {
        search: '',
        category: '',
        skills: [],
        type: 'all',
        budgetMin: null,
        budgetMax: null,
      }
    }));
    // Apply sorting to all jobs
    const { jobs } = get();
    const sortedJobs = get().sortJobs([...jobs]);
    set({ filteredJobs: sortedJobs });
  },
}));