
import "./App.css";
import { MyNav } from "./components/MyNav";

// 
import { Route, Routes, useLocation } from "react-router-dom";


// 


import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { ProductDetails } from "./components/ProductDetails";
import { ProductForm } from "./components/ProductForm";
import { NotFound } from "./components/NotFound";
import { MyFooter } from "./components/MyFooter";
import { MyRegister } from "./components/MyRegister";

import { Storeproducts } from "./components/Storeproducts";

import { AdminLogin } from './components/AbanopAsaad/Login/AdminLogin';
import { UserLogin } from './components/AbanopAsaad/Login/UserLogin';
import { MainLogin } from './components/AbanopAsaad/Login/MainLogin';
import { AccountSettings } from "./components/AbanopAsaad/Login/AccountSettings.jsx";

// ABDO ITEMS
import About from "./components/About";
import Store from "./components/Store";
import ShoppingCartProvider from "./context/ShoppingCartContext";


function App() {
	const location = useLocation();

	return (
		<div className="total">
			<ShoppingCartProvider>
			<MyNav />
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="/store" element={<Store />} />



				<Route path='login' element={<MainLogin />} />
				<Route path='register' element={<MyRegister />} />
				<Route path='admin-login' element={<AdminLogin />} />
				<Route path='user-login' element={<UserLogin />} />
				<Route path='account-settings' element={<AccountSettings />} />
				{/* <Route path='account-settings/:id/edit' element={<AccountSettings />} /> */}

				<Route path='store-products' element={<Storeproducts />} />

				<Route path='admin-dashboard' element={<Products />} />

				{/* SHOW */}
				<Route path='products/:id' element={<ProductDetails />} />
				{/* Product Form for delete or update */}
				{/* 0 >> Add */}
				{/* id >> Edit */}
				<Route path='products/:id/add' element={<ProductForm />} />
				<Route path='products/:id/edit' element={<ProductForm />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
			{/* Hide footer if the page is Login or Register */}
			{location.pathname !== "/login" && location.pathname !== "/user-login" && location.pathname !== "/admin-login" && location.pathname !== "/register" && location.pathname !== "/admin-dashboard" && <MyFooter />}
			{/* <MyFooter /> */}
			</ShoppingCartProvider>
		</div>
	);
}

export default App;
