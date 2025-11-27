import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  Star, 
  MessageSquare, 
  Bell, 
  ChevronRight,
  ChevronUp, 
  ListChecks,
  Layers,
  Calendar
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { clients, freelancers, jobs, contracts, proposals } from '../../lib/dummy-data';
import { formatDistance } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">Please log in to view your dashboard.</p>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Find user data based on role
  const userData = user.role === 'client' 
    ? clients.find(c => c.id === user.id)
    : freelancers.find(f => f.id === user.id);
  
  // Get relevant data for client
  const clientJobs = user.role === 'client' 
    ? jobs.filter(job => job.clientId === user.id)
    : [];
  
  const clientContracts = user.role === 'client'
    ? contracts.filter(contract => contract.clientId === user.id)
    : [];
  
  // Get relevant data for freelancer
  const freelancerProposals = user.role === 'freelancer'
    ? proposals.filter(proposal => proposal.freelancerId === user.id)
    : [];
  
  const freelancerContracts = user.role === 'freelancer'
    ? contracts.filter(contract => contract.freelancerId === user.id)
    : [];
  
  const calculateTimeAgo = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Dashboard header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {user.name.split(' ')[0]}! Here's what's happening with your account.
            </p>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {user.role === 'client' ? (
              <>
                <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary-100">Active Jobs</p>
                        <h3 className="text-3xl font-bold mt-1">{clientJobs.filter(job => job.status === 'open').length}</h3>
                      </div>
                      <div className="bg-primary-400 rounded-full p-3 opacity-80">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-gradient-to-br from-accent-500 to-accent-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent-100">Proposals</p>
                        <h3 className="text-3xl font-bold mt-1">
                          {clientJobs.reduce((total, job) => total + job.proposals, 0)}
                        </h3>
                      </div>
                      <div className="bg-accent-400 rounded-full p-3 opacity-80">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-gradient-to-br from-success-500 to-success-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-success-100">Active Contracts</p>
                        <h3 className="text-3xl font-bold mt-1">
                          {clientContracts.filter(contract => contract.status === 'active').length}
                        </h3>
                      </div>
                      <div className="bg-success-400 rounded-full p-3 opacity-80">
                        <ListChecks className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-gradient-to-br from-warning-500 to-warning-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-warning-100">Total Spent</p>
                        <h3 className="text-3xl font-bold mt-1">$1,250</h3>
                      </div>
                      <div className="bg-warning-400 rounded-full p-3 opacity-80">
                        <DollarSign className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            ) : (
              <>
                <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary-100">Active Proposals</p>
                        <h3 className="text-3xl font-bold mt-1">
                          {freelancerProposals.filter(proposal => proposal.status === 'pending').length}
                        </h3>
                      </div>
                      <div className="bg-primary-400 rounded-full p-3 opacity-80">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-gradient-to-br from-accent-500 to-accent-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent-100">Active Projects</p>
                        <h3 className="text-3xl font-bold mt-1">
                          {freelancerContracts.filter(contract => contract.status === 'active').length}
                        </h3>
                      </div>
                      <div className="bg-accent-400 rounded-full p-3 opacity-80">
                        <Layers className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-gradient-to-br from-success-500 to-success-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-success-100">Success Rate</p>
                        <h3 className="text-3xl font-bold mt-1">87%</h3>
                      </div>
                      <div className="bg-success-400 rounded-full p-3 opacity-80">
                        <ChevronUp className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-gradient-to-br from-warning-500 to-warning-600 text-white">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-warning-100">Total Earned</p>
                        <h3 className="text-3xl font-bold mt-1">$2,450</h3>
                      </div>
                      <div className="bg-warning-400 rounded-full p-3 opacity-80">
                        <DollarSign className="h-6 w-6" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {user.role === 'client' ? (
                <>
                  {/* Recent jobs */}
                  <Card>
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Your Recent Jobs</h2>
                      <Link to="/my-jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View All
                      </Link>
                    </CardHeader>
                    <CardBody className="p-0">
                      <div className="divide-y divide-gray-200">
                        {clientJobs.length === 0 ? (
                          <div className="px-6 py-8 text-center">
                            <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
                            <Link to="/post-job">
                              <Button>Post a Job</Button>
                            </Link>
                          </div>
                        ) : clientJobs.slice(0, 5).map(job => (
                          <div key={job.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between mb-1">
                              <Link to={`/jobs/${job.id}`} className="text-primary-600 font-medium hover:underline">
                                {job.title}
                              </Link>
                              <Badge variant={
                                job.status === 'open' ? 'success' : 
                                job.status === 'in-progress' ? 'primary' : 
                                job.status === 'completed' ? 'secondary' : 'error'
                              }>
                                {job.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>
                                Posted {calculateTimeAgo(job.createdAt)}
                              </span>
                              <span className="font-medium">
                                {job.proposals} proposals
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  
                  {/* Active contracts */}
                  <Card>
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Active Contracts</h2>
                      <Link to="/contracts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Manage Contracts
                      </Link>
                    </CardHeader>
                    <CardBody className="p-0">
                      <div className="divide-y divide-gray-200">
                        {clientContracts.length === 0 ? (
                          <div className="px-6 py-8 text-center">
                            <p className="text-gray-600">You have no active contracts.</p>
                          </div>
                        ) : clientContracts
                            .filter(contract => contract.status === 'active')
                            .map(contract => {
                              // Find associated job
                              const job = jobs.find(j => j.id === contract.jobId);
                              // Find freelancer
                              const freelancer = freelancers.find(f => f.id === contract.freelancerId);
                              
                              return (
                                <div key={contract.id} className="p-4 hover:bg-gray-50">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                      <Avatar 
                                        src={freelancer?.avatar} 
                                        name={freelancer?.name || ''} 
                                        size="sm" 
                                        className="mr-3"
                                      />
                                      <div>
                                        <Link to={`/contracts/${contract.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                                          {job?.title}
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                          with {freelancer?.name}
                                        </p>
                                      </div>
                                    </div>
                                    <Link to={`/messages`} className="text-primary-600">
                                      <MessageSquare className="h-5 w-5" />
                                    </Link>
                                  </div>
                                  <div className="mt-2">
                                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                      <div 
                                        className="bg-primary-500 h-2 rounded-full" 
                                        style={{ 
                                          width: `${Math.floor(
                                            (contract.milestones.filter(m => 
                                              ['approved', 'released'].includes(m.status)
                                            ).length / contract.milestones.length) * 100
                                          )}%` 
                                        }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                                      <span>
                                        {contract.milestones.filter(m => 
                                          ['approved', 'released'].includes(m.status)
                                        ).length} of {contract.milestones.length} milestones completed
                                      </span>
                                      <span>
                                        Started {calculateTimeAgo(contract.startDate)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </CardBody>
                  </Card>
                </>
              ) : (
                <>
                  {/* Active proposals */}
                  <Card>
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Your Active Proposals</h2>
                      <Link to="/proposals" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View All
                      </Link>
                    </CardHeader>
                    <CardBody className="p-0">
                      <div className="divide-y divide-gray-200">
                        {freelancerProposals.length === 0 ? (
                          <div className="px-6 py-8 text-center">
                            <p className="text-gray-600 mb-4">You haven't submitted any proposals yet.</p>
                            <Link to="/jobs">
                              <Button>Browse Jobs</Button>
                            </Link>
                          </div>
                        ) : freelancerProposals
                            .filter(proposal => proposal.status === 'pending')
                            .map(proposal => {
                              // Find associated job
                              const job = jobs.find(j => j.id === proposal.jobId);
                              
                              return (
                                <div key={proposal.id} className="p-4 hover:bg-gray-50">
                                  <div className="flex justify-between mb-1">
                                    <Link to={`/jobs/${job?.id}`} className="text-primary-600 font-medium hover:underline">
                                      {job?.title}
                                    </Link>
                                    <div className="text-gray-600 font-medium">
                                      ${proposal.bid}
                                      {job?.type === 'hourly' && '/hr'}
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                      Submitted {calculateTimeAgo(proposal.createdAt)}
                                    </span>
                                    <Badge variant={
                                      proposal.status === 'pending' ? 'warning' : 
                                      proposal.status === 'accepted' ? 'success' : 
                                      'error'
                                    }>
                                      {proposal.status}
                                    </Badge>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </CardBody>
                  </Card>
                  
                  {/* Active contracts */}
                  <Card>
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Your Active Projects</h2>
                      <Link to="/contracts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View All Projects
                      </Link>
                    </CardHeader>
                    <CardBody className="p-0">
                      <div className="divide-y divide-gray-200">
                        {freelancerContracts.length === 0 ? (
                          <div className="px-6 py-8 text-center">
                            <p className="text-gray-600">You have no active projects.</p>
                          </div>
                        ) : freelancerContracts
                            .filter(contract => contract.status === 'active')
                            .map(contract => {
                              // Find associated job
                              const job = jobs.find(j => j.id === contract.jobId);
                              // Find client
                              const client = clients.find(c => c.id === contract.clientId);
                              
                              const nextMilestone = contract.milestones.find(
                                m => !['released', 'approved'].includes(m.status)
                              );
                              
                              return (
                                <div key={contract.id} className="p-4 hover:bg-gray-50">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                      <Avatar 
                                        src={client?.avatar} 
                                        name={client?.name || ''} 
                                        size="sm" 
                                        className="mr-3"
                                      />
                                      <div>
                                        <Link to={`/contracts/${contract.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                                          {job?.title}
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                          for {client?.name}
                                        </p>
                                      </div>
                                    </div>
                                    <Link to={`/messages`} className="text-primary-600">
                                      <MessageSquare className="h-5 w-5" />
                                    </Link>
                                  </div>
                                  
                                  {nextMilestone && (
                                    <div className="mt-2 bg-gray-50 p-2 rounded-md">
                                      <p className="text-sm font-medium">
                                        Next milestone: {nextMilestone.title}
                                      </p>
                                      <div className="flex justify-between mt-1 text-xs">
                                        <span className="text-gray-600">
                                          ${nextMilestone.amount}
                                        </span>
                                        {nextMilestone.dueDate && (
                                          <span className="text-gray-600">
                                            Due {calculateTimeAgo(nextMilestone.dueDate)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                      </div>
                    </CardBody>
                  </Card>
                </>
              )}
              
              {/* Upcoming milestones */}
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Upcoming Milestones</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-gray-200">
                    {contracts
                      .filter(contract => 
                        user.role === 'client' 
                          ? contract.clientId === user.id 
                          : contract.freelancerId === user.id
                      )
                      .flatMap(contract => 
                        contract.milestones
                          .filter(milestone => 
                            ['pending', 'in-progress'].includes(milestone.status) && 
                            milestone.dueDate
                          )
                          .map(milestone => ({
                            contract,
                            milestone,
                            job: jobs.find(j => j.id === contract.jobId),
                            counterparty: user.role === 'client'
                              ? freelancers.find(f => f.id === contract.freelancerId)
                              : clients.find(c => c.id === contract.clientId)
                          }))
                      )
                      .slice(0, 3)
                      .map(({ contract, milestone, job, counterparty }) => (
                        <div key={milestone.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-primary-500 mr-3" />
                              <div>
                                <Link to={`/contracts/${contract.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                                  {milestone.title}
                                </Link>
                                <p className="text-sm text-gray-500">
                                  {job?.title} • with {counterparty?.name}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${milestone.amount}</div>
                              <div className="text-sm text-gray-500">
                                {milestone.dueDate && (
                                  <span>Due {calculateTimeAgo(milestone.dueDate)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {contracts
                      .filter(contract => 
                        user.role === 'client' 
                          ? contract.clientId === user.id 
                          : contract.freelancerId === user.id
                      )
                      .flatMap(contract => contract.milestones)
                      .filter(milestone => 
                        ['pending', 'in-progress'].includes(milestone.status) && 
                        milestone.dueDate
                      ).length === 0 && (
                      <div className="px-6 py-8 text-center">
                        <p className="text-gray-600">You have no upcoming milestones.</p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile summary */}
              <Card>
                <CardBody>
                  <div className="flex items-center">
                    <Avatar 
                      src={user.avatar} 
                      name={user.name} 
                      size="lg" 
                      className="mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">
                        {user.role === 'client' ? userData?.company : (userData as any)?.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-gray-300" />
                        <span className="ml-1 text-sm text-gray-600">4.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/profile">
                      <Button fullWidth>
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
              
              {/* Notifications */}
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <Link to="/notifications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </Link>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-gray-200">
                    <div className="flex p-4 hover:bg-gray-50">
                      <Bell className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">New proposal received</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex p-4 hover:bg-gray-50">
                      <MessageSquare className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">New message from Sarah</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex p-4 hover:bg-gray-50">
                      <DollarSign className="h-5 w-5 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Payment received</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              {/* Quick links */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Quick Links</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <nav className="divide-y divide-gray-200">
                    {user.role === 'client' ? (
                      <>
                        <Link to="/post-job" className="flex items-center justify-between p-4 hover:bg-gray-50">
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 text-primary-500 mr-3" />
                            <span>Post a New Job</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                        <Link to="/freelancers" className="flex items-center justify-between p-4 hover:bg-gray-50">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-primary-500 mr-3" />
                            <span>Browse Freelancers</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/jobs" className="flex items-center justify-between p-4 hover:bg-gray-50">
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 text-primary-500 mr-3" />
                            <span>Find Jobs</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                        <Link to="/profile" className="flex items-center justify-between p-4 hover:bg-gray-50">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-primary-500 mr-3" />
                            <span>Update Portfolio</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                      </>
                    )}
                    <Link to="/messages" className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-primary-500 mr-3" />
                        <span>Messages</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link to="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-primary-500 mr-3" />
                        <span>{user.role === 'client' ? 'Payment Methods' : 'Payment Settings'}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </nav>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};