import { Link } from 'react-router';
import { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import Counter from './Counter';
import OrderSummary from './OrderSummary';


const ProductCard=(props)=>{

    const{name,price,image,id}=props;
    const {addToCart} = useContext(GlobalContext);
    
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({id, name, price, image});
    };

    return(
        <div className="rounded-lg p-4 shadow-xl bg-white w-full h-[480px] flex flex-col">
            <Link to={`/products/${id}`} className="flex-1 flex flex-col">
                <img src={image} alt={name} className="w-full h-[320px] object-contain rounded-lg"/>
                <h2 className="text-lg font-bold mt-2">{name}</h2>
                <p className="text-md text-gray-600">{price}</p>
            </Link>
            <button onClick={handleAddToCart} className="rounded-lg bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-600 w-full">Add To Cart</button>
            {/* <Counter/> */}
        </div>
    )
}

export default ProductCard;