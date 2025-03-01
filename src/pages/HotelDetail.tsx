
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { hotelData } from '../data/hotelRooms';
import { ChevronLeft, Star, MapPin, Check, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const HotelDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    from: new Date(2025, 2, 11), // March 11, 2025
    to: new Date(2025, 2, 12), // March 12, 2025
  });
  
  // In a real app, you would fetch the hotel data based on the ID
  // Here we're using our hardcoded data
  const hotel = hotelData;
  
  const nights = Math.ceil((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 60 * 60 * 24));

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center mb-8 text-sm">
        <ChevronLeft className="h-4 w-4 mr-1" />
        <a href="/hotels" className="text-gray-600 hover:underline">Back to hotels</a>
      </div>
      
      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">{hotel.name}</h1>
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-600">{hotel.location}</span>
            <div className="ml-4 flex">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-hotel-primary fill-hotel-primary" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-hotel-primary hover:bg-red-900 text-white">
            Book Now
          </Button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          {/* Main Image Carousel */}
          <div className="relative mb-6 rounded-lg overflow-hidden" style={{ height: '480px' }}>
            <img 
              src={hotel.images[activeImageIndex]} 
              alt={`${hotel.name} - image ${activeImageIndex + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center">
              <button 
                onClick={prevImage}
                className="h-12 w-12 bg-white/80 rounded-full flex items-center justify-center ml-4 hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage}
                className="h-12 w-12 bg-white/80 rounded-full flex items-center justify-center mr-4 hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
              {activeImageIndex + 1} / {hotel.images.length}
            </div>
          </div>
          
          {/* Hotel Tabs Section */}
          <Tabs defaultValue="rooms" className="mb-8">
            <TabsList className="w-full border-b border-gray-200 mb-6 space-x-8">
              <TabsTrigger 
                value="rooms" 
                className="pb-3 font-medium text-base data-[state=active]:border-b-2 data-[state=active]:border-hotel-primary rounded-none"
              >
                Rooms
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="pb-3 font-medium text-base data-[state=active]:border-b-2 data-[state=active]:border-hotel-primary rounded-none"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="pb-3 font-medium text-base data-[state=active]:border-b-2 data-[state=active]:border-hotel-primary rounded-none"
              >
                Location
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="rooms" className="mt-0">
              {/* Room Cards */}
              {hotel.rooms.map((room) => (
                <div key={room.id} className="border border-gray-200 rounded-lg mb-6 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Room Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-60 md:h-full">
                        <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    {/* Room Details */}
                    <div className="md:col-span-2 p-6">
                      <h3 className="font-serif text-xl font-semibold mb-2">{room.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-600 mb-4">{room.description}</p>
                          
                          <div className="flex flex-wrap gap-y-2 mb-4">
                            <div className="flex items-center w-1/2">
                              <span className="text-sm font-medium mr-2">Size:</span>
                              <span className="text-sm text-gray-600">{room.size}</span>
                            </div>
                            <div className="flex items-center w-1/2">
                              <span className="text-sm font-medium mr-2">Beds:</span>
                              <span className="text-sm text-gray-600">{room.beds}</span>
                            </div>
                            <div className="flex items-center w-1/2">
                              <span className="text-sm font-medium mr-2">Sleeps:</span>
                              <span className="text-sm text-gray-600">
                                {room.occupancy.adults} adults
                                {room.occupancy.children > 0 && `, ${room.occupancy.children} children`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold mb-1">Room includes:</h4>
                            {room.amenities.slice(0, 4).map((amenity, index) => (
                              <div key={index} className="flex items-start text-sm">
                                <Check className="h-4 w-4 mr-2 mt-0.5 text-hotel-primary" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                            {room.amenities.length > 4 && (
                              <button className="text-sm text-hotel-primary hover:underline">
                                + {room.amenities.length - 4} more amenities
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="bg-green-50 border border-hotel-green p-3 mb-4 rounded-md">
                              <div className="text-sm text-hotel-green font-medium">Smith Extra: {room.extras}</div>
                            </div>
                            
                            <div className="text-sm mb-1">
                              <span className="font-medium">Cancellation:</span> {room.cancellationPolicy}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-baseline justify-end mb-2">
                              <span className="text-2xl font-bold">£{room.pricePerNight}</span>
                              <span className="text-gray-600 ml-1">per night</span>
                            </div>
                            <div className="text-sm text-right text-gray-600 mb-4">
                              £{room.pricePerNight * nights} total for {nights} {nights === 1 ? 'night' : 'nights'}
                            </div>
                            <Button className="w-full bg-hotel-primary hover:bg-red-900 text-white">
                              Select Room
                            </Button>
                            <div className="mt-2 flex justify-center items-center">
                              <span className="text-xs text-hotel-green font-medium">Best-price guarantee</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="details" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="font-serif text-2xl font-semibold mb-4">Hotel Details</h2>
                  <p className="text-gray-700 mb-6">{hotel.description}</p>
                  
                  <h3 className="font-serif text-xl font-semibold mb-3">Smith Extra</h3>
                  <div className="bg-green-50 border border-hotel-green p-4 mb-6 rounded-md">
                    <p className="text-hotel-green">{hotel.smithExtra}</p>
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold mb-3">Highlights</h3>
                  <ul className="mb-6 space-y-2">
                    {hotel.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 mt-0.5 text-hotel-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-serif text-xl font-semibold mb-4">Facilities</h3>
                    <ul className="space-y-2">
                      {hotel.facilities.map((facility, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-hotel-primary" />
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="mt-0">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-serif text-xl mb-2">Map View</h3>
                  <p className="text-gray-600">{hotel.location}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column (1/3 width on large screens) - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-serif text-xl font-semibold mb-4">Your Stay</h3>
              
              <div className="mb-4">
                <div className="text-sm font-medium mb-1">Check-in</div>
                <div className="p-3 border border-gray-200 rounded-md bg-white">
                  {format(selectedDates.from, 'EEE, d MMM yyyy')}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium mb-1">Check-out</div>
                <div className="p-3 border border-gray-200 rounded-md bg-white">
                  {format(selectedDates.to, 'EEE, d MMM yyyy')}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Length of stay:</span>
                  <span className="text-sm">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Guests:</span>
                  <span className="text-sm">2 adults</span>
                </div>
              </div>
              
              <Button className="w-full bg-hotel-primary hover:bg-red-900 text-white">
                Change Dates
              </Button>
            </div>
            
            <div className="bg-green-50 border border-hotel-green p-6 rounded-lg">
              <h3 className="font-serif text-lg font-semibold mb-2 text-gray-800">Why book with us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-hotel-green" />
                  <span className="text-sm">Best-price guarantee</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-hotel-green" />
                  <span className="text-sm">Smith Extras with every stay</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-hotel-green" />
                  <span className="text-sm">24/7 personal travel experts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-hotel-green" />
                  <span className="text-sm">No booking or cancellation fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
