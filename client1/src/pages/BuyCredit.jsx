import React, { useContext, useState, useEffect } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";

function BuyCredit() {
  const { user, credit, setCredit } = useContext(AppContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  useEffect(() => {
    const storedCredit = localStorage.getItem('credit');
    if (storedCredit) {
      setCredit(parseInt(storedCredit, 10));
    }
  }, []);

  const handlePurchaseClick = (plan) => {
    if (user) {
      setSelectedPlan(plan);
      setShowPayment(true);
    } else {
      alert('Please login to purchase credits.');
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please enter valid card details.');
      return;
    }
    let newCredits = credit + selectedPlan.credits;
    setCredit(newCredits);
    localStorage.setItem('credit', newCredits);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
    setShowPayment(false);
  };

  const handlePromoCodeApply = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10);
      alert('Promo code applied! $10 discount added.');
    } else {
      setDiscount(0);
      alert('Invalid promo code.');
    }
  };

  const handleCardInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    } else if (name === "expiry") {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    } else if (name === "cvv") {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const totalAmount = selectedPlan ? selectedPlan.price - discount : 0;

  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10 relative'
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>
      
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index} className='bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>${item.price}</span> / {item.credits} credits</p>
            <button 
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer'
              onClick={() => handlePurchaseClick(item)}
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      {showPayment && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg"
          >
            <h2 className="text-2xl font-medium mb-6 text-center">Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
              {paymentMethod === 'card' && (
                <>
                  <label className="block mb-2">Card Number</label>
                  <input type="text" name="number" className="w-full px-4 py-2 border rounded-lg mb-4" placeholder="1234 5678 9012 3456" value={cardDetails.number} onChange={handleCardInputChange} required />
                  <label className="block mb-2">Expiration Date</label>
                  <input type="text" name="expiry" className="w-full px-4 py-2 border rounded-lg mb-4" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleCardInputChange} required />
                  <label className="block mb-2">CVV</label>
                  <input type="text" name="cvv" className="w-full px-4 py-2 border rounded-lg mb-4" placeholder="123" value={cardDetails.cvv} onChange={handleCardInputChange} required />
                </>
              )}
              <p className="text-lg font-medium">Total: ${totalAmount}</p>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="px-6 py-2 border rounded-lg hover:bg-gray-100" onClick={() => setShowPayment(false)}>Cancel</button>
                <button type="submit" className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Pay Now</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default BuyCredit;
