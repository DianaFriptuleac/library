import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import SingleBook from "./components/SingleBook";
import Home from "./components/Home";
import CustomFooter from "./components/CustomFooter";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginRegistration from "./components/LoginRegistration";


function App() {
  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <header>
        <CustomNavbar />
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/book/:id" element={<SingleBook />} />
          <Route path="/auth" element={<LoginRegistration/>}/>
        </Routes>
      </main>
      <footer>
        <CustomFooter/>
      </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
