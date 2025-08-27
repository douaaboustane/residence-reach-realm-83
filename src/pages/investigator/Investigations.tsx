import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { mockInvestigations, mockProperties, Investigation } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Calendar,
  MapPin,
  Building2,
  Star
} from 'lucide-react';

const Investigations: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedInvestigation, setSelectedInvestigation] = useState<Investigation | null>(null);

  const pendingInvestigations = mockInvestigations.filter(inv => inv.status === 'pending' || inv.status === 'in-progress');
  const completedInvestigations = mockInvestigations.filter(inv => inv.status === 'completed');

  const getProperty = (propertyId: string) => {
    return mockProperties.find(p => p.id === propertyId);
  };

  const getStatusIcon = (status: Investigation['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <Search className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Investigation['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'in-progress':
        return 'default';
      case 'completed':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleStartInvestigation = (investigation: Investigation) => {
    toast({
      title: "Investigation Started",
      description: `Investigation for property ${investigation.propertyId} has been started`,
    });
  };

  const handleCompleteInvestigation = (investigation: Investigation) => {
    toast({
      title: "Investigation Completed",
      description: `Investigation for property ${investigation.propertyId} has been completed`,
    });
  };

  const InvestigationCard: React.FC<{ investigation: Investigation }> = ({ investigation }) => {
    const property = getProperty(investigation.propertyId);
    if (!property) return null;

    return (
      <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/20 animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">{property.title}</CardTitle>
            <Badge variant={getStatusColor(investigation.status) as any} className="animate-scale-in">
              <div className="flex items-center space-x-1">
                {getStatusIcon(investigation.status)}
                <span className="capitalize">{investigation.status}</span>
              </div>
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Requested: {new Date(investigation.requestDate).toLocaleDateString()}</span>
            </div>
            {investigation.completionDate && (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-success" />
                <span>Completed: {new Date(investigation.completionDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          {investigation.status === 'completed' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verification Score</span>
                <div className="flex items-center space-x-2">
                  <Progress value={investigation.score} className="w-20" />
                  <span className="text-sm font-medium">{investigation.score}%</span>
                </div>
              </div>
              
              {investigation.findings.length > 0 && (
                <div>
                  <span className="text-sm font-medium">Key Findings:</span>
                  <ul className="text-sm text-muted-foreground mt-1">
                    {investigation.findings.slice(0, 2).map((finding, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 mr-2 text-success" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div className="flex space-x-2 pt-2">
            {investigation.status === 'pending' && (
              <Button 
                size="sm" 
                onClick={() => handleStartInvestigation(investigation)}
                className="flex-1 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-black bg-white hover:bg-gray-100"
              >
                <Search className="h-4 w-4 mr-2 animate-pulse text-black" />
                {t('investigator.startInvestigation')}
              </Button>
            )}
            
            {investigation.status === 'in-progress' && (
              <Button 
                size="sm" 
                onClick={() => handleCompleteInvestigation(investigation)}
                className="flex-1 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl bg-gradient-to-r from-success to-teal-500"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {t('investigator.completeInvestigation')}
              </Button>
            )}
            
            {investigation.status === 'completed' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedInvestigation(investigation)}
                className="flex-1 hover:scale-105 transition-all duration-200 border-2 hover:border-primary hover:bg-primary/5"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (selectedInvestigation) {
    const property = getProperty(selectedInvestigation.propertyId);
    
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedInvestigation(null)}
            className="mb-6"
          >
            ← Back to Investigations
          </Button>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Investigation Report</span>
                  <Badge variant="default">
                    <Star className="h-4 w-4 mr-1" />
                    Score: {selectedInvestigation.score}%
                  </Badge>
                </CardTitle>
                <div className="text-muted-foreground">
                  Property: {property?.title} • {property?.location}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Investigation Summary</h3>
                  <p className="text-muted-foreground">
                    {selectedInvestigation.report || "Investigation report not available."}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Findings</h3>
                  <div className="space-y-2">
                    {selectedInvestigation.findings.map((finding, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3 text-success" />
                        <span>{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Request Date</span>
                    <div>{new Date(selectedInvestigation.requestDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Completion Date</span>
                    <div>{selectedInvestigation.completionDate ? new Date(selectedInvestigation.completionDate).toLocaleDateString() : 'N/A'}</div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4 border-t">
                  <Button className="flex-1">
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Share Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('investigator.title')}</h1>
        <p className="text-muted-foreground">Manage property investigations and verification reports</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <Clock className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{pendingInvestigations.length}</div>
                <div className="text-sm text-muted-foreground">Pending Investigations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in [animation-delay:0.1s]">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{completedInvestigations.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in [animation-delay:0.2s]">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {completedInvestigations.length > 0 
                    ? Math.round(completedInvestigations.reduce((acc, inv) => acc + inv.score, 0) / completedInvestigations.length)
                    : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Investigations Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">
            {t('investigator.pendingInvestigations')} ({pendingInvestigations.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t('investigator.completedInvestigations')} ({completedInvestigations.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {pendingInvestigations.length > 0 ? (
              pendingInvestigations.map((investigation) => (
                <InvestigationCard key={investigation.id} investigation={investigation} />
              ))
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No pending investigations</h3>
                <p className="text-muted-foreground">You're all caught up! New investigations will appear here.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6">
            {completedInvestigations.length > 0 ? (
              completedInvestigations.map((investigation) => (
                <InvestigationCard key={investigation.id} investigation={investigation} />
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No completed investigations</h3>
                <p className="text-muted-foreground">Completed investigations will appear here.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Investigations;