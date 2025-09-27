import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, User, ChevronDown, Briefcase as BriefcaseBusiness } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useNotificationsStore } from '../../store/notificationsStore';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { unreadCount, fetchNotifications } = useNotificationsStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Fetch notifications on mount
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [fetchNotifications, user]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FreelanceHub</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <>
                <div className="hidden sm:flex sm:space-x-8">
                  <Link 
                    to="/jobs" 
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname.startsWith('/jobs') 
                        ? 'border-b-2 border-primary-500 text-gray-900' 
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Browse Jobs
                  </Link>
                  <Link 
                    to="/freelancers" 
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname.startsWith('/freelancers') 
                        ? 'border-b-2 border-primary-500 text-gray-900' 
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Find Freelancers
                  </Link>
                  {user.role === 'client' && (
                    <Link 
                      to="/post-job" 
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        location.pathname === '/post-job' 
                          ? 'border-b-2 border-primary-500 text-gray-900' 
                          : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      Post a Job
                    </Link>
                  )}
                  {user.role === 'freelancer' && (
                    <Link 
                      to="/proposals" 
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        location.pathname.startsWith('/proposals') 
                          ? 'border-b-2 border-primary-500 text-gray-900' 
                          : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      My Proposals
                    </Link>
                  )}
                </div>
                
                {/* Notification icon */}
                <div className="ml-4 relative">
                  <Link to="/notifications">
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error-500 text-xs text-white flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                </div>
                
                {/* Messages icon */}
                <div className="ml-4 relative">
                  <Link to="/messages">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <Avatar 
                        src={user.avatar} 
                        name={user.name} 
                        size="sm" 
                      />
                      <span className="ml-2 text-gray-700">{user.name.split(' ')[0]}</span>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="secondary">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link 
                  to="/jobs" 
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname.startsWith('/jobs') 
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' 
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  Browse Jobs
                </Link>
                <Link 
                  to="/freelancers" 
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname.startsWith('/freelancers') 
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' 
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  Find Freelancers
                </Link>
                <Link 
                  to="/notifications" 
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === '/notifications' 
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' 
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  Notifications {unreadCount > 0 && `(${unreadCount})`}
                </Link>
                <Link 
                  to="/messages" 
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === '/messages' 
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' 
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  Messages
                </Link>
                {user.role === 'client' && (
                  <Link 
                    to="/post-job" 
                    className={`block pl-3 pr-4 py-2 text-base font-medium ${
                      location.pathname === '/post-job' 
                        ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' 
                        : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                    }`}
                  >
                    Post a Job
                  </Link>
                )}
                {user.role === 'freelancer' && (
                  <Link 
                    to="/proposals" 
                    className={`block pl-3 pr-4 py-2 text-base font-medium ${
                      location.pathname.startsWith('/proposals') 
                        ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' 
                        : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                    }`}
                  >
                    My Proposals
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar 
                    src={user.avatar} 
                    name={user.name} 
                    size="md" 
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link 
                  to="/dashboard" 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};