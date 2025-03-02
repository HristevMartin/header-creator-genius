
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { hotelData } from '../data/hotelRooms';

const BookingStep2 = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [arrivalTime, setArrivalTime] = useState('Don\'t know');
  
  const hotel = hotelData;
  
  return (
    <div className="w-full mx-auto bg-hotel-gray pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-7">
          {/* Your Details Section */}
          <div className="bg-white p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-hotel-text">Your Details</h2>
              <Link to="/sign-in" className="text-hotel-primary hover:underline text-sm">
                Sign In
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name*"
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name*"
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="sr-only">Phone number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number*"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              />
              <p className="text-gray-500 text-sm mt-1 italic">We may need to contact you about your booking</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address*"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              />
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="bg-white p-6 mb-6 border border-gray-200">
            <div className="flex items-start gap-3">
              <input
                id="newsletter"
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-1 h-5 w-5 text-hotel-primary"
              />
              <div>
                <label htmlFor="newsletter" className="text-hotel-text">
                  Sign-up to our newsletter to discover the latest luxury hotels and villas with up to 50% off
                </label>
                <p className="text-gray-500 text-sm mt-2">
                  We may contact you by email, text message or post. You can update this in your settings at any time.
                </p>
              </div>
            </div>
          </div>
          
          {/* About Your Stay */}
          <div className="bg-white p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-serif text-hotel-text mb-6">About your stay</h2>
            
            <div className="mb-6">
              <label htmlFor="arrivalTime" className="block text-hotel-text mb-2">Approximate time of arrival?</label>
              <div className="relative">
                <select
                  id="arrivalTime"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none"
                >
                  <option value="Don't know">Don't know</option>
                  <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
                  <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
                  <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
                  <option value="Night (8pm-12am)">Night (8pm-12am)</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="specialRequest" className="sr-only">Special request</label>
              <textarea
                id="specialRequest"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Add a special request or comment to your booking"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 min-h-32"
              />
            </div>
          </div>
        </div>
        
        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-black text-white p-4">
              <h2 className="text-xl font-medium text-center">Booking Summary</h2>
            </div>
            
            <div className="bg-white p-6 border-x border-b border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-serif">Bingham Riverhouse</h3>
                <button className="text-hotel-primary hover:underline text-sm">
                  Remove
                </button>
              </div>
              
              <p className="text-gray-700 mb-6">
                61-63 Petersham Road, Richmond, London, England TW10 6UT, United Kingdom
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Room</div>
                  <div className="col-span-3">Cosy Room</div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Dates</div>
                  <div className="col-span-3">11 March 2025 - 12 March 2025 (1 night)</div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Rate</div>
                  <div className="col-span-3">Best Available Rate</div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Guests</div>
                  <div className="col-span-3">2 Adults</div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Beds</div>
                  <div className="col-span-3 flex items-center">
                    <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="13" width="20" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M2 16V9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V16" stroke="currentColor" strokeWidth="2"/>
                      <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    x1
                  </div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Includes</div>
                  <div className="col-span-3">This is a room only rate</div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Smith Extra</div>
                  <div className="col-span-3 flex">
                    <span className="text-hotel-primary text-lg mr-2">✿</span>
                    <span>One Rose Aperol cocktail each in the Bingham Bar</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Cancellation</div>
                  <div className="col-span-3">
                    Please be aware that cancellations made less than 48 hours before 14:00 on the day of arrival will incur a charge of 1 night. Please be aware that cancellations made less than 24 hours before 14:00 on the day of arrival will incur a charge in full.
                  </div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Tax</div>
                  <div className="col-span-3">Tax 20% included</div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Useful Information</div>
                  <div className="col-span-3">
                    The bedroom rates are inclusive of a discretionary service charge of £10 per night.
                  </div>
                </div>
                
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-gray-700 font-medium">Check in/ Out</div>
                  <div className="col-span-3">Check-in: from 3pm. Check-out: 11am.</div>
                </div>
              </div>
              
              <button className="flex items-center justify-center w-full text-hotel-primary mb-4">
                <span>Close policies</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-white p-6 mt-4 border border-gray-200">
              <Button className="w-full bg-hotel-green hover:bg-hotel-green/90 text-white px-4 py-6 h-auto text-base uppercase">
                CONTINUE TO PAYMENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStep2;
