import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ProductDetails() {
	let { id } = useParams();
	let navigate = useNavigate();

	let [product, setProduct] = useState({});

	let getProductData = async () => {
		let response = await axios.get(`http://localhost:3005/products/${id}`);
		setProduct(response.data);
	};
	useEffect(() => {
		getProductData();
	}, []);

	let goToProducts = () => {
		navigate("/store");
	};
	return (
		<div className='bg-light p-5 text-center'>
			<h2 className='text-dark'>Product Details of ID : {id}</h2>
			<p className='lead fs-2 mt-3 text-info'>
				Product Name : {product.name}
			</p>
			<p className='lead fs-2 mt-3 text-dark'>
				Product Price : {product.price} $
			</p>
			<button onClick={goToProducts} className='btn btn-dark'>
				Back To Products
			</button>
		</div>
	);
}
