import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/common/Layout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AtSign, KeyRound, Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  captcha: z.string().min(1, 'Please enter the CAPTCHA text'),
});

type FormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login, error, clearError, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  
  useEffect(() => {
    loadCaptchaEnginge(6); // Load 6-character CAPTCHA
  }, []);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(loginSchema)
  });
  
  const onSubmit = async (data: FormValues) => {
  clearError();
  
  const isDemoAccount = data.email === 'sarah@example.com' && data.password === 'password';
  
  if (!isDemoAccount && !validateCaptcha(data.captcha)) {
    setCaptchaError('CAPTCHA validation failed. Please try again.');
    loadCaptchaEnginge(6);
    return;
  }
  
  setCaptchaError(null);
  
  try {
    await login(data.email, data.password, isDemoAccount ? 'demo-bypass' : data.captcha);
    
    // Wait a bit for state to update
    setTimeout(() => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        navigate('/dashboard');
      }
    }, 100);
  } catch (err) {
    console.error('Login error:', err);
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 rounded-md bg-error-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-error-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-error-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  label="Email address"
                  type="email"
                  leftIcon={<AtSign className="h-5 w-5" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-1">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    leftIcon={<KeyRound className="h-5 w-5" />}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                </div>
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
                    {...register('captcha')}
                  />
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Demo account
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="text-center text-sm">
                  <p className="mb-2">For demo purposes, use:</p>
                  <p><strong>Email:</strong> sarah@example.com</p>
                  <p><strong>Password:</strong> password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};