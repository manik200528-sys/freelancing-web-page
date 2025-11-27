import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Flag, 
  Share2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  CheckCircle
} from 'lucide-react';
import { formatDistance, format } from 'date-fns';
import { jobs, clients } from '../../lib/dummy-data';
import { Job, Client } from '../../types';
import { useAuthStore } from '../../store/authStore';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [readMore, setReadMore] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Find the job
  const job = jobs.find(j => j.id === id) as Job;
  
  // Find the client
  const client = job ? clients.find(c => c.id === job.clientId) as Client : null;
  
  if (!job || !client) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs">
            <Button>Browse All Jobs</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const calculateTimeAgo = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };
  
  const formattedDate = format(new Date(job.createdAt), 'MMMM d, yyyy');
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Job header */}
              <Card className="mb-6">
                <CardBody>
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="primary">{job.category}</Badge>
                        <Badge variant={job.type === 'fixed' ? 'outline' : 'secondary'}>
                          {job.type === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                        </Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <span className="text-sm text-gray-500">Posted {calculateTimeAgo(job.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsSaved(!isSaved)}
                      >
                        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-primary-500 text-primary-500' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center">
                      <div className="mr-3 text-gray-500">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Budget</div>
                        <div className="font-medium">
                          {job.type === 'fixed' ? (
                            <span>${job.budget.min} - ${job.budget.max}</span>
                          ) : (
                            <span>${job.budget.min} - ${job.budget.max} / hr</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-3 text-gray-500">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{job.duration || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-3 text-gray-500">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Posted</div>
                        <div className="font-medium">{formattedDate}</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              {/* Job description */}
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Job Description</h2>
                </CardHeader>
                <CardBody>
                  <div className={readMore ? '' : 'max-h-64 overflow-hidden relative'}>
                    {!readMore && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{job.description}</p>
                    </div>
                  </div>
                  {job.description.length > 300 && (
                    <button 
                      onClick={() => setReadMore(!readMore)} 
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    >
                      {readMore ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Read more
                        </>
                      )}
                    </button>
                  )}
                </CardBody>
              </Card>
              
              {/* Skills */}
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Skills Required</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="primary" className="py-1 px-3 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
              
              {/* Job activity */}
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Job Activity</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                    <span>Verified payment method</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-gray-500">Proposals</h3>
                      <p className="font-medium">{job.proposals}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Last viewed by client</h3>
                      <p className="font-medium">2 hours ago</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Invites sent</h3>
                      <p className="font-medium">6</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Unanswered invites</h3>
                      <p className="font-medium">2</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply button */}
              <Card>
                <CardBody>
                  {user?.role === 'freelancer' ? (
                    <div className="space-y-4">
                      <Button fullWidth size="lg">
                        Submit a Proposal
                      </Button>
                      <Button fullWidth variant="secondary" leftIcon={<Bookmark className="h-5 w-5" />}>
                        Save Job
                      </Button>
                    </div>
                  ) : user?.role === 'client' ? (
                    <div className="text-center">
                      <p className="mb-4 text-gray-600">You're logged in as a client. Only freelancers can submit proposals.</p>
                      <Button variant="secondary" leftIcon={<Briefcase className="h-5 w-5" />}>
                        View Similar Jobs
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-center text-gray-600 mb-4">Sign up to submit a proposal</p>
                      <Link to="/register">
                        <Button fullWidth>
                          Sign Up
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button fullWidth variant="secondary">
                          Log In
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardBody>
              </Card>
              
              {/* Client info */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">About the Client</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center mb-4">
                    <Avatar src={client.avatar} name={client.name} size="md" />
                    <div className="ml-3">
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.location}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-500">Company</h3>
                    <p className="font-medium">{client.company}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-500">Member since</h3>
                    <p className="font-medium">{format(new Date(client.createdAt), 'MMMM yyyy')}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Industry</h3>
                    <p className="font-medium">{client.industry}</p>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button fullWidth variant="secondary" leftIcon={<MessageSquare className="h-5 w-5" />}>
                    Contact Client
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Similar jobs */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Similar Jobs</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-gray-200">
                    {jobs
                      .filter(j => j.id !== job.id && j.category === job.category)
                      .slice(0, 3)
                      .map(similarJob => (
                        <Link 
                          key={similarJob.id} 
                          to={`/jobs/${similarJob.id}`}
                          className="block hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-4">
                            <h3 className="font-medium text-primary-600 mb-1">
                              {similarJob.title}
                            </h3>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                ${similarJob.budget.min} - ${similarJob.budget.max}
                                {similarJob.type === 'hourly' && '/hr'}
                              </span>
                              <span className="text-gray-500">
                                {calculateTimeAgo(similarJob.createdAt)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardBody>
                <CardFooter>
                  <Link to="/jobs" className="w-full">
                    <Button fullWidth variant="secondary">
                      Browse More Jobs
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};