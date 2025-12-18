import { useParams } from "react-router"
import OrderSummary from "./OrderSummary"

const ProductDetails=()=>{
    const {id}=useParams()
    return(
        <>
        <div>Product Details {id}</div> 
        {/* <OrderSummary/> */}
        </>
    )
}
export default ProductDetails;