import { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const Orders = () => {
  const { orders, cancelOrder } = useContext(GlobalContext);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="font-bold text-3xl mb-6 text-white">My Orders</h2>
        
        {orders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 border">
              <div className="flex justify-between items-start mb-4">
              <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                </div>
                <div className="text-right flex flex-col gap-2">
                  <p className="text-2xl font-bold text-green-600">${order.total.toFixed(2)}</p>
                  <button onClick={() => cancelOrder(order.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Cancel Order</button>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-4">
                <h4 className="font-semibold mb-2">Customer Details:</h4>
                <p className="text-sm text-gray-700">Name: {order.customerDetails.name}</p>
                <p className="text-sm text-gray-700">Email: {order.customerDetails.email}</p>
                <p className="text-sm text-gray-700">Phone: {order.customerDetails.phone}</p>
                <p className="text-sm text-gray-700">Address: {order.customerDetails.address}</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${typeof item.price === 'string' ? item.price.replace(/[^0-9.-]+/g, '') : item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
