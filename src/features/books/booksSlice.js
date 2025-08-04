import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

//createAsyncThunk => funzione di Redux Toolkit per gestire le chiamate asincrone.
//  Gestisce automaticamente lo stato di caricamento, successo ed errore per le operazioni asincrone.
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const responce = await fetch(`https://gutendex.com/books`);
  const data = await responce.json();
  return data.results.sort(() => 0.5 - Math.random()).slice(0, 20); //20 libri casuali
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const responce = await fetch(`https://gutendex.com/books/${id}`);
    return await responce.json();
  }
);

const booksSlice = createSlice({
  name: "books", //nome slice
  initialState: {
    list: [],
    single: null,
    status: "idle", // stato innattivo, nessuna chiamata esseguita. (idle, loading, succeeded, failed)
    error: null,
  },
  reducers: {}, //posto per reducers (delete, update...)

  // Extra reducers → gestiscono le azioni create da createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading"; //mostra loader quando la chiamata è in corso
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; //salva la lista libri nel array list
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.single = action.payload; ///salva il libbro nel oggetto single
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default booksSlice.reducer;
