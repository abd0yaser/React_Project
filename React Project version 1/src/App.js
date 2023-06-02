
import "./App.css";
import { MyNav } from "./components/MyNav";

// 
import { Route, Routes, useLocation } from "react-router-dom";


// 

import { Home } from "./components/Home";
// Admin Dashboard
import { Products } from "./components/Products";
import { ProductDetails } from "./components/ProductDetails";
import { ProductForm } from "./components/ProductForm";
// Admin Dashboard
import { Storeproducts } from "./components/Storeproducts";

import { NotFound } from "./components/NotFound";



import { AdminLogin } from './components/AbanopAsaad/Login/AdminLogin';
import { UserLogin } from './components/AbanopAsaad/Login/UserLogin';
import { MainLogin } from './components/AbanopAsaad/Login/MainLogin';

function App() {
	const location = useLocation();

	return (
		<div className="total">
			<MyNav />
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='home' element={<Home />} />



				<Route path='login' element={<MainLogin />} />
				<Route path='register' element={<MyRegister />} />
				<Route path='admin-login' element={<AdminLogin />} />
				<Route path='user-login' element={<UserLogin />} />

				<Route path='store-products' element={<Storeproducts />} />

				<Route path='admin-dashboard' element={<Products />} />

				{/* SHOW */}
				<Route path='products/:id' element={<ProductDetails />} />
				{/* Product Form for delete or update */}
				{/* 0 >> Add */}
				{/* id >> Edit */}
				<Route path='products/:id/add' element={<ProductForm />} />
				<Route path='products/:id/edit' element={<ProductForm />} />
				<Route path='Item' element={<Item />} />




				<Route path='store-products' element={<Storeproducts />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
			{/* Hide footer if the page is Login or Register */}
			{location.pathname !== "/login" && location.pathname !== "/user-login" && location.pathname !== "/admin-login" && location.pathname !== "/register" && location.pathname !== "/admin-dashboard" && <MyFooter />}
			{/* <MyFooter /> */}
		</div>
	);
}

export default App;
