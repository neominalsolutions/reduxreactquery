import { configureStore } from '@reduxjs/toolkit';
import { CartReducer } from './slices/CartSlice';

// createContext yeni bir globals state yapısı kurduysak. redux tarfında bunun yerine configureStore ile global bir state yapısını üzerinde tutan mekanizma oluşturuyoruz.
export const store = configureStore({
	reducer: {
		cartReducer: CartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>; // tüm stateleri root state tipinde yakalayacağız
export type RootDispatch = typeof store.dispatch; // actionları tetiklemek için bir dispatch tipi tanımladık.
