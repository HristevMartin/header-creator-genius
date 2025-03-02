
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { hotelData } from '../data/hotelRooms';
import { ChevronLeft, Check, Heart, Info, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const HotelDetail = () => {
  const { id } = useParams();
  const [activeRoom, setActiveRoom] = useState(hotelData.rooms[0]);
  const [selectedDates] = useState({
    from: new Date(2025, 2, 11), // March 11, 2025
    to: new Date(2025, 2, 12), // March 12, 2025
  });
  
  // In a real app, you would fetch the hotel data based on the ID
  const hotel = hotelData;
  
  // Calculate available rooms randomly between 1-5
  const availableRooms = Math.floor(Math.random() * 5) + 1;
  
  return (
    <div className="w-full mx-auto bg-[#f8f8f5]">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        
        {/* Hotel Title */}
        <div className="absolute bottom-8 left-8 text-white">
          <div className="text-sm uppercase tracking-wider mb-2">LONDON, UNITED KINGDOM</div>
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-white" />
            <h1 className="font-serif text-4xl font-medium">{hotel.name}</h1>
          </div>
        </div>
        
        {/* Price Indicator */}
        <div className="absolute bottom-8 right-8 text-white text-right">
          <div className="text-sm">Price per night from</div>
          <div className="text-2xl font-medium">£{activeRoom.pricePerNight}</div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-[#1d2b36] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="bg-transparent h-14 gap-8">
              <TabsTrigger 
                value="overview" 
                className="text-white/70 data-[state=active]:text-white uppercase text-xs tracking-wider hover:text-white transition-colors"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="photos" 
                className="text-white/70 data-[state=active]:text-white uppercase text-xs tracking-wider hover:text-white transition-colors"
              >
                Photos
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="text-white/70 data-[state=active]:text-white uppercase text-xs tracking-wider hover:text-white transition-colors"
              >
                Location
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="text-white/70 data-[state=active]:text-white uppercase text-xs tracking-wider hover:text-white transition-colors"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="rooms" 
                className="text-white uppercase text-xs tracking-wider bg-transparent relative data-[state=active]:bg-transparent"
              >
                Get a Room
                {/* Active indicator for the selected tab */}
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-white data-[state=active]:block hidden"></span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Currency Selector (static for now) */}
          <div className="border border-white/20 rounded px-3 py-1 text-xs">
            GBP
          </div>
        </div>
      </div>
      
      {/* Back to Search */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/hotels" className="inline-flex items-center bg-[#8B0000] text-white px-4 py-2 rounded-sm hover:bg-[#700000] transition-colors text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            BACK TO SEARCH RESULTS
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {hotel.rooms.map((room) => (
          <div key={room.id} className="mb-8 bg-white rounded-sm overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Room Image */}
              <div className="h-[250px]">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Room Details */}
              <div className="p-6">
                <h2 className="text-2xl font-serif mb-2">{room.name}</h2>
                <div className="mb-3 flex items-center">
                  <span className="font-semibold mr-2">•</span>
                  <span className="text-sm">{room.occupancy.adults} guests</span>
                </div>
                
                <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                  {room.description}
                </p>
                
                <button className="text-[#8B0000] flex items-center gap-1 mb-4 hover:underline text-sm">
                  Read more
                </button>
                
                {/* Room Features */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                      <Check className="h-3 w-3 text-[#1E8449]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pricing and Booking Column */}
              <div className="p-6 bg-[#f8f8f5] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif mb-2">Best Available Rate</h3>
                  <p className="text-gray-600 text-xs mb-3">Room only rate</p>
                  
                  <div className="flex items-center gap-1 text-[#8B0000] text-xs mb-4">
                    <span className="text-lg">✿</span>
                    <span>Smith Extra: One Aperol cocktail</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per night</span>
                      <span className="font-bold">£{room.pricePerNight}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total stay</span>
                      <span className="font-bold">£{room.pricePerNight}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit now</span>
                      <span className="text-[#1E8449] font-bold">£0.00</span>
                    </div>
                  </div>
                  
                  <div className="text-[#1E8449] text-xs mb-2">
                    Free cancellation before 09 of March 2025
                  </div>
                  
                  <Button className="w-full bg-[#1E8449] hover:bg-[#186a3b] text-white px-4 py-2 h-auto text-xs uppercase font-normal">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Selected Dates (moved to below the rooms) */}
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white mb-6">
        <div className="text-center uppercase text-sm font-medium tracking-wider mb-4">
          YOUR SELECTED DATES
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="bg-[#f8f8f5] border rounded flex items-center px-4 py-2 w-48">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{format(selectedDates.from, 'd MMM yyyy')}</span>
          </div>
          
          <div className="text-gray-400">→</div>
          
          <div className="bg-[#f8f8f5] border rounded flex items-center px-4 py-2 w-48">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{format(selectedDates.to, 'd MMM yyyy')}</span>
          </div>
        </div>
        
        <div className="text-center text-[#8B0000] font-medium text-sm">
          {availableRooms} rooms left
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
