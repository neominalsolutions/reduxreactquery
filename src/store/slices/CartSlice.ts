// useReducerdaki type bazlı state güncellediğimiz reducer functiona benzetebiliriz
// veya context api daki Context.Provider yapısına benzetebilir.

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Cart {
	items: CartItem[];
	total: number;
}

export interface CartItem {
	id: number;
	quantity: number;
	name: string;
	listPrice: number;
}

export type CartState = {
	cart: Cart;
};

const initialCartState: CartState = {
	cart: { items: [], total: 0 },
};

const CartSlice = createSlice({
	name: 'CartState', // unique action type prefix, bir state değişikliği olduğunda bu isim üzerinden state takibi yapacağız.
	initialState: initialCartState, // state default değer.
	reducers: {
		// istediğimiz kadar action tanımı yapabiliriz.
		addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
			// state.cart.items = [...state.cart.items, action.payload];

			const existing = state.cart.items.find((x) => x.id === action.payload.id);

			if (existing) {
				existing.quantity += 1;
			} else {
				state.cart.items.push(action.payload);
			}

			let total = 0;
			state.cart.items.forEach((item) => {
				total += item.quantity * item.listPrice;
			});

			state.cart.total = total;

			window.alert();

			// return {...state};
		},
		removeFromCart: (
			state: CartState,
			action: PayloadAction<{ id: number }>
		) => {},
	},
});

// actionları diğer ts dosyalarından çağırmak için dışarı çıkardık
export const { addToCart, removeFromCart } = CartSlice.actions;
// store'a reducer ekleyerek store üzerinden statelerin action bazlı güncellenmesi için reducer export ettik.
export const CartReducer = CartSlice.reducer;
