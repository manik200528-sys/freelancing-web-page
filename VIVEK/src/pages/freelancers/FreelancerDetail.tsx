import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  DollarSign
} from 'lucide-react';
import { freelancers } from '../../lib/dummy-data';
import { format } from 'date-fns';

export const FreelancerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const freelancer = freelancers.find(f => f.id === id);
  
  if (!freelancer) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Freelancer Not Found</h1>
          <p className="text-gray-600 mb-8">The freelancer you're looking for doesn't exist or has been removed.</p>
          <Link to="/freelancers">
            <Button>Browse Freelancers</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Profile header */}
              <Card className="mb-6">
                <CardBody>
                  <div className="flex flex-col md:flex-row gap-6">
                    <Avatar 
                      src={freelancer.avatar} 
                      name={freelancer.name} 
                      size="xl" 
                    />
                    <div className="flex-grow">
                      <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
                      <p className="text-lg text-gray-600">{freelancer.title}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-5 w-5 mr-1" />
                          {freelancer.location}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-5 w-5 mr-1" />
                          {freelancer.experience} years experience
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-5 w-5 mr-1" />
                          Member since {format(new Date(freelancer.createdAt), 'MMMM yyyy')}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <div className="flex">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <Star className="h-5 w-5 text-yellow-400" />
                          <Star className="h-5 w-5 text-yellow-400" />
                          <Star className="h-5 w-5 text-yellow-400" />
                          <Star className="h-5 w-5 text-gray-300" />
                        </div>
                        <span className="ml-2 text-gray-600">4.0 (24 reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              {/* About */}
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">About</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 whitespace-pre-line">{freelancer.bio}</p>
                </CardBody>
              </Card>
              
              {/* Skills */}
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Skills</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill, index) => (
                      <Badge key={index} variant="primary" className="py-1 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
              
              {/* Portfolio */}
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Portfolio</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancer.portfolioItems.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="object-cover w-full h-full group-hover:opacity-75 transition-opacity"
                          />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        {item.link && (
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-700"
                          >
                            View Project
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
              
              {/* Education */}
              {freelancer.education && freelancer.education.length > 0 && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Education</h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {freelancer.education.map((edu) => (
                        <div key={edu.id} className="flex">
                          <div className="flex-shrink-0">
                            <GraduationCap className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              {edu.degree} in {edu.fieldOfStudy}
                            </h3>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(edu.from), 'MMMM yyyy')} - 
                              {edu.current ? ' Present' : format(new Date(edu.to!), ' MMMM yyyy')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hire button */}
              <Card>
                <CardBody>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-900">
                      ${freelancer.hourlyRate}
                      <span className="text-lg text-gray-500">/hr</span>
                    </div>
                    <Badge 
                      variant={
                        freelancer.availability === 'available' ? 'success' :
                        freelancer.availability === 'limited' ? 'warning' :
                        'error'
                      }
                      className="mt-2"
                    >
                      {freelancer.availability === 'available' ? 'Available Now' :
                       freelancer.availability === 'limited' ? 'Limited Availability' :
                       'Unavailable'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <Button fullWidth leftIcon={<Briefcase className="h-5 w-5" />}>
                      Invite to Job
                    </Button>
                    <Button 
                      fullWidth 
                      variant="secondary" 
                      leftIcon={<MessageSquare className="h-5 w-5" />}
                    >
                      Contact
                    </Button>
                  </div>
                </CardBody>
              </Card>
              
              {/* Quick stats */}
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Jobs Completed</div>
                      <div className="text-lg font-semibold">47</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">On Time</div>
                      <div className="text-lg font-semibold">98%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Response Rate</div>
                      <div className="text-lg font-semibold">95%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Earned</div>
                      <div className="text-lg font-semibold">$24,500</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              {/* Similar freelancers */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Similar Freelancers</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-gray-200">
                    {freelancers
                      .filter(f => f.id !== freelancer.id)
                      .slice(0, 3)
                      .map(f => (
                        <Link 
                          key={f.id} 
                          to={`/freelancers/${f.id}`}
                          className="block hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-4">
                            <div className="flex items-center">
                              <Avatar 
                                src={f.avatar} 
                                name={f.name} 
                                size="sm" 
                                className="mr-3"
                              />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {f.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {f.title}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div className="flex items-center text-sm text-gray-500">
                                <DollarSign className="h-4 w-4 mr-1" />
                                ${f.hourlyRate}/hr
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {f.availability}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};