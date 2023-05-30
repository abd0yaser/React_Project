
import "./App.css";
import { MyNav } from "./components/MyNav";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { ProductDetails } from "./components/ProductDetails";
import { ProductForm } from "./components/ProductForm";
import { NotFound } from "./components/NotFound";
import {MyFooter} from "./components/MyFooter";
import {MyRegister} from "./components/MyRegister";


import { AdminLogin } from './components/AbanopAsaad/Login/AdminLogin';
import { UserLogin } from './components/AbanopAsaad/Login/UserLogin';
import { MainLogin } from './components/AbanopAsaad/Login/MainLogin';



function App() {
	return (
		<div className="total">
			<MyNav />
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='home' element={<Home />} />



				<Route path='login' element={<MainLogin />} />
				<Route path='register' element={<MyRegister/>}/>
				<Route path='admin-login' element={<AdminLogin />} />
				<Route path='user-login' element={<UserLogin />} />


				<Route path='products' element={<Products />} />

				{/* SHOW */}
				<Route path='products/:id' element={<ProductDetails />} />
				{/* Product Form for delete or update */}
				{/* 0 >> Add */}
				{/* id >> Edit */}
				<Route path='products/:id/add' element={<ProductForm />} />
				<Route path='products/:id/edit' element={<ProductForm />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
			<MyFooter/>
		</div>
	);
}

export default App;
