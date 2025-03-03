'use client';

import React, { useState, useEffect } from 'react';
import { shipping } from './_actions/shipping';
import { payInfo } from './_actions/info';
import OrderSummary from '~/components/makeswift/commonMakeSwiftComponents/order-summary/page';
import { useRouter } from 'next/navigation';
import StripePaymentForm from '../stripePayment/StripePayment';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '~/lib/stripe-client';
import { getCartId } from './_actions/cartid';
import { deleteCartId } from './_actions/deleteCartId';
import { useCustomLocale } from '~/context/LocaleProvider';
import { useSearchParams } from "next/navigation";
import { handleCartExpiryItems } from '~/services/handleTimerExpiredItems';
import { useTimer } from '~/context/TimerContext';
import { Separator } from "@/components/ui/separator";
import '../components/checkout/payment.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    countryCode: '',
    phoneNumber: '',
    email: '',
    number: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    verificationValue: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [version, setVersion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessTokenId, setAccessTokenId] = useState<string | null>(null);
  const [orderIds, setOrderIds] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>('');
  const [bankDetails, setBankDetails] = useState({});
  const [mongoCartId, setMongoCartId] = useState<string>('');
  const [cityError, setCityError] = useState('');

  const { stopTimer, handleTimerExpiry } = useTimer();

  const searchParams = useSearchParams();
  const router = useRouter();

  let newSearchParam = searchParams.get("package");

  const { locale: { lang } } = useCustomLocale();

  useEffect(() => {
    const getCartIdRequest = async () => {
      let mongoCartId = await getCartId();
      setMongoCartId(mongoCartId);
    }
    getCartIdRequest();
  }, []);

  const validateCity = (value: any) => {
    const cityRegex = /^[A-Za-z\s\-']+$/;

    if (!value) {
      setCityError('City is required');
      return false;
    } else if (value.length < 2) {
      setCityError('City name must be at least 2 characters');
      return false;
    } else if (value.length > 50) {
      setCityError('City name must be less than 50 characters');
      return false;
    } else if (!cityRegex.test(value)) {
      setCityError('City should contain only letters, spaces, hyphens or apostrophes');
      return false;
    }

    setCityError('');
    return true;
  };

  async function deleteCard() {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL_COMMERCIAL}/api/cart/deletecart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartId: mongoCartId }),
    });

    if (!resp.ok) {
      return
    }

  }

  function handleNewSearch() {
    handleCartExpiryItems();
    stopTimer();
    handleTimerExpiry('confirm-page');
  }

  async function createOrder() {
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL_COMMERCIAL}/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId: mongoCartId, bigOrderId: orderIds }),
      })

      console.log('show me the request', request);

      if (!request.ok) {
        return
      }

      let data = await request.json()
      console.log('show me the data', data);
      if (Object.keys(data).length > 0) {
        if (newSearchParam == 'true') {
          handleNewSearch();
        } else {
          deleteCartId();
          deleteCard();
        }
        console.log('redirecting to confirm order page');
        router.push(`/${lang}/confirmorder?orderId=${data.orderId}`);
      } else {
        console.log('there is not data vailable')
      }
    } catch (err) {
      console.error('Failed to create order.', err);
    }
  }

  useEffect(() => {
    if (paymentMethodId) {

      if (!accessTokenId) {
        setSubmissionStatus('Error: Access token is missing.');
        return;
      }

      const request = async () => {
        try {
          const result = await payInfo(paymentMethodId, accessTokenId);
          console.log('show me the result', result);
          if (result.status == "success") {
            setSubmissionStatus('Payment done successfully.');
            createOrder();
          }
        } catch (err) {
          console.error('Submission failed:', err);
          setSubmissionStatus('Error: Failed to post payment details.');
        }
      }
      request();
    }

  }, [paymentMethodId]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'city') {
      validateCity(value);
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    console.log('in here wee are', cartId)
    e.preventDefault();

    const isCityValid = validateCity(formData.city);

    if (!isCityValid) {
      return;
    }

    if (!cartId) {
      console.error('Cart ID is missing.', cartId);
      setError("Checkout service unavailable. Please try again later!");
      return;
    }

    if (!isSubmitted) {
      try {
        console.log('show me the cart id', cartId);
        const response = await shipping({ ...formData, version }, cartId);

        if (response.success) {
          setIsSubmitted(true);

          let orderId = response.orderId;
          setOrderIds(orderId);

          if (response.accessTokenId) {
            setAccessTokenId(response.accessTokenId);
          } else {
            setError('Failed to retrieve access token.');
          }
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to submit shipping information.');
      }
    }
  };

  return (
    <div className="checkout-container">
      <div className="order-summary-wrapper">
        <OrderSummary setCartId={setCartId} />
      </div>
      
      <h1 className="checkout-heading">Billing and Payment</h1>
      <Separator className="mb-6" />

      {loading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {error && <p className="payment-error mb-4">{error}</p>}
      
      <div className="card-container">
        <h2 className="checkout-subheading">Personal Information</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-field">
            <label htmlFor="address1" className="form-label">Address Line 1</label>
            <input
              id="address1"
              type="text"
              name="address1"
              placeholder="Enter your street address"
              value={formData.address1}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="address2" className="form-label">Address Line 2 (Optional)</label>
            <input
              id="address2"
              type="text"
              name="address2"
              placeholder="Apartment, suite, unit, etc."
              value={formData.address2}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="city" className="form-label">City</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                className={`form-input ${cityError ? 'error' : ''}`}
                required
              />
              {cityError && <p className="form-error">{cityError}</p>}
            </div>
            
            <div className="form-field">
              <label htmlFor="postalCode" className="form-label">Postal Code</label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                placeholder="Enter your postal code"
                value={formData.postalCode}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="countryCode" className="form-label">Country</label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Country</option>
                <option value="GB">United Kingdom</option>
              </select>
            </div>
            
            <div className="form-field">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-field">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          {!isSubmitted && (
            <button type="submit" className="form-submit">
              Continue to Payment
            </button>
          )}
        </form>
      </div>

      {isSubmitted && (
        <div className="card-container">
          {submissionStatus && (
            <p className={submissionStatus.includes('Error') ? 'payment-error mb-4' : 'payment-success mb-4'}>
              {submissionStatus}
            </p>
          )}
          
          <h2 className="checkout-subheading mb-4">Payment Information</h2>
          
          <Elements stripe={stripePromise}>
            <StripePaymentForm setPaymentMethodId={setPaymentMethodId} setBankDetails={setBankDetails} />
          </Elements>
        </div>
      )}
    </div>
  );
};

Payment.displayName = 'Payment';

export default Payment;
