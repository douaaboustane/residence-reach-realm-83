import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockAnalytics, mockProperties, mockInvestigations } from '@/data/mockData';
import { 
  Users, 
  Building2, 
  Search, 
  DollarSign,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const propertyTypeData = Object.entries(mockAnalytics.propertiesByType).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    percentage: Math.round((count / mockAnalytics.totalProperties) * 100)
  }));

  const recentActivities = [
    { id: 1, type: 'user_signup', message: 'New buyer registered: john.doe@email.com', time: '5 min ago', icon: Users },
    { id: 2, type: 'property_added', message: 'New property listed: Modern Apartment in Brooklyn', time: '12 min ago', icon: Building2 },
    { id: 3, type: 'investigation_completed', message: 'Investigation completed for luxury condo in Miami', time: '1 hour ago', icon: CheckCircle },
    { id: 4, type: 'property_verified', message: 'Property verification approved for historic brownstone', time: '2 hours ago', icon: Shield },
    { id: 5, type: 'user_signup', message: 'New investigator registered: jane.smith@email.com', time: '3 hours ago', icon: Users }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup': return Users;
      case 'property_added': return Building2;
      case 'investigation_completed': return CheckCircle;
      case 'property_verified': return Shield;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_signup': return 'text-primary';
      case 'property_added': return 'text-secondary';
      case 'investigation_completed': return 'text-success';
      case 'property_verified': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('admin.title')}</h1>
        <p className="text-muted-foreground">Monitor platform performance and manage operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('admin.totalUsers')}</p>
                <p className="text-2xl font-bold">{mockAnalytics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('admin.totalProperties')}</p>
                <p className="text-2xl font-bold">{mockAnalytics.totalProperties.toLocaleString()}</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('admin.pendingInvestigations')}</p>
                <p className="text-2xl font-bold">{mockAnalytics.pendingInvestigations}</p>
                <p className="text-xs text-warning flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  5 urgent
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('admin.monthlyRevenue')}</p>
                <p className="text-2xl font-bold">{formatCurrency(mockAnalytics.monthlyRevenue)}</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">{t('admin.overview')}</TabsTrigger>
          <TabsTrigger value="users">{t('admin.users')}</TabsTrigger>
          <TabsTrigger value="properties">{t('admin.properties')}</TabsTrigger>
          <TabsTrigger value="investigations">{t('admin.investigations')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockAnalytics.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="properties" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="investigations" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Property Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Property Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className={`h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${getActivityColor(activity.type)}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{mockAnalytics.usersByRole.buyers}</div>
                <div className="text-sm text-muted-foreground">Buyers</div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{mockAnalytics.usersByRole.investigators}</div>
                <div className="text-sm text-muted-foreground">Investigators</div>
                <Progress value={12} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{mockAnalytics.usersByRole.admins}</div>
                <div className="text-sm text-muted-foreground">Admins</div>
                <Progress value={3} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('admin.userManagement')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">buyer@demo.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Buyer</Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Search className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-muted-foreground">investigator@demo.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Investigator</Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.propertyApprovals')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProperties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={property.imageUrl} 
                        alt={property.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{property.title}</div>
                        <div className="text-sm text-muted-foreground">{property.location}</div>
                        <div className="text-sm font-medium">{formatCurrency(property.price)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={property.verified ? "default" : "secondary"}>
                        {property.verified ? "Verified" : "Pending"}
                      </Badge>
                      {!property.verified && (
                        <>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investigation Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning">23</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">156</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">3</div>
                  <div className="text-sm text-muted-foreground">Rejected</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockInvestigations.map((investigation) => {
                  const property = mockProperties.find(p => p.id === investigation.propertyId);
                  return (
                    <div key={investigation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{property?.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Requested: {new Date(investigation.requestDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={investigation.status === 'completed' ? 'default' : 'secondary'}>
                          {investigation.status}
                        </Badge>
                        {investigation.status === 'completed' && (
                          <span className="text-sm font-medium">Score: {investigation.score}%</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;