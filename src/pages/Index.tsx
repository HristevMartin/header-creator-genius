
import { ChevronRight, ArrowRight, Calendar, MapPin, Users, X, Minus, Plus, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

const Index = () => {
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("2 adults, 0 children");
  const [dateRange, setDateRange] = useState("Check in → Check out");
  
  // States for dropdowns
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Refs for closing dropdowns when clicking outside
  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  
  // Simple calendar generation
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Adjust first day to start from Monday (0) instead of Sunday (0)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start a new range
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    } else {
      // Complete the range
      if (clickedDate < selectedStartDate) {
        setSelectedStartDate(clickedDate);
        setSelectedEndDate(selectedStartDate);
      } else {
        setSelectedEndDate(clickedDate);
      }
    }
  };
  
  const isDateInRange = (day: number) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date >= selectedStartDate && date <= selectedEndDate;
  };
  
  const isDateSelected = (day: number) => {
    if (!selectedStartDate) return false;
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (selectedEndDate) {
      return date.getTime() === selectedStartDate.getTime() || date.getTime() === selectedEndDate.getTime();
    }
    
    return date.getTime() === selectedStartDate.getTime();
  };
  
  // Effect to update dateRange when start/end dates change
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const formattedStart = format(selectedStartDate, "MMM d");
      const formattedEnd = format(selectedEndDate, "MMM d");
      setDateRange(`${formattedStart} → ${formattedEnd}`);
      setIsDatePickerOpen(false);
    } else if (selectedStartDate) {
      const formattedStart = format(selectedStartDate, "MMM d");
      setDateRange(`${formattedStart} → Select end date`);
    }
  }, [selectedStartDate, selectedEndDate]);
  
  // Effect to update guests string when adults/children change
  useEffect(() => {
    setGuests(`${adults} ${adults === 1 ? 'adult' : 'adults'}, ${children} ${children === 1 ? 'child' : 'children'}`);
  }, [adults, children]);
  
  // Effect to handle clicking outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setIsGuestSelectorOpen(false);
      }
      
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Helper to apply date
  const applyDates = () => {
    if (selectedStartDate && selectedEndDate) {
      setIsDatePickerOpen(false);
    }
  };
  
  // Clear dates
  const clearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setDateRange("Check in → Check out");
  };
  
  // Apply guests selection
  const applyGuests = () => {
    setIsGuestSelectorOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-36 md:pt-36">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[70vh] bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="bg-black/30 w-full h-full min-h-[70vh] flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center mb-6 px-4">
              Extraordinary places to stay
            </h2>
            <p className="text-lg md:text-xl text-white max-w-2xl text-center mb-10 font-light px-4">
              Handpicked luxury and boutique hotels for the discerning traveler
            </p>
            
            {/* Search Form */}
            <div className="w-full max-w-5xl mx-auto px-4 mb-8 relative z-10">
              <div className="bg-white p-1 rounded-none flex flex-col md:flex-row relative">
                {/* Destination */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-4 group">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-light">DESTINATION</div>
                  <div className="flex items-center relative">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Where would you like to go?" 
                      className="w-full outline-none text-sm"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                    
                    {/* Destination blur backdrop - shows when typing */}
                    {destination.length > 0 && (
                      <div className="absolute inset-0 -m-4 bg-black/20 backdrop-blur-sm fixed z-10"></div>
                    )}
                  </div>
                </div>
                
                {/* Dates */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-4 relative">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-light">DATES</div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <div 
                      className="w-full outline-none text-sm cursor-pointer"
                      onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    >
                      {dateRange}
                    </div>
                  </div>
                  
                  {/* Date Picker */}
                  {isDatePickerOpen && (
                    <div 
                      ref={datePickerRef}
                      className="absolute top-full left-0 mt-2 bg-white shadow-lg z-20 w-auto md:w-[600px] border border-gray-200"
                    >
                      <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                          <div className="text-xs uppercase font-medium mb-1">CHECK IN</div>
                          <div className="text-gray-400 text-sm">
                            {selectedStartDate ? format(selectedStartDate, "MMM d, yyyy") : "Add dates"}
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="text-xs uppercase font-medium mb-1">CHECK OUT</div>
                          <div className="text-gray-400 text-sm">
                            {selectedEndDate ? format(selectedEndDate, "MMM d, yyyy") : "Add dates"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">
                            {format(currentMonth, "MMMM yyyy").toUpperCase()}
                          </h4>
                          <div className="flex space-x-2">
                            <button 
                              onClick={prevMonth}
                              className="p-1 hover:bg-gray-100 rounded-full"
                            >
                              <ChevronRight className="h-5 w-5 transform rotate-180" />
                            </button>
                            <button 
                              onClick={nextMonth}
                              className="p-1 hover:bg-gray-100 rounded-full"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                          {/* Day labels */}
                          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                            <div key={i} className="text-center text-sm font-medium p-2">{day}</div>
                          ))}
                          
                          {/* Calendar days */}
                          {generateCalendarDays(currentMonth).map((day, i) => (
                            <div 
                              key={i} 
                              className="text-center p-2"
                            >
                              {day && (
                                <button
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                                    ${isDateSelected(day) ? 'bg-black text-white' : ''}
                                    ${isDateInRange(day) && !isDateSelected(day) ? 'bg-gray-100' : ''}
                                    hover:bg-gray-200 transition-colors
                                  `}
                                  onClick={() => handleDateClick(day)}
                                >
                                  {day}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 flex justify-between border-t border-gray-200">
                        <button 
                          onClick={clearDates}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Clear
                        </button>
                        <button 
                          onClick={applyDates}
                          className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Guests */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-4 relative">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-light">GUESTS</div>
                  <div className="flex items-center">
                    <Users size={16} className="text-gray-400 mr-2" />
                    <div 
                      className="w-full outline-none text-sm cursor-pointer"
                      onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
                    >
                      {guests}
                    </div>
                  </div>
                  
                  {/* Guest Selector */}
                  {isGuestSelectorOpen && (
                    <div 
                      ref={guestSelectorRef}
                      className="absolute top-full left-0 mt-2 bg-white shadow-lg z-20 w-72 border border-gray-200"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <div className="font-medium">Adults</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              disabled={adults <= 1}
                            >
                              <Minus size={16} className={adults <= 1 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                            <span className="w-6 text-center">{adults}</span>
                            <button 
                              onClick={() => setAdults(adults + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus size={16} className="text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <div className="font-medium">Children</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              disabled={children <= 0}
                            >
                              <Minus size={16} className={children <= 0 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                            <span className="w-6 text-center">{children}</span>
                            <button 
                              onClick={() => setChildren(children + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus size={16} className="text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-4">
                          This is for one room only. Add more rooms later.
                        </p>
                        
                        <button 
                          onClick={applyGuests}
                          className="w-full bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Search Button */}
                <div className="p-2 md:p-3 flex items-center">
                  <button className="bg-black text-white w-full md:w-auto px-6 py-3 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors">
                    <span className="mr-2">Search</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <button className="bg-white text-black px-10 py-3 rounded-none hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wide text-sm font-light">
              Explore Our Collection
            </button>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8 text-center">
              Featured Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCollections.map((collection) => (
                <div key={collection.title} className="group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={collection.image} 
                      alt={collection.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end">
                      <div className="p-6 w-full">
                        <h4 className="text-xl font-serif text-white mb-2">{collection.title}</h4>
                        <p className="text-sm text-white font-light">{collection.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="inline-flex items-center text-black border-b border-black pb-1 text-sm hover:border-gray-500 hover:text-gray-500 transition-colors">
                View all collections <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* Offers Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8 text-center">
              Special Offers & Deals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialOffers.map((offer) => (
                <div key={offer.title} className="bg-white group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {offer.tag && (
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs uppercase tracking-wide font-light">
                        {offer.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-serif text-gray-900 mb-2">{offer.title}</h4>
                    <p className="text-sm text-gray-700 font-light mb-4">{offer.description}</p>
                    <p className="text-xs text-gray-500 font-light">From £{offer.priceFrom} per night</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="inline-flex items-center text-black border-b border-black pb-1 text-sm hover:border-gray-500 hover:text-gray-500 transition-colors">
                View all offers <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* Travel Guide Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8 text-center">
              Travel Inspiration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inspirationArticles.map((article) => (
                <div key={article.title} className="group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{article.category}</p>
                    <h4 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">{article.title}</h4>
                    <p className="text-sm text-gray-700 font-light">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="inline-flex items-center text-black border-b border-black pb-1 text-sm hover:border-gray-500 hover:text-gray-500 transition-colors">
                Read our travel journal <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* Membership Banner */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-serif mb-4">Join Mr & Mrs Smith</h3>
            <p className="text-lg font-light max-w-2xl mx-auto mb-8">
              Enjoy exclusive perks, member rates and free extras at the world's most extraordinary hotels
            </p>
            <button className="bg-white text-black px-10 py-3 rounded-none hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wide text-sm font-light">
              Become a member
            </button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">Stay in the know</h3>
            <p className="text-lg text-gray-700 font-light max-w-2xl mx-auto mb-8">
              Sign up to our newsletter for the latest news, offers and travel inspiration
            </p>
            <div className="flex flex-col md:flex-row max-w-lg mx-auto gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
              />
              <button className="bg-black text-white px-8 py-3 rounded-none hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide text-sm font-light">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="py-12 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-serif tracking-wider text-black font-semibold mb-2">
              MR<span className="inline-block mx-1 transform rotate-12">&</span>MRS SMITH
            </h1>
            <p className="text-sm text-gray-600">The travel club for hotel lovers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">About us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Travel</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Hotels</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Villas</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Destinations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Help center</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">FAQs</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Follow us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Instagram</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Twitter</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Mr & Mrs Smith. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sample data for the page
const featuredCollections = [
  {
    title: "Beachfront Escapes",
    description: "Sun, sea and sensational stays",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "City Breaks",
    description: "Urban adventures in style",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Mountain Retreats",
    description: "Breathtaking views and fresh air",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

const specialOffers = [
  {
    title: "Villa Cimbrone, Amalfi Coast",
    description: "Complimentary breakfast and spa access",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tag: "Exclusive",
    priceFrom: 450
  },
  {
    title: "The Lowell, New York",
    description: "Stay 3 nights, pay for 2",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tag: "Limited time",
    priceFrom: 725
  },
  {
    title: "Soneva Jani, Maldives",
    description: "Complimentary half-board upgrade",
    image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tag: "Member exclusive",
    priceFrom: 1950
  }
];

const inspirationArticles = [
  {
    title: "The Top 10 Beach Destinations for 2023",
    excerpt: "From secluded coves to vibrant coastal towns, discover our favorite seaside escapes.",
    image: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Beach"
  },
  {
    title: "How to Pack Like a Pro for Long-Haul Flights",
    excerpt: "Expert tips for staying comfortable and arriving fresh after a long journey.",
    image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Travel Tips"
  },
  {
    title: "The Rise of Sustainable Luxury Travel",
    excerpt: "How high-end hotels are embracing eco-friendly practices without compromising on luxury.",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Sustainability"
  }
];

export default Index;
