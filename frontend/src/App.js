
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar/navbar"
import About from "./Components/about/about"
import Contact from "./Components/contact/contact";
import EditBook from "./Components/Editebook/Editebook";
import AddBook from "./Components/AddBook/addbook";
import { useContext } from "react";
import { AuthContext } from "./Components/context/Authcontext";
import Service from "./Components/service/service"
const App=() =>{
  const { isAuthenticated } = useContext(AuthContext);
console.log('APP',isAuthenticated);
  return (
    <div className="App">
      
        <Navbar />      
        <Routes>
          <Route path="/" element={isAuthenticated ?<Service/>:<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/edit/:id" element={<EditBook/>}></Route>
          <Route path="/create" element={<AddBook/>}></Route>
        
        </Routes>          
    </div>
  );
}

export default App;