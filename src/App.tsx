import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartSummaryPage from './pages/CartSummaryPage';
import path from 'path';

function App() {
	return useRoutes([
		{
			path: '/',
			element: (
				<div style={{ padding: '10px' }}>
					<Link to="/products">Products</Link>{' '}
					<Link to="/cartSummary">Cart Summary</Link>
					<main>
						<Outlet />
					</main>
				</div>
			),
			children: [
				{
					path: '/products', // react query
					Component: ProductsPage,
				},
				{
					path: '/cartSummary', // redux
					Component: CartSummaryPage,
				},
			],
		},
	]);
}

export default App;
