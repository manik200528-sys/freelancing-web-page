import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/common/Layout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AtSign, KeyRound, User, Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['client', 'freelancer'], {
    required_error: 'Please select a role',
  }),
  captcha: z.string().min(1, 'Please enter the CAPTCHA text'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const { register, login, error, clearError, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('client');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  
  useEffect(() => {
    loadCaptchaEnginge(6); // Load 6-character CAPTCHA
  }, []);
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'client',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    clearError();
    
    // Validate CAPTCHA
    if (!validateCaptcha(data.captcha)) {
      setCaptchaError('CAPTCHA validation failed. Please try again.');
      loadCaptchaEnginge(6); // Reload CAPTCHA after failed attempt
      return;
    }
    
    setCaptchaError(null);
    
    try {
      await register(
        {
          name: data.name,
          email: data.email,
          role: data.role,
          captchaToken: data.captcha, // Send captcha text to backend
        },
        data.password
      );
      
      // Check if there's a confirmation message indicating email verification is required
      if (error && error.includes('check your email')) {
        setRegisterSuccess(true);
        setSuccessMessage('Registration successful! Please check your email to confirm your account.');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };
  
  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Briefcase className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {registerSuccess ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      {successMessage}
                    </p>
                    <div className="mt-4">
                      <Link
                        to="/login"
                        className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      >
                        Go to login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    I want to:
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        role === 'client' 
                          ? 'bg-primary-600 text-white border-primary-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setRole('client')}
                    >
                      Hire Talent
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        role === 'freelancer' 
                          ? 'bg-primary-600 text-white border-primary-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setRole('freelancer')}
                    >
                      Work as Freelancer
                    </button>
                  </div>
                </div>
                
                <div>
                  <Input
                    label="Full name"
                    leftIcon={<User className="h-5 w-5" />}
                    error={errors.name?.message}
                    {...registerField('name')}
                  />
                </div>
                
                <div>
                  <Input
                    label="Email address"
                    type="email"
                    leftIcon={<AtSign className="h-5 w-5" />}
                    error={errors.email?.message}
                    {...registerField('email')}
                  />
                </div>
                
                <div>
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    leftIcon={<KeyRound className="h-5 w-5" />}
                    error={errors.password?.message}
                    {...registerField('password')}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="show-password"
                    name="show-password"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
                    Show password
                  </label>
                </div>
                
                <div className="flex flex-col">
                  <div className="mb-2">
                    <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
                      Enter the text from the image below
                    </label>
                    <div className="border rounded-md p-3 bg-gray-50 mb-2">
                      <LoadCanvasTemplate />
                    </div>
                    <Input
                      placeholder="Enter CAPTCHA text"
                      error={errors.captcha?.message || captchaError}
                      {...registerField('captcha')}
                    />
                  </div>
                </div>
                
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Create account
                  </Button>
                </div>
              </form>
            )}
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Demo note
                  </span>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-center text-gray-500">
                <p>This is a demo. Please use the login page with the provided credentials instead.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};