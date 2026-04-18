import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, MapPin, Package } from 'lucide-react';
import { orderService } from '../services/orderService';
import { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const orderData = await orderService.getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-40 text-center">
        <div className="animate-spin h-12 w-12 border-4 border-accent-gold border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-accent-gold/10 rounded-full mb-10 border border-accent-gold/20">
        <CheckCircle2 className="h-12 w-12 text-accent-gold" />
      </div>
      <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">
        {order?.paymentMethod === 'COD' ? 'Order Placed Successfully!' : 'Payment Successful!'}
      </h1>
      <p className="text-lg text-white/40 mb-12 max-w-lg mx-auto font-medium">
        Thank you for your order. We've sent a confirmation email to your inbox with all the details.
      </p>

      <div className="bg-[#111111] p-10 rounded-sm border border-white/5 shadow-2xl mb-12 text-left max-w-2xl w-full">
        <div className="flex justify-between items-center pb-8 border-b border-white/5 mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Order ID</p>
            <p className="font-sans text-lg text-white break-all uppercase font-medium tracking-wider">{order?._id || 'PENDING'}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1 text-right">Estimated Delivery</p>
            <p className="font-black text-xl text-accent-gold text-right">3-5 Days</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/5 rounded-full border border-white/5">
              <MapPin className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">Shipping Address</h4>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                {order?.shippingAddress ? (
                  typeof order.shippingAddress === 'string'
                    ? order.shippingAddress
                    : `${order.shippingAddress.fullName}\n${order.shippingAddress.streetAddress}\n${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`
                ) : 'Loading...'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/5 rounded-full border border-white/5">
              <Package className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">Shipping Method</h4>
              <p className="text-sm text-white/60 font-medium">
                Standard Shipping<br />
                <span className="text-[10px] uppercase tracking-widest text-white/20">Secure Delivery</span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 justify-center">
        <Link
          to="/products"
          className="bg-black text-white px-12 py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center space-x-4 hover:bg-accent-gold hover:text-primary transition-all shadow-2xl active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          to="/profile"
          className="bg-white border border-black/10 text-black px-12 py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center space-x-4 hover:bg-black hover:text-white transition-all active:scale-[0.98]"
        >
          <span>Track Order</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
