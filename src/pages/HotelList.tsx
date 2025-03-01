import { Heart, MapPin, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Bingham Riverhouse",
    location: "LONDON, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    style: "Trendy townhouse",
    setting: "Richmond riverside",
    price: "£173.00",
    perNight: "for 1 night",
    extras: "One Rose Aperol cocktail each in the Bingham Bar",
    rating: 5,
    reviews: 3,
    hasGuarantee: true
  },
  {
    id: 2,
    name: "High Road House",
    location: "LONDON, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    style: "Cool members' club outpost",
    setting: "Boulevard in the 'burbs",
    price: "£195.00",
    perNight: "for 1 night",
    extras: "",
    rating: 4.5,
    reviews: 4,
    hasGuarantee: true
  },
  {
    id: 3,
    name: "The Soho Hotel",
    location: "LONDON, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    style: "Vibrant luxury retreat",
    setting: "Soho's leafy square",
    price: "£385.00",
    perNight: "for 1 night",
    extras: "Welcome cocktails for two",
    rating: 5,
    reviews: 7,
    hasGuarantee: true
  },
  {
    id: 4,
    name: "The Ned",
    location: "LONDON, UNITED KINGDOM",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    style: "Grand banking hall conversion",
    setting: "City of London",
    price: "£250.00",
    perNight: "for 1 night",
    extras: "Access to exclusive rooftop pool",
    rating: 4.5,
    reviews: 5,
    hasGuarantee: true
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          className={cn(
            "w-5 h-5", 
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
          )} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

// Hotel card component
const HotelCard = ({ hotel }: { hotel: typeof hotels[0] }) => {
  return (
    <div className="flex flex-col md:flex-row border-b border-gray-200 py-8 animate-fade-in">
      {/* Left side - Hotel image */}
      <div className="relative md:w-1/2 lg:w-6/12 mb-4 md:mb-0 md:mr-6">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-[300px] md:h-[250px] object-cover"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      
      {/* Right side - Hotel details */}
      <div className="md:w-1/2 lg:w-6/12 flex flex-col justify-between">
        <div>
          <div className="text-sm text-gray-500 tracking-wider mb-2 uppercase">
            {hotel.location.replace(', UNITED KINGDOM', '')}
            <span className="lowercase">, </span>
            <span className="capitalize">united kingdom</span>
          </div>
          <h2 className="text-3xl font-serif mb-4">{hotel.name}</h2>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 mb-6">
            <div>
              <span className="text-gray-600 text-lg">Style</span>
              <p className="font-medium">{hotel.style}</p>
            </div>
            <div>
              <span className="text-gray-600 text-lg">Setting</span>
              <p className="font-medium">{hotel.setting}</p>
            </div>
          </div>
          
          <button className="flex items-center text-white bg-hotel-primary hover:bg-opacity-90 px-6 py-3 rounded mb-6">
            <MapPin size={18} className="mr-2" />
            <span className="font-medium">Map view</span>
          </button>
          
          {hotel.extras && (
            <div className="bg-gray-100 p-5 rounded-md flex items-start mb-6">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 bg-hotel-primary rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>
              </div>
              <div>
                <span className="font-bold text-hotel-primary">Smith Extra</span>
                <span className="ml-1">{hotel.extras}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-4">
          <div className="mb-4 md:mb-0">
            <div className="text-sm text-gray-600 mb-1">Product Rating</div>
            <div className="flex items-center">
              <div className="mr-2">
                <StarRating rating={hotel.rating} />
              </div>
              <span className="text-sm text-gray-600">{hotel.reviews} reviews</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-right">
              <span className="text-3xl font-semibold">{hotel.price}</span>
              <div className="text-sm text-gray-600">{hotel.perNight}</div>
              <div className="text-sm text-gray-600">includes taxes and fees</div>
            </div>
            
            {hotel.hasGuarantee && (
              <div className="flex items-center text-hotel-green text-sm mt-2 mb-4">
                <Check size={18} className="mr-1" />
                <span>Best-price guarantee</span>
              </div>
            )}
            
            <Link 
              to={`/hotels/${hotel.id}`} 
              className="bg-hotel-green hover:bg-green-700 text-white font-medium px-10 py-4 w-full md:w-auto uppercase text-center"
            >
              Select Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelList = () => {
  return (
    <div className="mt-24 pt-8 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar/Filters - Left side */}
          <div className="lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
            <div className="border border-gray-200 mb-4">
              <div className="bg-gray-900 text-white p-4">
                <div className="font-medium">49 HOTELS</div>
              </div>
              <div className="border-b border-gray-200 p-4">
                <div className="font-medium">0 VILLAS</div>
              </div>
              <div className="p-4">
                <div className="font-medium">EXPLORE</div>
              </div>
            </div>
            
            {/* Filter panels */}
            <div className="border border-gray-200 mb-4">
              <div className="p-4 flex items-center justify-between border-b border-gray-200">
                <span className="font-medium">Price Low to High</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="p-4 flex items-center justify-between border-b border-gray-200">
                <span className="font-medium">Show: 10</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="font-medium">GBP</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Hotel list - Right side */}
          <div className="lg:w-3/4">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
