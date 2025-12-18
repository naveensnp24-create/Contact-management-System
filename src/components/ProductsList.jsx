import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import OrderSummary from "./OrderSummary";
import axios from "axios"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        console.log('API Response:', res.data);
        console.log('Products count:', res.data.length);
        setProducts(res.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center p-8">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  if (products.length === 0) return (
    <div className="text-white text-center p-8">
      <p>No products found in database</p>
      <p>Try adding some products first using the Add Products page</p>
    </div>
  );

  return (
    <div className="flex-col flex pb-100 bg-black">
      <div className="max-w-7xl mx-auto mt-4 mb-4 gap-3 bg-black grid grid-cols-4 px-4">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col gap-2">
            <ProductCard  id={product._id} name={product.name} price={product.price} image={product.image} />
            {/* <OrderSummary key={product._id} product={product} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
