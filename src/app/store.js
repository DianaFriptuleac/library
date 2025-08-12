import { configureStore } from "@reduxjs/toolkit";
import allbooksReducer from '../features/books/booksSlice.js';
import authReducer from "../features/auth/authReducer.js";

export const store = configureStore({
reducer: {
    books: allbooksReducer,
    auth: authReducer,
}
});
//questo nome allbooksReducer -> lo scelgo io qua. Può essere qualsiasi nome, ma deve essere lo stesso che uso in useSelector