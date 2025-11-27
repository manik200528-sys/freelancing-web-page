import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, X, Filter, DollarSign, Calendar, MapPin } from 'lucide-react';
import { useJobsStore, JobSortOption } from '../../store/jobsStore';
import { formatDistance } from 'date-fns';

export const JobList: React.FC = () => {
  const { 
    jobs, 
    filteredJobs, 
    isLoading, 
    error, 
    fetchJobs, 
    filters, 
    setFilter, 
    applyFilters, 
    clearFilters,
    sortOption,
    setSortOption
  } = useJobsStore();
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  
  const handleSearch = () => {
    setFilter('search', searchInput);
    applyFilters();
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleClearSearch = () => {
    setSearchInput('');
    setFilter('search', '');
    applyFilters();
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as JobSortOption);
  };
  
  const calculateTimeAgo = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
            <p className="mt-2 text-gray-600">Browse thousands of jobs from top clients worldwide</p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Input
                    placeholder="Search for jobs..."
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
                {Object.values(filters).some(v => 
                  Array.isArray(v) ? v.length > 0 : v !== '' && v !== 'all' && v !== null
                ) && (
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    leftIcon={<X className="h-5 w-5" />}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            
            {/* Filter panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow animate-slideIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={filters.type}
                      onChange={(e) => setFilter('type', e.target.value as any)}
                    >
                      <option value="all">All Types</option>
                      <option value="fixed">Fixed Price</option>
                      <option value="hourly">Hourly Rate</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={filters.category}
                      onChange={(e) => setFilter('category', e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Design">Design</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Content & Copywriting">Content & Copywriting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        value={filters.budgetMin || ''}
                        onChange={(e) => setFilter('budgetMin', e.target.value ? Number(e.target.value) : null)}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                      <Input
                        placeholder="Max"
                        type="number"
                        value={filters.budgetMax || ''}
                        onChange={(e) => setFilter('budgetMax', e.target.value ? Number(e.target.value) : null)}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => {
                    applyFilters();
                    setShowFilters(false);
                  }}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {isLoading ? 'Loading jobs...' : `Showing ${filteredJobs.length} jobs`}
            </p>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">Sort by:</span>
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="newest">Newest first</option>
                <option value="budgetHighToLow">Budget: High to low</option>
                <option value="budgetLowToHigh">Budget: Low to high</option>
              </select>
            </div>
          </div>
          
          {/* Job list */}
          {isLoading ? (
            <div className="py-16 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <p className="text-error-600">{error}</p>
              <Button onClick={fetchJobs} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} hoverable className="overflow-hidden">
                  <Link to={`/jobs/${job.id}`}>
                    <CardBody>
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Job main info */}
                        <div className="flex-grow">
                          <div className="flex items-start justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                              {job.title}
                            </h2>
                            <Badge variant={job.type === 'fixed' ? 'primary' : 'accent'}>
                              {job.type === 'fixed' ? 'Fixed Price' : 'Hourly'}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {job.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="outline">
                                +{job.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                          
                          <p className="mt-3 text-gray-600 line-clamp-2">
                            {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
                          </p>
                        </div>
                        
                        {/* Job meta info */}
                        <div className="sm:w-64 flex flex-row sm:flex-col justify-between">
                          <div>
                            <div className="flex items-center text-gray-500 mb-2">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.type === 'fixed' ? (
                                `$${job.budget.min} - $${job.budget.max}`
                              ) : (
                                `$${job.budget.min} - $${job.budget.max} / hr`
                              )}
                            </div>
                            <div className="flex items-center text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Posted {calculateTimeAgo(job.createdAt)}
                            </div>
                          </div>
                          <Badge variant="outline" className="self-start sm:self-end mt-2 sm:mt-0">
                            {job.proposals} proposals
                          </Badge>
                        </div>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};