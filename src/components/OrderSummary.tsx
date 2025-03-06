import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid, TextField } from '@mui/material';
import '../pages/AddOn.css';
import { Card, deleteCartCookie, getCartData, getCartId } from './_actions/cartdata';
import { useAuthJHipster } from '~/context/JHipsterContext';
import { useCustomLocale } from '~/context/LocaleProvider';
import { useRouter } from 'next/navigation';
import { handleCartExpiryItems } from '~/services/handleTimerExpiredItems';

interface CartItem {
  id?: string;
  name: string;
  quantity: number;
  list_price: string;
  images?: string[];
  type: 'lineItem' | 'customItem';
}

const OrderSummary = ({ setCartId }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const { jHipsterAuthToken }: any = useAuthJHipster();

  const { locale: { lang } } = useCustomLocale();
  const router = useRouter();


  function pluralize(entityName: String) {
    if (entityName.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(entityName[entityName.length - 2])) {
      return entityName.slice(0, -1) + 'ies';
    }

    return entityName + 's';
  }

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await Card();
        console.log('data in here is following', data);
        if (data) {
          console.log('data in here is following', data?.bigCartId);
          setCartId(data?.bigCartId ?? null);
        }

        const lineItemsWithImages = data.lineItems.map(item => ({
          ...item,
          type: 'lineItem',
        }));

        const customItemsFormatted = data.customItems.map(item => ({
          ...item,
          type: 'customItem'
        }));

        const unifiedItems = [...lineItemsWithImages, ...customItemsFormatted];

        setItems(unifiedItems);
      } catch (err) {
        console.error('Error fetching cart data:', err);
        setError('Failed to fetch cart data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);


  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  if (error) {
    return <Typography color="error" className="container py-8">{error}</Typography>;
  }

  if (!items) {
    return <Typography className="container py-8">No cart data available.</Typography>;
  }

  let priceTotal = 0;

  for (let i = 0; i < items.length; i++) {
    priceTotal += parseInt(items[i]?.list_price) || 0
  }

  console.log('show me the items', items);

  function getAddonImage(addonName: String) {
    return fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL_SPRING}/api/ancillaries`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jHipsterAuthToken}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch ancillary image');
        }
        return response.json();
      })
      .then(data => {
        const filteredData = data.filter(item => item.name === addonName);
        return filteredData?.[0];
      })
      .catch(error => {
        console.error('Error fetching ancillary data:', error);
        return null;
      });
  }


  async function handleChangeOrder() {
    await handleCartExpiryItems();
    router.push(`/${lang}/home`)
  }

  return (
    <Box className="container animate-fade-in">
      <Typography variant="h4" gutterBottom className="title">
        Complete booking - only takes a few minutes!
      </Typography>
      <h6 className="subtitle">
        Your booking details
      </h6>

      <Divider sx={{ my: 2, width: '100%' }} />

      {items.map((item) => {
        let imageUrl = '';
        if (item?.entity_name == 'room') {
          imageUrl = item?.roomImages ? item?.roomImages.split(', ')[0] : '';
        } else if (item?.entity_name == "Schedule") {
          imageUrl = "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg";
        }

        return (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 4, md: 6 }} 
            alignItems="center" 
            key={item.entityId}
            className="card-hover"
          >
            <Grid 
              item 
              xs={12} sm={6} md={4} lg={3} 
              sx={{ mt: { xs: 2, sm: 2, md: 2 } }}
            >
              {item?.entity_name === 'room' && (
                <Box sx={{ maxWidth: { xs: '100%', sm: '400px' } }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'sans-serif', 
                      fontSize: { xs: '14px', sm: '16px' },
                      fontWeight: 'bold' 
                    }}
                  >
                    Hotel Name: <span style={{ fontWeight: 'normal' }}>{item?.hotelName}</span>
                  </Typography>
                  <Divider sx={{ my: 1, width: '100%' }} />
                </Box>
              )}

              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}
              >
                <img 
                  src={imageUrl} 
                  alt={item?.name} 
                  className="image" 
                />
              </Box>
            </Grid>
            
            <Grid 
              item 
              xs={12} sm={6} md={8} lg={9}
              sx={{ 
                mt: { xs: 0, sm: 0, md: 2 },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              <Typography 
                variant="body2" 
                className="item-quantity"
                sx={{ 
                  fontFamily: 'sans-serif', 
                  fontSize: { xs: '14px', sm: '16px' }
                }}
              >
                {item?.quantity} x <span style={{ fontWeight: 'bold' }}>{item?.name}</span>
              </Typography>
              
              <Box 
                className="total-box" 
                sx={{
                  display: 'flex', 
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  alignItems: 'center', 
                  mt: 1,
                  fontFamily: 'sans-serif', 
                  fontSize: { xs: '14px', sm: '16px' },
                  p: 1
                }}
              >
                <Typography>
                  £ <span style={{ fontWeight: 'bold' }}>{item?.list_price}</span>
                </Typography>
              </Box>
            </Grid>

            <Divider sx={{ my: 2, width: '100%' }} />
          </Grid>
        );
      })}

      <Box 
        className="total-box" 
        sx={{
          display: 'flex', 
          justifyContent: { xs: 'center', sm: 'flex-start' },
          alignItems: 'center',
          fontWeight: 'bold', 
          fontFamily: 'sans-serif', 
          fontSize: { xs: '16px', sm: '18px' }, 
          mt: 2,
          mb: 2,
          p: 2
        }}
      >
        <Typography variant="h6">Order Total: £ {priceTotal}</Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: { xs: 'center', sm: 'flex-start' },
          mt: 2
        }}
      >
        <button 
          onClick={handleChangeOrder} 
          className="custom-button"
          sx={{ 
            fontSize: { xs: '14px', sm: '16px' }
          }}
        >
          Change Order
        </button>
      </Box>
    </Box>
  );
};

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;
