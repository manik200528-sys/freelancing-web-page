import { create } from 'zustand';
import { Notification } from '../types';
import { notifications as mockNotifications } from '../lib/dummy-data';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulated API call with delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter notifications for current user (in a real app, the API would handle this)
      const userNotifications = mockNotifications.filter(n => n.userId === 'user1');
      const unread = userNotifications.filter(n => !n.read).length;
      
      set({ 
        notifications: userNotifications, 
        unreadCount: unread,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch notifications', isLoading: false });
    }
  },
  
  markAsRead: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Update the notification in the local state
      set(state => {
        const updatedNotifications = state.notifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        );
        
        return { 
          notifications: updatedNotifications,
          unreadCount: updatedNotifications.filter(n => !n.read).length,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ error: 'Failed to mark notification as read', isLoading: false });
    }
  },
  
  markAllAsRead: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update all notifications in the local state
      set(state => {
        const updatedNotifications = state.notifications.map(notification => ({
          ...notification,
          read: true
        }));
        
        return { 
          notifications: updatedNotifications,
          unreadCount: 0,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ error: 'Failed to mark all notifications as read', isLoading: false });
    }
  },
  
  deleteNotification: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Remove the notification from the local state
      set(state => {
        const updatedNotifications = state.notifications.filter(
          notification => notification.id !== id
        );
        
        return { 
          notifications: updatedNotifications,
          unreadCount: updatedNotifications.filter(n => !n.read).length,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ error: 'Failed to delete notification', isLoading: false });
    }
  },
}));