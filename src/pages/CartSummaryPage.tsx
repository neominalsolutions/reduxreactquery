import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartItem } from '../store/slices/CartSlice';

function CartSummaryPage() {
	// redux yapısında güncel veri state reducer üzerinden okunuyor.
	const cartState = useSelector((store: RootState) => store.cartReducer.cart);
	// global state çağırma işlemi
	return (
		<div>
			{cartState.items.map((item: CartItem) => {
				return (
					<div key={item.id}>
						{item.name} x {item.quantity} = {item.quantity * item.listPrice}
					</div>
				);
			})}
			<div>Sepet Toplam: {cartState.total}</div>
		</div>
	);
}

export default CartSummaryPage;
