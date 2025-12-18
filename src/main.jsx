// import { Route } from 'react-router-dom'
import { StrictMode } from 'react'  
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Route,Routes} from 'react-router'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import HomeLayout from './layout/HomeLayout.jsx'
import LoginForm from './components/LoginForm.jsx'
import ProductList from './components/ProductsList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminPage from './components/AdminPage.jsx'
import Cart from './components/Cart.jsx'
import Orders from './components/Orders.jsx'
import { ToastContainer } from 'react-toastify'
import { GlobalProvider } from './contexts/GlobalContext.jsx'


    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 43499,
            image: "/images/9a.jpg"
        },

        {

            id: 2,
            name: "Product 2",
            price: 4999,
            image:"/images/headset.jpg"
        },
        {

            id: 3,
            name: "Product 3",
            price: 2100,
            image: "/images/power bank.jpg"
        },

    ]

createRoot(document.getElementById('root')).render(
    <GlobalProvider>
        <ToastContainer/>  
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginForm/>}/>
                <Route element={<HomeLayout/>}>
                    
                    <Route path='/' element={<App/>}/>
                    <Route path="/products">
                        <Route index element={<ProductList products={products}/>}/>
                        <Route path=':id' element={<ProductDetails/>}/>
                        <Route path='details' element={<ProductList/>}/>
                    </Route>
                    <Route path='/About' element={<About/>}/>
                    <Route path='/Contact' element={<Contact/>}/>
                    <Route path='/Cart' element={<Cart/>}/>
                    <Route path='/Orders' element={<Orders/>}/>
                <Route path='/adminPage' element={<ProtectedRoute> <AdminPage/></ProtectedRoute>}/>
                </Route>

                
            </Routes>
        </BrowserRouter>
    </GlobalProvider>

)
