import React from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DollarSign, Plus, X } from 'lucide-react';
import { jobService, authService } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

interface PostJobForm {
  title: string;
  description: string;
  category: string;
  type: 'fixed' | 'hourly';
  budgetMin: number;
  budgetMax: number;
  duration: string;
  location: 'remote' | 'onsite' | 'hybrid';
  skills: string[];
}

export const PostJob: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PostJobForm>();
  const [skills, setSkills] = React.useState<string[]>([]);
  const [skillInput, setSkillInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();
  
  const jobType = watch('type');
  
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
  
  const onSubmit = async (data: PostJobForm) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      // Get the current user from auth
      const user = await authService.getCurrentUser();
      
      if (!user) {
        throw new Error('You must be logged in to post a job');
      }
      
      // For demo, using a hardcoded client_id
      // In production, you should get the client_id from the logged-in user's client profile
      const jobData = {
        client_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Demo client ID
        title: data.title,
        description: data.description,
        skills: skills,
        category: data.category,
        budget_min: parseFloat(data.budgetMin.toString()),
        budget_max: parseFloat(data.budgetMax.toString()),
        type: data.type,
        duration: data.duration,
        location: data.location,
        status: 'open',
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const result = await jobService.createJob(jobData);
      
      // Show success message and redirect
      alert('Job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
            <p className="mt-2 text-gray-600">
              Fill out the form below to post your job and start receiving proposals from talented freelancers.
            </p>
          </div>
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Job Details</h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <div>
                  <Input
                    label="Job Title"
                    placeholder="e.g., React Native Developer for Mobile App"
                    error={errors.title?.message}
                    {...register('title', { 
                      required: 'Job title is required',
                      minLength: {
                        value: 10,
                        message: 'Job title must be at least 10 characters'
                      }
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    rows={6}
                    placeholder="Describe your project requirements, goals, and expectations..."
                    {...register('description', {
                      required: 'Job description is required',
                      minLength: {
                        value: 50,
                        message: 'Job description must be at least 50 characters'
                      }
                    })}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      {...register('category', { required: 'Category is required' })}
                    >
                      <option value="">Select a category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Design">Design</option>
                      <option value="Writing">Writing</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-error-600">{errors.category.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      {...register('type', { required: 'Job type is required' })}
                    >
                      <option value="">Select job type</option>
                      <option value="fixed">Fixed Price</option>
                      <option value="hourly">Hourly Rate</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-sm text-error-600">{errors.type.message}</p>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Budget</h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      label={`Minimum ${jobType === 'hourly' ? 'Hourly Rate' : 'Budget'}`}
                      placeholder="e.g., 500"
                      leftIcon={<DollarSign className="h-5 w-5" />}
                      error={errors.budgetMin?.message}
                      {...register('budgetMin', {
                        required: 'Minimum budget is required',
                        min: {
                          value: 1,
                          message: 'Minimum budget must be greater than 0'
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="number"
                      label={`Maximum ${jobType === 'hourly' ? 'Hourly Rate' : 'Budget'}`}
                      placeholder="e.g., 1000"
                      leftIcon={<DollarSign className="h-5 w-5" />}
                      error={errors.budgetMax?.message}
                      {...register('budgetMax', {
                        required: 'Maximum budget is required',
                        min: {
                          value: 1,
                          message: 'Maximum budget must be greater than 0'
                        }
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Input
                    label="Project Duration"
                    placeholder="e.g., 2-3 weeks, 1-2 months"
                    error={errors.duration?.message}
                    {...register('duration', { required: 'Project duration is required' })}
                  />
                </div>
              </CardBody>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Required Skills</h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add required skills..."
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Location
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    {...register('location', { required: 'Work location is required' })}
                  >
                    <option value="">Select work location</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  {errors.location && (
                    <p className="mt-1 text-sm text-error-600">{errors.location.message}</p>
                  )}
                </div>
              </CardBody>
            </Card>
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="secondary" disabled={isLoading}>
                Save as Draft
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post Job'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
