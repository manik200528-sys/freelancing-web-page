import React, { useState } from 'react';
import { Layout } from '../../components/common/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Bell, 
  CreditCard, 
  Lock, 
  Mail, 
  Shield, 
  Smartphone,
  Plus,
  Trash2,
  CheckCircle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          
          {/* Settings navigation */}
          <div className="mb-6">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'billing'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('billing')}
              >
                Billing
              </button>
            </nav>
          </div>
          
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Email Addresses</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          sarah@example.com
                        </p>
                        <p className="text-xs text-gray-500">Primary</p>
                      </div>
                    </div>
                    <Badge variant="success">Verified</Badge>
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Email Address
                  </Button>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Phone Numbers</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          +1 (555) 123-4567
                        </p>
                        <p className="text-xs text-gray-500">Primary</p>
                      </div>
                    </div>
                    <Badge variant="success">Verified</Badge>
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add Phone Number
                  </Button>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-error-600">Delete Account</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="danger"
                    leftIcon={<Trash2 className="h-5 w-5" />}
                  >
                    Delete Account
                  </Button>
                </CardBody>
              </Card>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Change Password</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <Input
                    type="password"
                    label="Current Password"
                    leftIcon={<Lock className="h-5 w-5" />}
                  />
                  <Input
                    type="password"
                    label="New Password"
                    leftIcon={<Lock className="h-5 w-5" />}
                  />
                  <Input
                    type="password"
                    label="Confirm New Password"
                    leftIcon={<Lock className="h-5 w-5" />}
                  />
                  <div>
                    <Button>Update Password</Button>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Two-factor authentication is disabled
                        </p>
                        <p className="text-xs text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary">Enable</Button>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Active Sessions</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Chrome on MacBook Pro
                        </p>
                        <p className="text-xs text-gray-500">
                          San Francisco, CA • Active now
                        </p>
                      </div>
                      <Badge variant="success">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Safari on iPhone
                        </p>
                        <p className="text-xs text-gray-500">
                          San Francisco, CA • Last active 2 hours ago
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              New proposals
                            </p>
                            <p className="text-xs text-gray-500">
                              Get notified when you receive new proposals
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Messages
                            </p>
                            <p className="text-xs text-gray-500">
                              Get notified when you receive new messages
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Project updates
                            </p>
                            <p className="text-xs text-gray-500">
                              Get notified about project milestones and updates
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Browser notifications
                            </p>
                            <p className="text-xs text-gray-500">
                              Receive notifications in your browser
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
          
          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-gray-500">
                          Expires 12/24
                        </p>
                      </div>
                    </div>
                    <Badge variant="primary">Default</Badge>
                  </div>
                  
                  <Button
                    variant="secondary"
                    leftIcon={<Plus className="h-5 w-5" />}
                  >
                    Add Payment Method
                  </Button>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Billing History</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Premium Plan - Monthly
                        </p>
                        <p className="text-xs text-gray-500">
                          March 1, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $29.99
                        </p>
                        <Badge variant="success" className="text-xs">
                          Paid
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Premium Plan - Monthly
                        </p>
                        <p className="text-xs text-gray-500">
                          February 1, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          $29.99
                        </p>
                        <Badge variant="success" className="text-xs">
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Plan</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Premium Plan
                      </p>
                      <p className="text-sm text-gray-500">
                        $29.99/month
                      </p>
                      <div className="mt-2 flex items-center text-sm text-success-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Active
                      </div>
                    </div>
                    <Button variant="secondary">
                      Change Plan
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};