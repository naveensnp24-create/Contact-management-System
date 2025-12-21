import {createContext,useState,useEffect} from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

const GlobalContext=createContext();

export const GlobalProvider=(props)=>{
    const{children}=props;
    const[currentPage,setCurrentPage]=useState(1);
    const[cartItems,setCartItems]=useState([]);
    const[showCheckout,setShowCheckout]=useState(false);
    const[orders,setOrders]=useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);
    
    // Load cart from MongoDB on component mount
    useEffect(() => {
        loadCart();
    }, []);
    
    const loadCart = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            
            if (!token) {
                console.log('No token found, skipping cart load');
                return;
            }
            
            const response = await axios.get(`${apiUrl}/cart`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Transform the cart data to match frontend expectations
            const cartProducts = response.data.cart?.products || [];
            const transformedItems = cartProducts.map(item => ({
                id: item.product._id,
                productId: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity
            }));
            
            setCartItems(transformedItems);
        } catch (error) {
            console.error('Error loading cart:', error);
            if (error.response?.status === 401) {
                sessionStorage.removeItem('token');
                setCartItems([]);
            }
        }
    };
    
    const addToCart = async (product) => {
        try {
            const token = sessionStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            
            console.log('Adding to cart - Product:', product);
            console.log('API URL:', apiUrl);
            console.log('Token exists:', !!token);
            
            if (!token) {
                toast.error('Please login to add items to cart');
                return;
            }
            
            const requestData = {
                productId: product.id || product._id,
                quantity: 1
            };
            
            console.log('Request data:', requestData);
            
            const response = await axios.post(`${apiUrl}/cart`, requestData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Add to cart response:', response.data);
            await loadCart(); // Reload cart after adding
            toast.success('Product added to cart successfully!');
        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            toast.error('Failed to add product to cart');
            console.error('Error adding to cart:', error);
        }
    };
    
    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) return;
        try {
            const token = sessionStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            
            const response = await axios.put(`${apiUrl}/cart`, 
                { id, quantity },
                { 
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            await loadCart();
        } catch (error) {
            toast.error('Failed to update cart');
            console.error('Error updating cart:', error);
        }
    };
    
    const removeFromCart = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            
            const response = await axios.delete(`${apiUrl}/cart/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            await loadCart();
            toast.success('Product removed from cart!');
        } catch (error) {
            toast.error('Failed to remove product from cart');
            console.error('Error removing from cart:', error);
        }
    };
    
    const placeOrder = async (customerDetails) => {
        try {
            const order = {
                id: Date.now(),
                items: cartItems,
                customerDetails,
                total: cartItems.reduce((sum, item) => {
                    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : parseFloat(item.price) || 0;
                    return sum + (price * item.quantity);
                }, 0),
                date: new Date().toISOString()
            };
            
            setOrders(prev => [...prev, order]);
            
            // Clear cart from database
            const token = sessionStorage.getItem('token');
            if (token) {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                // Remove all items from cart
                for (const item of cartItems) {
                    await axios.delete(`${apiUrl}/cart/${item.productId || item.id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                }
            }
            
            setCartItems([]);
            toast.success('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
        }
    };
    
    const cancelOrder = (orderId) => {
        setOrders(prev => prev.filter(order => order.id !== orderId));
        toast.success('Order cancelled successfully!');
    };
    
    return (
        <GlobalContext.Provider value={{currentPage,setCurrentPage,cartItems,addToCart,updateQuantity,removeFromCart,showCheckout,setShowCheckout,orders,placeOrder,cancelOrder}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContext;