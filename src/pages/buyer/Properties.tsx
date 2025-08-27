import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Filter,
  Star,
  Eye,
  Share2,
  Box
} from 'lucide-react';
import { mockProperties } from '@/data/mockData';
import Property3D from '@/components/3d/Property3D';
import LocationMap3D from '@/components/3d/LocationMap3D';

export default function Properties() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState(mockProperties[0]);

  const filteredProperties = mockProperties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('properties.title', 'Find Your Dream Property')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('properties.subtitle', 'Discover verified properties with detailed investigations and transparent pricing')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t('properties.search', 'Search properties, locations...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          {t('properties.filters', 'Filters')}
        </Button>
      </div>

      {/* 3D Views Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="3d">
            <Box className="w-4 h-4 mr-2" />
            3D Property
          </TabsTrigger>
          <TabsTrigger value="map">3D Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="space-y-6">
          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card 
                key={property.id} 
                className={`group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 cursor-pointer ${
                  selectedProperty?.id === property.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedProperty(property)}
              >
                <CardHeader className="relative p-0">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
                        {property.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-4 right-4 ${favorites.includes(property.id) 
                        ? 'text-destructive' 
                        : 'text-white hover:text-destructive'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(property.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{property.rating}</span>
                        <span className="text-white/80">({property.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    {t('properties.viewDetails', 'View Details')}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="3d" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Property3D property={selectedProperty} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Select Property</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProperties.map((property) => (
                  <Card 
                    key={property.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedProperty?.id === property.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <h4 className="font-medium">{property.title}</h4>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                    <p className="text-lg font-bold text-primary">${property.price.toLocaleString()}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <LocationMap3D properties={filteredProperties.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            location: p.location,
            coordinates: { x: p.coordinates.lat - 40, z: p.coordinates.lng + 74 }
          }))} />
          <div className="text-center">
            <p className="text-muted-foreground">
              Interactive 3D map showing {filteredProperties.length} properties. 
              Click and drag to explore, hover over markers for details.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
      <div className="text-center text-muted-foreground">
        <p>{t('properties.showing', 'Showing')} {filteredProperties.length} {t('properties.of', 'of')} {mockProperties.length} {t('properties.properties', 'properties')}</p>
      </div>
    </div>
  );
}