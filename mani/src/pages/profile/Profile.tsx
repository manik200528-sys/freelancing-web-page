import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Plus, 
  X, 
  Upload,
  GraduationCap,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { freelancers } from '../../lib/dummy-data';

interface ProfileForm {
  name: string;
  email: string;
  title: string;
  location: string;
  hourlyRate: number;
  bio: string;
}

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  
  // Get freelancer data if user is a freelancer
  const freelancerData = user?.role === 'freelancer' 
    ? freelancers.find(f => f.id === user.id)
    : null;
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      title: freelancerData?.title || '',
      location: freelancerData?.location || '',
      hourlyRate: freelancerData?.hourlyRate || 0,
      bio: freelancerData?.bio || '',
    }
  });
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const onSubmit = (data: ProfileForm) => {
    console.log({ ...data, skills });
    // Handle profile update
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="mt-2 text-gray-600">
              Manage your profile information and portfolio
            </p>
          </div>
          
          {/* Profile navigation */}
          <div className="mb-6">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'basic'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </button>
              {user?.role === 'freelancer' && (
                <>
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'portfolio'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('portfolio')}
                  >
                    Portfolio
                  </button>
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'education'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('education')}
                  >
                    Education
                  </button>
                </>
              )}
            </nav>
          </div>
          
          {/* Basic Info */}
          {activeTab === 'basic' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Profile Picture</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center">
                    <Avatar 
                      src={user?.avatar} 
                      name={user?.name || ''} 
                      size="xl" 
                    />
                    <div className="ml-6">
                      <Button
                        type="button"
                        variant="secondary"
                        leftIcon={<Upload className="h-5 w-5" />}
                      >
                        Upload New Picture
                      </Button>
                      <p className="mt-2 text-sm text-gray-500">
                        Recommended: Square image, at least 400x400 pixels
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                  <div>
                    <Input
                      label="Full Name"
                      leftIcon={<User className="h-5 w-5" />}
                      error={errors.name?.message}
                      {...register('name', { required: 'Name is required' })}
                    />
                  </div>
                  
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      leftIcon={<Mail className="h-5 w-5" />}
                      error={errors.email?.message}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                  </div>
                  
                  {user?.role === 'freelancer' && (
                    <>
                      <div>
                        <Input
                          label="Professional Title"
                          leftIcon={<Briefcase className="h-5 w-5" />}
                          placeholder="e.g., Senior Full Stack Developer"
                          error={errors.title?.message}
                          {...register('title', { required: 'Professional title is required' })}
                        />
                      </div>
                      
                      <div>
                        <Input
                          label="Location"
                          leftIcon={<MapPin className="h-5 w-5" />}
                          placeholder="e.g., San Francisco, CA"
                          error={errors.location?.message}
                          {...register('location', { required: 'Location is required' })}
                        />
                      </div>
                      
                      <div>
                        <Input
                          label="Hourly Rate"
                          type="number"
                          leftIcon={<DollarSign className="h-5 w-5" />}
                          placeholder="e.g., 50"
                          error={errors.hourlyRate?.message}
                          {...register('hourlyRate', {
                            required: 'Hourly rate is required',
                            min: {
                              value: 1,
                              message: 'Hourly rate must be greater than 0'
                            }
                          })}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          rows={4}
                          placeholder="Tell clients about your background and expertise..."
                          {...register('bio', {
                            required: 'Bio is required',
                            minLength: {
                              value: 100,
                              message: 'Bio must be at least 100 characters'
                            }
                          })}
                        />
                        {errors.bio && (
                          <p className="mt-1 text-sm text-error-600">{errors.bio.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Skills
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add skills..."
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                          />
                          <Button
                            type="button"
                            onClick={handleAddSkill}
                            leftIcon={<Plus className="h-5 w-5" />}
                          >
                            Add
                          </Button>
                        </div>
                        
                        {skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="primary"
                                className="pl-3 pr-2 py-1 flex items-center"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="ml-1 hover:text-primary-200"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
          
          {/* Portfolio */}
          {activeTab === 'portfolio' && user?.role === 'freelancer' && (
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Portfolio Projects</h2>
                <Button leftIcon={<Plus className="h-5 w-5" />}>
                  Add Project
                </Button>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  {freelancerData?.portfolioItems.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                          {item.link && (
                            <a 
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-700"
                            >
                              View Project
                            </a>
                          )}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
          
          {/* Education */}
          {activeTab === 'education' && user?.role === 'freelancer' && (
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Education</h2>
                <Button leftIcon={<Plus className="h-5 w-5" />}>
                  Add Education
                </Button>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  {freelancerData?.education?.map((edu) => (
                    <div key={edu.id} className="flex items-start border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {edu.degree} in {edu.fieldOfStudy}
                        </h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(edu.from).getFullYear()} - {
                            edu.current ? 'Present' : new Date(edu.to!).getFullYear()
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};