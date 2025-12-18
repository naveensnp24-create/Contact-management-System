import ProductList from "./ProductsList";

const OrderSummary = ({ product }) => {
  const {
    name,
    price,
    image,
    rating = 5,
    reviews = 125,
    quantity = 1,
  } = product;

  const total = price * quantity;

  return (
    <div className="w-full mt-10 p-6 bg-white ml-10 pr-50 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>

      <div className="flex flex-col sm:flex-row sm:items-center items-start sm:space-x-4 space-y-4 sm:space-y-0">
        <img src={image} alt={name} className="w-24 h-24 object-cover rounded" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
          <p className="text-sm text-gray-500">
            Rating: ⭐ {rating} ({reviews} reviews)
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-green-600 font-bold">Rs. {price}</p>
            <p className="line-through text-gray-400 text-sm">Rs. {price}</p>
          </div>
          <p className="text-sm text-gray-600 mt-1">Quantity: {quantity}</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-medium text-gray-700">
        <p>Total</p>
        <p>Rs. {total}</p>
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
