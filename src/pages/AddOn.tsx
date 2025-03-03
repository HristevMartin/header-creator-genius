'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUserDeviceType } from '~/services/defineCustomer';
import DateSelector from './_components/dateSelector';
import { useCustomLocale } from '~/context/LocaleProvider';
import { AddToCart } from '../../Hotels/hoteldetail/_components/AddToCart';
import { Calendar, Clock, MapPin, CheckCircle, Shield, Tag, AlertTriangle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const AddOn = () => {
  const [addOnProducts, setAddOnProducts] = useState([]);
  const [addonTypes, setAddonTypes] = useState([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDates, setSelectedDates] = useState({});
  const [dateOptions, setDateOptions] = useState([]);

  const destination = searchParams?.get('destination');
  const service = searchParams?.get('service');

  const { locale: { lang, currency } } = useCustomLocale();

  const { data: session } = useSession();
  let userId = session?.user?.id;
  userId = userId ? userId : 0;

  const userDeviceType = useUserDeviceType();

  const commercialApiUrl = process.env.NEXT_PUBLIC_LOCAL_BASE_URL_COMMERCIAL;

  useEffect(() => {
    const searchCriteria = localStorage.getItem('searchCriteria');
    if (searchCriteria) {
      const searchCriteriaObj = JSON.parse(searchCriteria);

      setStartDate(searchCriteriaObj.departureDate);
      setEndDate(searchCriteriaObj.departureDateEnd);

      const dates = generateDateRange(
        searchCriteriaObj.departureDate,
        searchCriteriaObj.departureDateEnd,
      );
      setDateOptions(dates);
    }
  }, []);


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${commercialApiUrl}/ancillaries/search?city=${destination}&customerId=${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'locale': lang,
              'currency': currency,
            },
          }
        )

        if (response.status === 200) {
          let data = await response.json();
          console.log('show me the data', data);
          data = modifyAddOnData(data);

          setAddOnProducts(data);
          const types = new Set(data.map((product) => product.addOnType));

          setAddonTypes([...types]);
          setLoading(false);
        }
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [destination]);

  const generateDateRange = (start, end) => {
    const dateArray = [];
    const currentDate = new Date(start);
    const endDt = new Date(end);

    while (currentDate <= endDt) {
      dateArray.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  function modifyAddOnData(data) {
    let modifiedData = Object.keys(data)
      .map((x) => data[x])
      .flat();
    modifiedData.forEach((item) => {
      item.addOnType = item.addon_type;
      delete item.addon_type;
    });

    console.log('modifiedData', modifiedData);
    return modifiedData;
  }

  const handleDateSelect = (productId, event) => {
    const newDate = event.target.value;
    console.log('the new date', newDate);
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [productId]: newDate, // Maps the product ID to the new date
    }));
    console.log(`Selected date for product ${productId}: ${newDate}`);
  };

  console.log('selectedDatesMMM', selectedDates);

  const groupedProducts = addonTypes.map((type) => ({
      type,
      products: addOnProducts.filter((product) => product.addOnType === type),
  }));

  console.log('show me the grouped products', groupedProducts);


  return (
    <div className="bg-[#f8f8f5] min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-primary"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h1 className="font-serif text-3xl md:text-4xl text-hotel-text mb-2">Enhance Your Journey</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Customize your perfect stay with our curated selection of extras.</p>
          </div>

          {groupedProducts.map((group, index) => (
            <div key={group.type} className="mb-12 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {index > 0 && <Separator className="my-8" />}
              
              <div className="flex items-center mb-6">
                {group.type === 'Travel Insurance' && <Shield className="w-6 h-6 mr-2 text-hotel-primary" />}
                {group.type === 'Activity' && <Calendar className="w-6 h-6 mr-2 text-hotel-primary" />}
                {group.type === 'Transfer' && <MapPin className="w-6 h-6 mr-2 text-hotel-primary" />}
                <h2 className="font-serif text-2xl md:text-3xl text-hotel-text">
                  {group.type === 'Activity' ? 'Events & Activities' : group.type}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.products.map((product) => (
                  <div 
                    key={product.product_id || product.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img 
                        src={product.custom_fields?.image_url || product.images} 
                        alt={product.custom_fields?.name || product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 bg-hotel-primary text-white py-1 px-3">
                        <span className="font-bold">{currency} {product.custom_fields?.price || product.price}</span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-serif font-medium mb-2 text-hotel-text line-clamp-1">
                        {product.custom_fields?.name || product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.custom_fields?.description || product.description}
                      </p>
                      
                      {group.type === 'Travel Insurance' && (
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 text-hotel-primary mt-1 flex-shrink-0" />
                            <div className="ml-2">
                              <span className="text-sm font-medium">Areas Covered:</span>
                              <p className="text-xs text-gray-600">{product.custom_fields.region}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <AlertTriangle className="w-4 h-4 text-hotel-primary mt-1 flex-shrink-0" />
                            <div className="ml-2">
                              <span className="text-sm font-medium">Exclusions:</span>
                              <p className="text-xs text-gray-600 line-clamp-2">{product.custom_fields.exclusions}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        {group.type === 'Activity' && (
                          <div className="max-w-[140px]">
                            <DateSelector
                              availableDates={dateOptions}
                              selectedDate={selectedDates[product.id]}
                              onDateSelect={(e) => handleDateSelect(product.id, e)}
                            />
                          </div>
                        )}
                        
                        <div className={`ml-auto ${group.type === 'Activity' ? '' : 'w-full'}`}>
                          <AddToCart
                            payload={{
                              customItems: [
                                {
                                  sku: product?.id,
                                  name: product?.name || product?.custom_fields?.name,
                                  quantity: 1,
                                  list_price: product?.price || product?.custom_fields?.price,
                                  date: selectedDates[product.id],
                                  entity_name: 'ancillary',
                                },
                              ],
                              bookingChannelId: userDeviceType,
                            }}
                            buttonText="Add to Cart"
                            buttonStyle={{ color: 'white' }}
                            containerStyle={{
                              backgroundColor: '#8B0000',
                              width: group.type === 'Activity' ? '120px' : '100%',
                              textAlign: 'center',
                              padding: '10px',
                              borderRadius: '4px',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '500',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-10 mb-8">
            <Link href={`/${lang}/login?service=${service}`}>
              <button className="bg-hotel-primary hover:bg-hotel-primary/90 text-white px-8 py-3 rounded-sm font-medium transition-colors">
                Continue to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

AddOn.displayName = 'AddOn';

export default AddOn;
