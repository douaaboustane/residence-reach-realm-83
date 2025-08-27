import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Calculator, Crown, Star, Check, X, Lock } from 'lucide-react';

interface PropertyData {
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  condition: string;
  features: string;
  location: string;
  marketTrends: string;
}

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  limitations?: string[];
  badge?: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic Estimate",
    price: "Free",
    features: [
      "Basic property valuation",
      "Market comparison (3 properties)",
      "General location analysis",
      "Basic condition assessment"
    ],
    limitations: [
      "Limited accuracy (±15%)",
      "No detailed market trends",
      "No professional report",
      "Basic support only"
    ]
  },
  {
    name: "Professional Estimate",
    price: "$29",
    badge: "Most Popular",
    popular: true,
    features: [
      "Advanced property valuation",
      "Comprehensive market comparison (15+ properties)",
      "Detailed location analysis",
      "Professional condition assessment",
      "Market trends analysis",
      "Property investment insights",
      "Downloadable PDF report",
      "Email support",
      "72-hour delivery"
    ]
  },
  {
    name: "Premium Estimate",
    price: "$79",
    badge: "Best Value",
    features: [
      "Everything in Professional",
      "3D property visualization",
      "Future value predictions (5 years)",
      "Renovation cost estimates",
      "ROI calculations",
      "Neighborhood growth analysis",
      "Priority processing (24h)",
      "Phone consultation (30 min)",
      "Multiple scenario analysis"
    ]
  }
];

const Estimate: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimateResult, setEstimateResult] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<PropertyData>();

  const calculateEstimate = (data: PropertyData): number => {
    const basePrice = selectedPlan === 'basic' ? 200000 : 250000;
    
    let estimate = basePrice;
    
    // Property type multiplier
    const typeMultiplier = {
      'single-family': 1.0,
      'condo': 0.85,
      'townhouse': 0.9,
      'duplex': 1.1,
      'commercial': 1.5
    }[data.propertyType] || 1.0;
    
    estimate *= typeMultiplier;
    
    // Square footage calculation
    estimate += data.squareFootage * (selectedPlan === 'basic' ? 150 : 200);
    
    // Bedrooms and bathrooms
    estimate += data.bedrooms * (selectedPlan === 'basic' ? 15000 : 20000);
    estimate += data.bathrooms * (selectedPlan === 'basic' ? 8000 : 12000);
    
    // Age of property
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.yearBuilt;
    if (age > 20) estimate *= 0.9;
    if (age > 50) estimate *= 0.85;
    
    // Condition multiplier
    const conditionMultiplier = {
      'excellent': selectedPlan === 'basic' ? 1.1 : 1.15,
      'good': 1.0,
      'fair': selectedPlan === 'basic' ? 0.9 : 0.88,
      'poor': selectedPlan === 'basic' ? 0.8 : 0.75
    }[data.condition] || 1.0;
    
    estimate *= conditionMultiplier;
    
    // Premium features
    if (selectedPlan !== 'basic') {
      estimate += data.lotSize * 50;
      
      if (data.marketTrends === 'rising') estimate *= 1.08;
      if (data.marketTrends === 'declining') estimate *= 0.95;
    }
    
    return Math.round(estimate);
  };

  const onSubmit = (data: PropertyData) => {
    setIsProcessing(true);
    
    const processingTime = selectedPlan === 'basic' ? 2000 : selectedPlan === 'professional' ? 3000 : 4000;
    
    setTimeout(() => {
      const estimate = calculateEstimate(data);
      setEstimateResult(estimate);
      setIsProcessing(false);
      
      if (selectedPlan === 'basic') {
        toast.success("Basic estimate completed!", {
          description: "Your free estimate is ready. Upgrade for more detailed analysis."
        });
      } else if (selectedPlan === 'professional') {
        toast.success("Professional estimate completed!", {
          description: "Comprehensive analysis with detailed market insights included."
        });
      } else {
        toast.success("Premium estimate completed!", {
          description: "Advanced analysis with 3D visualization and future predictions ready."
        });
      }
      
      reset();
    }, processingTime);
  };

  const PricingCard = ({ plan, isSelected, onSelect }: { 
    plan: PricingPlan; 
    isSelected: boolean; 
    onSelect: () => void; 
  }) => (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary shadow-lg scale-105' : ''
      } ${plan.popular ? 'border-primary' : ''}`}
      onClick={onSelect}
    >
      <CardHeader className="text-center">
        {plan.badge && (
          <Badge className="w-fit mx-auto mb-2" variant={plan.badge === "Most Popular" ? "default" : "secondary"}>
            {plan.badge === "Best Value" && <Crown className="w-3 h-3 mr-1" />}
            {plan.badge}
          </Badge>
        )}
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="text-3xl font-bold text-primary">
          {plan.price}
          {plan.price !== "Free" && <span className="text-lg text-muted-foreground">/estimate</span>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
          {plan.limitations?.map((limitation, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
              {limitation}
            </li>
          ))}
        </ul>
        {isSelected && (
          <Badge variant="outline" className="w-full justify-center mt-4">
            Selected Plan
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Property Estimate</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get accurate property valuations with our advanced estimation tools. Choose the plan that fits your needs.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Estimation Plan</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                isSelected={selectedPlan === (index === 0 ? 'basic' : index === 1 ? 'professional' : 'premium')}
                onSelect={() => setSelectedPlan(index === 0 ? 'basic' : index === 1 ? 'professional' : 'premium')}
              />
            ))}
          </div>
        </div>

        {/* Property Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Property Information - {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
            </CardTitle>
            <CardDescription>
              {selectedPlan === 'basic' && "Basic property valuation with essential market data"}
              {selectedPlan === 'professional' && "Professional analysis with comprehensive market insights"}
              {selectedPlan === 'premium' && "Premium analysis with advanced features and predictions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    {...register('address', { required: 'Address is required' })}
                    placeholder="123 Main St, City, State"
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select onValueChange={(value) => register('propertyType').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    {...register('bedrooms', { required: 'Bedrooms required', valueAsNumber: true })}
                    placeholder="3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    step="0.5"
                    {...register('bathrooms', { required: 'Bathrooms required', valueAsNumber: true })}
                    placeholder="2.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input
                    id="squareFootage"
                    type="number"
                    {...register('squareFootage', { required: 'Square footage required', valueAsNumber: true })}
                    placeholder="2000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lotSize">Lot Size (sq ft)</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    {...register('lotSize', { valueAsNumber: true })}
                    placeholder="8000"
                    disabled={selectedPlan === 'basic'}
                  />
                  {selectedPlan === 'basic' && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Upgrade for lot size analysis
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    {...register('yearBuilt', { valueAsNumber: true })}
                    placeholder="2010"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Property Condition</Label>
                  <Select onValueChange={(value) => register('condition').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedPlan !== 'basic' && (
                <div className="space-y-2">
                  <Label htmlFor="marketTrends">Local Market Trends</Label>
                  <Select onValueChange={(value) => register('marketTrends').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select market trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rising">Rising Market</SelectItem>
                      <SelectItem value="stable">Stable Market</SelectItem>
                      <SelectItem value="declining">Declining Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="features">Special Features</Label>
                <Textarea
                  id="features"
                  {...register('features')}
                  placeholder="Pool, garage, renovated kitchen, etc."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Additional Location Details</Label>
                <Textarea
                  id="location"
                  {...register('location')}
                  placeholder="Near schools, shopping centers, transportation, etc."
                  disabled={selectedPlan === 'basic'}
                />
                {selectedPlan === 'basic' && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Upgrade for detailed location analysis
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-6">
                <Button type="button" variant="outline" onClick={() => reset()}>
                  Reset Form
                </Button>
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" />
                      {selectedPlan === 'basic' ? 'Get Free Estimate' : `Purchase ${selectedPlan} Estimate`}
                    </>
                  )}
                </Button>
              </div>
            </form>

            {estimateResult && (
              <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-primary mb-2">Estimated Property Value</h3>
                  <p className="text-4xl font-bold text-foreground">${estimateResult.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedPlan === 'basic' && "Basic estimate with ±15% accuracy"}
                    {selectedPlan === 'professional' && "Professional estimate with ±8% accuracy"}
                    {selectedPlan === 'premium' && "Premium estimate with ±5% accuracy"}
                  </p>
                  {selectedPlan !== 'basic' && (
                    <Badge variant="secondary" className="mt-4">
                      Detailed report will be sent to your email
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Estimate;