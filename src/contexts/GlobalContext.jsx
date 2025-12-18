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
            const response = await axios.get('http://localhost:3000/cart', {
                headers: { 'user-id': 'guest' }
            });
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };
    
    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:3000/cart', product, {
                headers: { 'user-id': 'guest' }
            });
            setCartItems(response.data.items);
            toast.success('Product added to cart successfully!');
        } catch (error) {
            toast.error('Failed to add product to cart');
            console.error('Error adding to cart:', error);
        }
    };
    
    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) return;
        try {
            const response = await axios.put('http://localhost:3000/cart', 
                { id, quantity },
                { headers: { 'user-id': 'guest' } }
            );
            setCartItems(response.data.items);
        } catch (error) {
            toast.error('Failed to update cart');
            console.error('Error updating cart:', error);
        }
    };
    
    const removeFromCart = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/cart/${id}`, {
                headers: { 'user-id': 'guest' }
            });
            setCartItems(response.data.items);
            toast.success('Product removed from cart!');
        } catch (error) {
            toast.error('Failed to remove product from cart');
            console.error('Error removing from cart:', error);
        }
    };
    
    const placeOrder = (customerDetails) => {
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
        setCartItems([]);
        toast.success('Order placed successfully!');
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