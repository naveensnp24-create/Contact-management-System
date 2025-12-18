import { useContext, useState } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, showCheckout, setShowCheckout, placeOrder } = useContext(GlobalContext);
  const [customerDetails, setCustomerDetails] = useState({name: '', email: '', phone: '', address: ''});
  
  const handleInputChange = (e) => {
    setCustomerDetails({...customerDetails, [e.target.name]: e.target.value});
  };
  
  const handlePayment = (e) => {
    e.preventDefault();
    placeOrder(customerDetails);
    setShowCheckout(false);
    setCustomerDetails({name: '', email: '', phone: '', address: ''});
  };
  
  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : parseFloat(item.price) || 0;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-6 text-white">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="bg-slate-900 rounded-lg shadow-lg p-6 border border-slate-700">
            <div className="border-b border-slate-700 pb-4 mb-4">
              <h3 className="font-semibold text-xl text-white">Order Summary</h3>
            </div>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.productId || item.id} className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                    <p className="text-slate-400 text-sm">${typeof item.price === 'string' ? item.price.replace(/[^0-9.-]+/g, '') : item.price} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.productId || item.id, item.quantity - 1)} className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-600">-</button>
                      <span className="px-3 font-medium text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId || item.id, item.quantity + 1)} className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-600">+</button>
                      <button onClick={() => removeFromCart(item.productId || item.id)} className="bg-red-600 text-white px-4 py-1 rounded ml-4 hover:bg-red-700">Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-white">${((typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : parseFloat(item.price) || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-white">Total Amount:</span>
                <span className="text-3xl font-bold text-green-400">${total.toFixed(2)}</span>
              </div>
              <button onClick={() => setShowCheckout(true)} className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                Proceed to Pay
              </button>
            </div>
          </div>
            
            {showCheckout && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-t-2xl border-b border-slate-600">
                    <h3 className="text-2xl font-bold text-center">Checkout</h3>
                    <p className="text-center text-slate-300 mt-1">Complete your order</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Total Amount:</span>
                        <span className="text-2xl font-bold text-green-400">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input type="text" name="name" value={customerDetails.name} onChange={handleInputChange} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent" required />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input type="email" name="email" value={customerDetails.email} onChange={handleInputChange} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent" required />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                        <input type="tel" name="phone" value={customerDetails.phone} onChange={handleInputChange} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent" required />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Delivery Address</label>
                        <textarea name="address" rows="3" value={customerDetails.address} onChange={handleInputChange} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none" required></textarea>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setShowCheckout(false)} className="flex-1 bg-slate-700 text-slate-200 py-3 px-4 rounded-lg font-medium hover:bg-slate-600 transition-colors">
                          Cancel
                        </button>
                        <button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                          Place Order
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
      </div>
    </div>
  );
};

export default Cart;
