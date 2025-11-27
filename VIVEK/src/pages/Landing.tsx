import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { Button } from '../components/ui/Button';
import { Search, Briefcase, Check, Star, Shield, DollarSign, Clock, Zap } from 'lucide-react';
import { useJobsStore } from '../store/jobsStore';

export const Landing: React.FC = () => {
  const { fetchJobs } = useJobsStore();
  
  // Pre-fetch jobs for faster page transition
  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Connect with top freelance talent
              </h1>
              <p className="mt-6 text-xl">
                Find expert freelancers for any project or post your services to start earning. FreelanceHub connects businesses and independent professionals from around the world.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/jobs">
                  <Button size="lg" variant="accent" rightIcon={<Search className="h-5 w-5" />}>
                    Find Jobs
                  </Button>
                </Link>
                <Link to="/post-job">
                  <Button size="lg" variant="secondary" rightIcon={<Briefcase className="h-5 w-5" />}>
                    Post a Job
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center text-sm">
                <span className="flex items-center">
                  <Check className="h-5 w-5 text-accent-300 mr-1" />
                  Top rated freelancers
                </span>
                <span className="mx-4">•</span>
                <span className="flex items-center">
                  <Check className="h-5 w-5 text-accent-300 mr-1" />
                  Secure payments
                </span>
                <span className="mx-4">•</span>
                <span className="flex items-center">
                  <Check className="h-5 w-5 text-accent-300 mr-1" />
                  24/7 support
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-primary-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Freelancers collaborating" 
                className="relative rounded-lg shadow-xl animate-fadeIn"
              />
            </div>
          </div>
        </div>
        
        {/* Wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,90.7C840,107,960,117,1080,106.7C1200,96,1320,64,1380,48L1440,32L1440,150L1380,150C1320,150,1200,150,1080,150C960,150,840,150,720,150C600,150,480,150,360,150C240,150,120,150,60,150L0,150Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How FreelanceHub Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, secure way to connect with freelancers and clients for any project
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Post a Job</h3>
              <p className="text-gray-600">
                Describe your project, set your budget, and post your requirements to attract the right talent.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 text-accent-600 mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire Freelancers</h3>
              <p className="text-gray-600">
                Review proposals, portfolios, and ratings to find the perfect match for your project needs.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success-100 text-success-600 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Work Securely</h3>
              <p className="text-gray-600">
                Use milestone payments, track progress, and communicate through our secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Browse Popular Categories
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Find skilled freelancers across various industries and specializations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap />, title: 'Web Development', count: 824 },
              { icon: <DollarSign />, title: 'Digital Marketing', count: 531 },
              { icon: <Star />, title: 'Design & Creative', count: 735 },
              { icon: <Briefcase />, title: 'Content Writing', count: 412 },
              { icon: <Shield />, title: 'Mobile Development', count: 387 },
              { icon: <Clock />, title: 'Data Science', count: 246 },
              { icon: <Search />, title: 'Sales & Marketing', count: 304 },
              { icon: <Zap />, title: 'Video & Animation', count: 289 },
            ].map((category, index) => (
              <Link 
                key={index} 
                to={`/jobs?category=${encodeURIComponent(category.title)}`} 
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div className="mr-3 text-primary-600">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600">{category.count} jobs available</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/jobs">
              <Button size="lg" variant="primary">View All Categories</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from clients and freelancers who found success on our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm relative">
              <div className="absolute -top-4 left-8 h-8 w-8 text-primary-600">
                <svg fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.066 10c-3.896 0-7.066 3.17-7.066 7.066 0 3.896 3.17 7.066 7.066 7.066s7.066-3.17 7.066-7.066C21.132 13.17 17.962 10 14.066 10zm0 12.132c-2.782 0-5.066-2.284-5.066-5.066s2.284-5.066 5.066-5.066 5.066 2.284 5.066 5.066-2.284 5.066-5.066 5.066zm15.868-5.066c0-3.896-3.17-7.066-7.066-7.066-3.896 0-7.066 3.17-7.066 7.066 0 3.896 3.17 7.066 7.066 7.066 3.896 0 7.066-3.17 7.066-7.066zm-12.132 0c0-2.782 2.284-5.066 5.066-5.066s5.066 2.284 5.066 5.066-2.284 5.066-5.066 5.066c-2.782 0-5.066-2.284-5.066-5.066z"/>
                </svg>
              </div>
              <div className="pt-4">
                <p className="text-gray-600 mb-6">
                  "As a startup founder, I needed skilled developers quickly. FreelanceHub made it easy to find the right talent and complete our app on time and within budget."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Client" 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">John Mitchell</h4>
                    <p className="text-xs text-gray-500">CEO, TechStart</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm relative">
              <div className="absolute -top-4 left-8 h-8 w-8 text-primary-600">
                <svg fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.066 10c-3.896 0-7.066 3.17-7.066 7.066 0 3.896 3.17 7.066 7.066 7.066s7.066-3.17 7.066-7.066C21.132 13.17 17.962 10 14.066 10zm0 12.132c-2.782 0-5.066-2.284-5.066-5.066s2.284-5.066 5.066-5.066 5.066 2.284 5.066 5.066-2.284 5.066-5.066 5.066zm15.868-5.066c0-3.896-3.17-7.066-7.066-7.066-3.896 0-7.066 3.17-7.066 7.066 0 3.896 3.17 7.066 7.066 7.066 3.896 0 7.066-3.17 7.066-7.066zm-12.132 0c0-2.782 2.284-5.066 5.066-5.066s5.066 2.284 5.066 5.066-2.284 5.066-5.066 5.066c-2.782 0-5.066-2.284-5.066-5.066z"/>
                </svg>
              </div>
              <div className="pt-4">
                <p className="text-gray-600 mb-6">
                  "FreelanceHub transformed my career. I started as a part-time freelancer and now run my own digital agency with clients I found through the platform."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Freelancer" 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Emma Rodriguez</h4>
                    <p className="text-xs text-gray-500">UI/UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm relative">
              <div className="absolute -top-4 left-8 h-8 w-8 text-primary-600">
                <svg fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.066 10c-3.896 0-7.066 3.17-7.066 7.066 0 3.896 3.17 7.066 7.066 7.066s7.066-3.17 7.066-7.066C21.132 13.17 17.962 10 14.066 10zm0 12.132c-2.782 0-5.066-2.284-5.066-5.066s2.284-5.066 5.066-5.066 5.066 2.284 5.066 5.066-2.284 5.066-5.066 5.066zm15.868-5.066c0-3.896-3.17-7.066-7.066-7.066-3.896 0-7.066 3.17-7.066 7.066 0 3.896 3.17 7.066 7.066 7.066 3.896 0 7.066-3.17 7.066-7.066zm-12.132 0c0-2.782 2.284-5.066 5.066-5.066s5.066 2.284 5.066 5.066-2.284 5.066-5.066 5.066c-2.782 0-5.066-2.284-5.066-5.066z"/>
                </svg>
              </div>
              <div className="pt-4">
                <p className="text-gray-600 mb-6">
                  "The milestone payment system gave me peace of mind. I could release funds as each project phase was completed, ensuring quality work throughout."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Client" 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Sarah Johnson</h4>
                    <p className="text-xs text-gray-500">Marketing Director, TechNova</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg">
                Join thousands of clients and freelancers already using FreelanceHub to connect, collaborate, and complete amazing projects.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg">Create an Account</Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="secondary">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <img 
                src="https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Collaboration" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};