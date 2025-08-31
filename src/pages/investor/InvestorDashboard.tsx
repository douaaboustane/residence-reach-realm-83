import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { mockProperties } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin,
  Building2,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const InvestorDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Mock investment data
  const myInvestments = mockProperties.slice(0, 4).map(property => ({
    ...property,
    invested: Math.floor(Math.random() * 50000) + 10000,
    returns: Math.floor(Math.random() * 15) + 5,
    status: ['active', 'pending', 'completed'][Math.floor(Math.random() * 3)]
  }));
  
  const totalInvested = myInvestments.reduce((acc, inv) => acc + inv.invested, 0);
  const avgReturns = myInvestments.reduce((acc, inv) => acc + inv.returns, 0) / myInvestments.length;


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Investor Dashboard</h1>
        <p className="text-muted-foreground">Manage your property investments and track returns</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{myInvestments.length}</div>
                <div className="text-sm text-muted-foreground">Properties</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Invested</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{avgReturns.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Avg. Returns</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{myInvestments.filter(i => i.status === 'active').length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Investment Portfolio */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Investments</TabsTrigger>
          <TabsTrigger value="opportunities">New Opportunities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myInvestments.map((investment) => (
              <Card key={investment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{investment.title}</CardTitle>
                    <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                      {investment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {investment.location}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Invested</span>
                      <span className="font-medium">${investment.invested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Value</span>
                      <span className="font-medium">${investment.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Returns</span>
                      <span className="font-medium text-success">+{investment.returns}%</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Sell
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(4, 10).map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">${property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. Returns</span>
                      <span className="font-medium text-success">8-12%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level</span>
                      <span className="font-medium">Medium</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      Invest Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorDashboard;