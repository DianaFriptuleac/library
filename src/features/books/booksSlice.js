import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const responce = await fetch(`https://gutendex.com/books`);
        const data = await responce.json();
        return data.results.sort(()=> 0.5 - Math.random()).slice(0, 20);
    }
);

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id) => {
        const responce = await fetch(`https://gutendex.com/books/${id}`);
        return await responce.json();
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        list: [],
        single: null,
        status: 'idle',
        error: null
    },
    reducers: {},
extraReducers: (builder) => {
    builder
        .addCase(fetchBooks.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.list = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchBookById.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBookById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.single = action.payload;
        })
        .addCase(fetchBookById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
}

})
export default booksSlice.reducer;