export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'apartment' | 'house' | 'condo' | 'villa';
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  imageUrl: string;
  status: 'available' | 'pending' | 'sold';
  verified: boolean;
  agent: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  rating: number;
  reviews: number;
}

export interface Investigation {
  id: string;
  propertyId: string;
  investigatorId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  requestDate: string;
  completionDate?: string;
  report?: string;
  findings: string[];
  score: number; // 0-100
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 450000,
    location: 'Downtown, New York',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    status: 'available',
    verified: true,
    agent: 'Sarah Johnson',
    features: ['City View', 'Modern Kitchen', 'Parking', 'Gym Access'],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    rating: 4.8,
    reviews: 127
  },
  {
    id: '2',
    title: 'Suburban Family House',
    price: 650000,
    location: 'Westfield, New Jersey',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    description: 'Spacious family home with large backyard and excellent schools nearby.',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    status: 'available',
    verified: false,
    agent: 'Michael Chen',
    features: ['Backyard', 'Garage', 'School District', 'Fireplace'],
    coordinates: { lat: 40.6579, lng: -74.3477 },
    rating: 4.5,
    reviews: 89
  },
  {
    id: '3',
    title: 'Luxury Waterfront Condo',
    price: 1200000,
    location: 'Miami Beach, Florida',
    type: 'condo',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    description: 'Luxury waterfront condominium with panoramic ocean views and resort amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    status: 'pending',
    verified: true,
    agent: 'Emma Rodriguez',
    features: ['Ocean View', 'Pool', 'Concierge', 'Beach Access'],
    coordinates: { lat: 25.7617, lng: -80.1918 },
    rating: 4.9,
    reviews: 203
  },
  {
    id: '4',
    title: 'Historic Brownstone',
    price: 850000,
    location: 'Brooklyn Heights, New York',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    description: 'Charming historic brownstone with original details and modern updates.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    status: 'available',
    verified: true,
    agent: 'David Kim',
    features: ['Historic Character', 'Updated Kitchen', 'Garden', 'Parking'],
    coordinates: { lat: 40.6958, lng: -73.9960 },
    rating: 4.6,
    reviews: 156
  },
  {
    id: '5',
    title: 'Modern Villa',
    price: 2100000,
    location: 'Beverly Hills, California',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    description: 'Contemporary villa with infinity pool and panoramic city views.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    status: 'available',
    verified: false,
    agent: 'Lisa Thompson',
    features: ['Pool', 'City View', 'Wine Cellar', 'Smart Home'],
    coordinates: { lat: 34.0736, lng: -118.4004 },
    rating: 4.7,
    reviews: 98
  }
];

export const mockInvestigations: Investigation[] = [
  {
    id: '1',
    propertyId: '1',
    investigatorId: '2',
    status: 'completed',
    requestDate: '2024-01-15',
    completionDate: '2024-01-20',
    report: 'Property verified with clean title and no structural issues. All permits current.',
    findings: ['Clean title', 'No structural issues', 'All permits current', 'Market value accurate'],
    score: 95
  },
  {
    id: '2',
    propertyId: '2',
    investigatorId: '2',
    status: 'in-progress',
    requestDate: '2024-01-18',
    findings: ['Title search ongoing', 'Initial inspection complete'],
    score: 0
  },
  {
    id: '3',
    propertyId: '3',
    investigatorId: '2',
    status: 'completed',
    requestDate: '2024-01-10',
    completionDate: '2024-01-16',
    report: 'Luxury property verified. Minor HOA concerns noted but overall excellent condition.',
    findings: ['Clean title', 'Excellent condition', 'HOA fees higher than disclosed', 'Market value justified'],
    score: 88
  },
  {
    id: '4',
    propertyId: '5',
    investigatorId: '2',
    status: 'pending',
    requestDate: '2024-01-22',
    findings: [],
    score: 0
  }
];

export const mockAnalytics = {
  totalUsers: 1247,
  totalProperties: 2834,
  pendingInvestigations: 23,
  monthlyRevenue: 125600,
  usersByRole: {
    buyers: 856,
    investigators: 12,
    admins: 3
  },
  propertiesByType: {
    apartment: 1245,
    house: 892,
    condo: 456,
    villa: 241
  },
  monthlyStats: [
    { month: 'Jan', users: 120, properties: 89, investigations: 45 },
    { month: 'Feb', users: 150, properties: 112, investigations: 67 },
    { month: 'Mar', users: 180, properties: 145, investigations: 89 },
    { month: 'Apr', users: 210, properties: 178, investigations: 102 },
    { month: 'May', users: 240, properties: 203, investigations: 125 },
    { month: 'Jun', users: 280, properties: 234, investigations: 143 }
  ]
};