import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddProducts = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            const { data } = await axios.post('http://localhost:3000/products', product, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Product added successfully!');
            setProduct({ name: '', price: '', image: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-slate-900 shadow-2xl rounded-2xl p-8 border border-slate-700">
                <h1 className="text-center text-3xl font-bold text-white mb-6">Add Product</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Product Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter product name" 
                            value={product.name} 
                            onChange={handleInputChange}
                            className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Price</label>
                        <input 
                            type="number" 
                            name="price" 
                            placeholder="Enter price" 
                            value={product.price} 
                            onChange={handleInputChange}
                            className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                        <input 
                            type="url" 
                            name="image" 
                            placeholder="Enter image URL" 
                            value={product.image} 
                            onChange={handleInputChange}
                            className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg mt-6"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;