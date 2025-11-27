import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Search, Filter, Star, MapPin, DollarSign, X, Clock } from 'lucide-react';
import { freelancers } from '../../lib/dummy-data';
import { formatDistance } from 'date-fns';
import { freelancerService } from '../../lib/api';

// Define sort options type
type SortOption = 'bestMatch' | 'hourlyRateHighToLow' | 'hourlyRateLowToHigh' | 'experienceLevel';

export const FreelancerList: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [freelancersList, setFreelancersList] = useState(freelancers);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('bestMatch');
  const [filters, setFilters] = useState({
    skills: [] as string[],
    hourlyRateMin: '',
    hourlyRateMax: '',
    experienceMin: '',
    experienceMax: '',
    availability: 'all',
  });
  
  // Sort freelancers based on selected sort option
  const sortFreelancers = (list: typeof freelancers) => {
    let sortedList = [...list];
    
    switch (sortOption) {
      case 'hourlyRateHighToLow':
        sortedList.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'hourlyRateLowToHigh':
        sortedList.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'experienceLevel':
        sortedList.sort((a, b) => b.experience - a.experience);
        break;
      case 'bestMatch':
      default:
        // For "Best Match", we keep the original order or could implement a more complex matching algorithm
        break;
    }
    
    return sortedList;
  };
  
  // Fetch freelancers with filters
  const fetchFreelancers = async () => {
    setIsLoading(true);
    try {
      // In a production app, we would use the API to fetch filtered results
      // For this demo, we'll just simulate it
      const filterParams = {
        skills: filters.skills,
        availability: filters.availability !== 'all' ? filters.availability : undefined,
        hourlyRateMin: filters.hourlyRateMin ? Number(filters.hourlyRateMin) : undefined,
        hourlyRateMax: filters.hourlyRateMax ? Number(filters.hourlyRateMax) : undefined,
        experienceMin: filters.experienceMin ? Number(filters.experienceMin) : undefined,
        experienceMax: filters.experienceMax ? Number(filters.experienceMax) : undefined
      };

      // Comment out API call for demo - in a real app, uncomment this
      // const data = await freelancerService.listFreelancers(filterParams);
      // setFreelancersList(sortFreelancers(data));
      
      // For demo, filter the dummy data directly
      let filteredList = [...freelancers];
      
      if (searchInput) {
        const searchLower = searchInput.toLowerCase();
        filteredList = filteredList.filter(
          f => f.name.toLowerCase().includes(searchLower) || 
               f.title.toLowerCase().includes(searchLower) ||
               f.skills.some(skill => skill.toLowerCase().includes(searchLower))
        );
      }
      
      if (filters.hourlyRateMin) {
        filteredList = filteredList.filter(f => f.hourlyRate >= Number(filters.hourlyRateMin));
      }
      
      if (filters.hourlyRateMax) {
        filteredList = filteredList.filter(f => f.hourlyRate <= Number(filters.hourlyRateMax));
      }
      
      if (filters.experienceMin) {
        filteredList = filteredList.filter(f => f.experience >= Number(filters.experienceMin));
      }
      
      if (filters.experienceMax) {
        filteredList = filteredList.filter(f => f.experience <= Number(filters.experienceMax));
      }
      
      if (filters.availability !== 'all') {
        filteredList = filteredList.filter(f => f.availability === filters.availability);
      }
      
      // Apply sorting to the filtered list
      const sortedList = sortFreelancers(filteredList);
      setFreelancersList(sortedList);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    fetchFreelancers();
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleClearSearch = () => {
    setSearchInput('');
  };
  
  const handleApplyFilters = () => {
    fetchFreelancers();
    setShowFilters(false);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    fetchFreelancers();
  };
  
  const calculateTimeAgo = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };
  
  // Initial data load
  useEffect(() => {
    fetchFreelancers();
  }, []);
  
  // Re-fetch when sort option changes
  useEffect(() => {
    fetchFreelancers();
  }, [sortOption]);
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Find Freelancers</h1>
            <p className="mt-2 text-gray-600">Connect with talented professionals for your projects</p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search freelancers by name, skills, or expertise..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  leftIcon={<Search className="h-5 w-5" />}
                  rightIcon={
                    searchInput ? (
                      <button onClick={handleClearSearch}>
                        <X className="h-5 w-5" />
                      </button>
                    ) : null
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSearch}
                  leftIcon={<Search className="h-5 w-5" />}
                  isLoading={isLoading}
                >
                  Search
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowFilters(!showFilters)}
                  leftIcon={<Filter className="h-5 w-5" />}
                >
                  Filters
                </Button>
              </div>
            </div>
            
            {/* Filter panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow animate-slideIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={filters.availability}
                      onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                    >
                      <option value="all">All</option>
                      <option value="available">Available Now</option>
                      <option value="limited">Limited Availability</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        value={filters.hourlyRateMin}
                        onChange={(e) => setFilters({ ...filters, hourlyRateMin: e.target.value })}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                      <Input
                        placeholder="Max"
                        type="number"
                        value={filters.hourlyRateMax}
                        onChange={(e) => setFilters({ ...filters, hourlyRateMax: e.target.value })}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        value={filters.experienceMin}
                        onChange={(e) => setFilters({ ...filters, experienceMin: e.target.value })}
                        leftIcon={<Clock className="h-4 w-4" />}
                      />
                      <Input
                        placeholder="Max"
                        type="number"
                        value={filters.experienceMax}
                        onChange={(e) => setFilters({ ...filters, experienceMax: e.target.value })}
                        leftIcon={<Clock className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {freelancersList.length} freelancers
            </p>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">Sort by:</span>
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="bestMatch">Best Match</option>
                <option value="hourlyRateHighToLow">Hourly Rate: High to Low</option>
                <option value="hourlyRateLowToHigh">Hourly Rate: Low to High</option>
                <option value="experienceLevel">Experience Level</option>
              </select>
            </div>
          </div>
          
          {/* Freelancer list */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary-600 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading freelancers...</p>
              </div>
            ) : freelancersList.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No freelancers found matching your criteria.</p>
              </div>
            ) : (
              freelancersList.map((freelancer) => (
                <Card key={freelancer.id} hoverable>
                  <Link to={`/freelancers/${freelancer.id}`}>
                    <CardBody>
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile info */}
                        <div className="flex items-start space-x-4">
                          <Avatar 
                            src={freelancer.avatar} 
                            name={freelancer.name} 
                            size="lg"
                          />
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                              {freelancer.name}
                            </h2>
                            <p className="text-gray-600">{freelancer.title}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {freelancer.location}
                            </div>
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
                        
                        {/* Skills and details */}
                        <div className="flex-grow">
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {freelancer.bio}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {freelancer.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Rate and availability */}
                        <div className="md:text-right">
                          <div className="text-xl font-semibold text-gray-900">
                            ${freelancer.hourlyRate}/hr
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
                          <div className="text-sm text-gray-500 mt-2">
                            {freelancer.experience} {freelancer.experience === 1 ? 'year' : 'years'} experience
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};