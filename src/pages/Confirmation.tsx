
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Clock, Phone } from 'lucide-react';
import '../components/checkout/orderConfirmation.css';

const Confirmation = () => {
  const [orderData, setOrderData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  
  // Mock URL parameters for development demo - in a real app, use useSearchParams from your router
  const orderId = new URLSearchParams(window.location.search).get('orderId') || 'BTA-123456';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo purposes, if we're in the Lovable AI environment, use mock data
        if (!orderId || window.location.hostname.includes('lovable.ai')) {
          // Mock data for demonstration
          const mockData = {
            orderId: 'BTA-123456',
            items: [
              {
                entityId: '1',
                name: 'Deluxe King Room',
                entity_name: 'room',
                hotelName: 'Bingham Riverhouse',
                list_price: '173.00',
                roomImages: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              },
              {
                entityId: '2',
                name: 'Airport Transfer',
                entity_name: 'service',
                hotelName: '',
                list_price: '45.00',
                roomImages: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
            ],
            order_amount: '218.00',
          };
          setOrderData(mockData);
          setLoading(false);
          return;
        }

        // Actual API call for production
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL_COMMERCIAL}/api/order/get?orderId=${orderId}`);

        if (!response.ok) {
          console.error('Failed to fetch order data');
          setLoading(false);
          return;
        }

        const data = await response.json();

        const combinedItems = [
          ...data.lineItems.map((item: any) => ({ ...item, type: 'lineItem' })),
          ...data.customItems.map((item: any) => ({ ...item, type: 'customItem' }))
        ];

        let transformData = {
          orderId: data.orderId,
          items: combinedItems,
          order_total: data.order_amount,
        };

        setOrderData(transformData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center">
          <Clock className="animate-spin h-8 w-8 text-hotel-primary mb-4" />
          <span className="text-lg">Loading your confirmation...</span>
        </div>
      </div>
    );
  }

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-2">No booking data available</h2>
          <p className="text-gray-600">Please check your booking reference and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-hotel-green" />
          </div>
        </div>
        <h1 className="confirmation-title">Booking Confirmed</h1>
        <p className="confirmation-subtitle">
          Thank you for booking with Big Travel Agency. Your travel details are confirmed, and a
          confirmation email has been sent to you.
        </p>
      </div>

      <div className="confirmation-reference">
        Your booking reference is{' '}
        <span className="reference-id">{orderData.orderId || 'N/A'}</span>
      </div>

      <div className="confirmation-section">
        <div className="confirmation-items">
          {orderData.items.map((item: any) => {
            let imageUrl = item?.roomImages?.split(', ')[0] || 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
            
            return (
              <div key={item.entityId} className="item-container">
                <div className="item-image-container">
                  <img 
                    src={imageUrl} 
                    alt={item.name} 
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <div>
                    <h3 className="item-name">{item.name}</h3>
                    {item.entity_name === 'room' && (
                      <p className="item-hotel">{item.hotelName} Hotel</p>
                    )}
                  </div>
                  <div className="item-price">
                    £{item.list_price}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="confirmation-footer">
            <div className="total-price">
              Total Price: £{orderData.order_total}
            </div>
            <Button 
              variant="hotel" 
              className="manage-booking-btn"
            >
              Manage Booking
            </Button>
          </div>
        </div>

        <div className="confirmation-image-container">
          <img 
            src="/placeholder.svg" 
            alt="Confirmation" 
            className="confirmation-image"
          />
        </div>
      </div>

      <div className="support-section">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Phone className="w-4 h-4" />
          <span className="font-medium">Need help with your booking?</span>
        </div>
        <p>Contact our support team at 1-800-HOTEL-HELP for assistance with changes or special requests.</p>
      </div>
    </div>
  );
};

Confirmation.displayName = 'Confirmation';

export default Confirmation;
