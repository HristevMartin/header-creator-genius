
import React, { useState, useEffect } from 'react';
import { Loader2, CalendarIcon, PlusCircle, Info, Coffee, Mountain, PalmTree, Utensils, Briefcase, Map, Shield } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DateSelector from "./_components/dateSelector";
import "../pages/AddOn.css";

const AddOn = () => {
  const [addOnProducts, setAddOnProducts] = useState([]);
  const [addonTypes, setAddonTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({});
  const [dateOptions, setDateOptions] = useState([]);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const destination = searchParams.get('destination') || 'London';
  const service = searchParams.get('service') || 'hotel';

  // Mock data generation for demo
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      const mockData = generateMockData();
      setAddOnProducts(mockData);
      
      // Extract unique addon types
      const types = [...new Set(mockData.map(product => product.addOnType))];
      setAddonTypes(types);
      
      // Generate date options for the next 10 days
      const dates = generateDateRange(
        new Date().toISOString().split('T')[0],
        new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      );
      setDateOptions(dates);
      
      setLoading(false);
    }, 1000);
  }, [destination]);

  const generateDateRange = (start, end) => {
    const dateArray = [];
    const currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const handleDateSelect = (productId, date) => {
    setSelectedDates(prev => ({
      ...prev,
      [productId]: date
    }));
  };

  const handleAddToCart = (product) => {
    // In a real app, this would add to cart
    console.log('Adding to cart:', product);
    
    // Show a fake success notification using alert for demo
    alert(`${product.name} has been added to your cart!`);
  };
  
  const getIconForType = (type) => {
    switch(type) {
      case 'Dining':
        return <Utensils className="h-6 w-6 text-hotel-primary" />;
      case 'Activity':
        return <Mountain className="h-6 w-6 text-hotel-primary" />;
      case 'Travel Insurance':
        return <Shield className="h-6 w-6 text-hotel-primary" />;
      case 'Spa':
        return <PalmTree className="h-6 w-6 text-hotel-primary" />;
      case 'Transportation':
        return <Briefcase className="h-6 w-6 text-hotel-primary" />;
      case 'Tour':
        return <Map className="h-6 w-6 text-hotel-primary" />;
      default:
        return <Coffee className="h-6 w-6 text-hotel-primary" />;
    }
  };

  // Function to continue to the next step
  const handleContinue = () => {
    navigate('/booking/step-two');
  };

  const groupedProducts = addonTypes.map(type => ({
    type,
    products: addOnProducts.filter(product => product.addOnType === type)
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Enhance Your Stay</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Customize your experience with our carefully selected add-ons and services
            </p>
          </div>

          {groupedProducts.map((group, index) => (
            <div key={group.type} className="mb-16 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center mb-6">
                {getIconForType(group.type)}
                <h2 className="font-serif text-2xl ml-2 text-gray-800">
                  {group.type === 'Activity' ? 'Experiences & Activities' : group.type}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.products.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 card-hover"
                  >
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-52 object-cover"
                      />
                      {product.discount && (
                        <div className="absolute top-4 right-4 bg-hotel-primary text-white text-xs uppercase tracking-wide py-1 px-2">
                          {product.discount}% Off
                        </div>
                      )}
                      {product.price && (
                        <div className="price-tag">
                          £{product.price}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-serif mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      {group.type === 'Travel Insurance' && (
                        <div className="mb-4">
                          <div className="flex items-center text-xs text-gray-500 mb-1">
                            <span className="font-medium mr-1">Areas Covered:</span> {product.region}
                          </div>
                          {product.exclusions && (
                            <div className="flex items-start text-xs text-gray-500">
                              <span className="font-medium mr-1">Exclusions:</span> 
                              <span className="line-clamp-1">{product.exclusions}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {group.type === 'Activity' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Date
                          </label>
                          <div className="date-selector-container">
                            <DateSelector 
                              availableDates={dateOptions}
                              selectedDate={selectedDates[product.id] || ''}
                              onDateSelect={(date) => handleDateSelect(product.id, date)}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="hotel" 
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="mt-2"
                        >
                          Add to Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-12 text-center">
            <Button 
              variant="hotel" 
              size="lg" 
              onClick={handleContinue}
              className="px-10"
            >
              Continue with Selected Add-ons
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data generation for demo purposes
function generateMockData() {
  return [
    // Dining add-ons
    {
      id: 'dining-1',
      name: 'Private Beachfront Dinner',
      description: 'Enjoy a romantic 4-course dinner with premium wine pairings on our private beach, complete with candles and personalized service.',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Dining',
      discount: 10
    },
    {
      id: 'dining-2',
      name: 'Chef's Table Experience',
      description: 'An exclusive culinary journey with our executive chef, featuring a personalized tasting menu with behind-the-scenes kitchen access.',
      price: 180,
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Dining'
    },
    {
      id: 'dining-3',
      name: 'Champagne Breakfast',
      description: 'Start your day with a luxury in-room champagne breakfast featuring artisanal pastries, gourmet eggs, and fresh seasonal fruit.',
      price: 70,
      imageUrl: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Dining'
    },
    
    // Activities
    {
      id: 'activity-1',
      name: 'Private Yacht Excursion',
      description: 'Explore the stunning coastline on a 4-hour private yacht charter with champagne, snacks, and snorkeling equipment included.',
      price: 350,
      imageUrl: 'https://images.unsplash.com/photo-1586156938613-769c76586cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Activity'
    },
    {
      id: 'activity-2',
      name: 'Guided Hiking Adventure',
      description: 'Discover hidden trails and breathtaking viewpoints with our expert local guide on this half-day hiking experience.',
      price: 85,
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Activity',
      discount: 15
    },
    {
      id: 'activity-3',
      name: 'Wine Tasting Tour',
      description: 'Visit three premium local wineries with transportation, tastings, and a charcuterie lunch included in this full-day experience.',
      price: 140,
      imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Activity'
    },
    
    // Spa
    {
      id: 'spa-1',
      name: 'Couples Massage Ritual',
      description: 'A 90-minute signature couples massage featuring aromatic oils, followed by champagne and chocolate-covered strawberries.',
      price: 240,
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Spa'
    },
    {
      id: 'spa-2',
      name: 'Deluxe Spa Day',
      description: 'Indulge in a full day of pampering with a facial, body wrap, massage, and access to all spa facilities.',
      price: 320,
      imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Spa',
      discount: 20
    },
    
    // Travel Insurance
    {
      id: 'insurance-1',
      name: 'Premium Travel Protection',
      description: 'Comprehensive coverage including trip cancellation, medical emergencies, lost luggage, and 24/7 travel assistance.',
      price: 75,
      imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Travel Insurance',
      region: 'Worldwide',
      exclusions: 'Pre-existing conditions, extreme sports, pandemic-related cancellations'
    },
    {
      id: 'insurance-2',
      name: 'Essential Coverage Plan',
      description: 'Basic protection covering emergency medical expenses, trip interruption, and baggage delay.',
      price: 45,
      imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      addOnType: 'Travel Insurance',
      region: 'Europe, North America',
      exclusions: 'Adventure activities, luxury items, business equipment'
    }
  ];
}

export default AddOn;
