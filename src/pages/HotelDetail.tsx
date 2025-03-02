
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { hotelData } from '../data/hotelRooms';
import { ChevronLeft, Heart, Calendar, Check, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Room Image */}
              <div className="h-[350px]">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Room Details and Pricing */}
              <div className="grid grid-cols-1">
                {/* Room Details */}
                <div className="p-6 border-b">
                  <h2 className="text-3xl font-serif mb-4">{room.name}</h2>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <span className="font-bold text-gray-700">•</span>
                    <span className="text-gray-700">{room.occupancy.adults} guests</span>
                  </div>
                  
                  <p className="text-gray-700 mb-5">
                    {room.description}
                  </p>
                  
                  <button className="text-[#8B0000] flex items-center hover:underline mb-3">
                    Read more <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  
                  {/* Selected Dates Section */}
                  <div className="mt-6 bg-[#f8f8f5] p-4">
                    <div className="uppercase text-sm font-medium tracking-wider mb-4 text-center">
                      YOUR SELECTED DATES
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="bg-white border rounded flex items-center px-3 py-1.5">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{format(selectedDates.from, 'd MMM yyyy')}</span>
                      </div>
                      
                      <div className="text-gray-400">→</div>
                      
                      <div className="bg-white border rounded flex items-center px-3 py-1.5">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{format(selectedDates.to, 'd MMM yyyy')}</span>
                      </div>
                    </div>
                    
                    <div className="text-center text-[#8B0000] font-medium">
                      {availableRooms} rooms left
                    </div>
                  </div>
                </div>
                
                {/* Pricing and Booking Section */}
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">Best Available Rate</h3>
                  <p className="text-gray-600 text-sm mb-4">This is a room only rate</p>
                  
                  <div className="flex items-center gap-2 text-[#8B0000] text-sm mb-6">
                    <span className="text-xl">✿</span>
                    <span>Smith Extra: One Aperol cocktail each in the Bingham Bar</span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Per night</span>
                      <span className="font-bold text-lg">£{room.pricePerNight.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total stay (inc. taxes and fees)</span>
                      <span className="font-bold text-lg">£{room.pricePerNight.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Deposit to pay us now</span>
                      <span className="text-[#1E8449] font-bold text-lg">£0.00</span>
                    </div>
                  </div>
                  
                  <div className="text-[#1E8449] text-sm mb-4">
                    Free cancellation before 09 of March 2025
                  </div>
                  
                  <Button className="w-full bg-[#1E8449] hover:bg-[#186a3b] text-white px-4 py-6 h-auto text-base uppercase">
                    BOOK NOW
                  </Button>
                  
                  <div className="text-xs text-gray-500 mt-4">
                    For more details see <button className="text-gray-700 underline">terms & conditions <ChevronDown className="h-3 w-3 inline" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDetail;
