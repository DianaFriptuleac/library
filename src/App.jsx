import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import SingleBook from "./components/SingleBook";

function App() {
  return (
    <BrowserRouter>
      <header>
        <CustomNavbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/book/:id" element={<SingleBook />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
