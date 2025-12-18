// import React, {useContext} from 'react'
// import StudentCard from './components/StudentCard';
// import Counter from './components/Counter';
// import UserDetails from './components/UserDetails';
// import LoginForm from './components/LoginForm';
// import Pagination from './components/Pagination';
// import Footer from './components/Footer';
// import ProductsList from './components/ProductsList';
// import EcommerceFooter from './components/EcommerceFooter';


// import Header  from './components/Header';  
// import {GlobalProvider} from "./contexts/GlobalContext";

// const App = () => {

//   let firstName = "Jhon";
//   let lastName = "Smith";

//   return (    <>
    
      
//       {/* <Header/> */}
//       <StudentCard fname={firstName} lname={lastName} age={20} />
//       <Counter />
    
//       <GlobalProvider>
//         <UserDetails />
//         <Footer />
//         <ProductsList />

//         <LoginForm/>
//       </GlobalProvider>
//     </>
//   )
// };
// export default App;









// import AddProducts from './components/AddProducts';

// const App=()=>{
//   return (
//     <>
//     <Header/>
//      <ProductsList />
//      <AddProducts/>
//      <EcommerceFooter/>

//     </>
//   )
// };
// export default App;
// //  import Ecommerce from './components/Ecommerce';
// import AddProducts from './components/AddProducts';
// import OrderSummary from './components/OrderSummary';

// const App=()=>{
//   return (
//     <>
//     <Ecommerce/>
//      <ProductsList />
//      <AddProducts/>
     
//      <EcommerceFooter/>

//     </>
//   )
// };
// export default App;





import ProductList from './components/ProductsList';
import EcommerceFooter from './components/EcommerceFooter';


const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <ProductList/>
      <EcommerceFooter/>
    </div>
  );
};
export default App;





























{/* <h1 className="text-4xl mb-2"> Student Details</h1> */}
      {/* <div className="text-lg" >
    First Name: {firstName} <br/>
    Last Name: {lastName}<br/>
    Full Name: {firstName} {lastName}
    
    
  </div> */}
      {/* {StudentCard({ fname: "Tony", lname: "Stark", age: 30 })} */}