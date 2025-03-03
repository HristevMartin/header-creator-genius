
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePaymentForm = ({ setPaymentMethodId, setBankDetails }: any) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Payment service is currently unavailable. Please try again later.');
            return;
        }

        setIsLoading(true);
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            setBankDetails({
                exp_month: paymentMethod?.card?.exp_month,
                exp_year: paymentMethod?.card?.exp_year,
                last4: paymentMethod?.card?.last4
            });
            console.log('show me the payment method', paymentMethod);
            setPaymentMethodId(paymentMethod.id);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                fontFamily: 'Inter, sans-serif',
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <p className="form-label mb-2">Card Details</p>
                <div className="card-element-container">
                    <CardElement options={cardElementOptions} />
                </div>
                {error && <p className="form-error mt-2">{error}</p>}
            </div>
            
            <button 
                type="submit" 
                className="form-submit" 
                disabled={!stripe || isLoading}
            >
                {isLoading ? 'Processing...' : 'Complete Payment'}
            </button>
        </form>
    );
};

export default StripePaymentForm;
