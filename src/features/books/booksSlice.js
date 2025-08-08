import { createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

//createAsyncThunk => funzione di Redux Toolkit per gestire le chiamate asincrone.
//  Gestisce automaticamente lo stato di caricamento, successo ed errore per le operazioni asincrone.
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (page = 1) => {
    const responce = await fetch(`https://gutendex.com/books/?page=${page}`);
    const data = await responce.json();
    //return data.results.sort(() => 0.5 - Math.random()).slice(0, 30); //20 libri casuali
    return {
      books: data.results,
      next: data.next,
      previous: data.previous,
    };
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (query) => {
    const responce = await fetch(
      `https://gutendex.com/books/?search=${encodeURIComponent(query)}`
    );
    const data = await responce.json();
    return data.results;
  }
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const responce = await fetch(`https://gutendex.com/books/${id}`);
    return await responce.json();
  }
);

//Rejected and Pending
const handlePending = (state) => {
  state.status = "loading";
  state.error = null;
};

const handleRejected = (state, action) => {
  state.status = "failed";
  state.error = action.error.message;
};

const booksSlice = createSlice({
  name: "books", //nome slice
  initialState: {
    list: [],
    next: null,
    previous: null,
    single: null,
    status: "idle", // stato innattivo, nessuna chiamata esseguita. (idle, loading, succeeded, failed)
    error: null,
  },
  reducers: {}, //posto per reducers (delete, update...)

  // Extra reducers → gestiscono le azioni create da createAsyncThunk
  extraReducers: (builder) => {
    builder
      //FetchBooks
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.books; //salva la lista libri nel array list
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      //SearchBooks
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; //sovrascrive i risultati con quelli trovati
      })
      //BookById
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.single = action.payload; ///salva il libbro nel oggetto single
      })

      //Unisco x tutti il pending e il failed
      //adddMatcher -> esegue un reducer solo se l’azione corrisponde a una condizione
      .addMatcher(
        isPending(fetchBooks, searchBooks, fetchBookById),
        handlePending
      )
      .addMatcher(
        isRejected(fetchBooks, searchBooks, fetchBookById),
        handleRejected
      );
  },
});
export default booksSlice.reducer;
