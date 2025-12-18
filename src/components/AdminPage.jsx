import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const productData = {
            name,
            price: parseInt(price),
            image
        };

        try {
            const response = await axios.post('http://localhost:3000/products', productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            toast.success('Product added successfully!');
            setName('');
            setPrice('');
            setImage('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
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
                            placeholder="Enter product name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Price</label>
                        <input 
                            type="number" 
                            placeholder="Enter price" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                        <input 
                            type="text" 
                            placeholder="Enter image URL" 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg mt-6"
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
