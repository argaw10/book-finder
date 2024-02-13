
 import axios from 'axios';
 import { createContext, useEffect, useState } from 'react';

  export const AuthContext = createContext();

 export const AuthProvider = ({ children }) => {
     const [bookData, setBookData] = useState ([AuthContext]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
   
 
   console.log(isAuthenticated,'OutSide');
  // Getting all Books here
   useEffect(() => {        
     axios.get('http://localhost:8080/api/books/books')
          .then(res => {
             setBookData(res.data)
          })            
          .catch(error => console.log(error));
       }, [setBookData]);

      const fetchBooks = () => {
     axios.get('http://localhost:8080/api/books/books')
      .then(res => { console.log(res.data);
          setBookData(res.data);
      })            
      .catch(error => console.log(error));
   };
   useEffect(() => {
     fetchBooks();
   }, []);

      useEffect(() => {
         const token = localStorage.getItem("token");
     setIsAuthenticated(!!token);
  }, []);

     const login = (token) => {
         localStorage.setItem("token", token);
          setIsAuthenticated(true);
          console.log(token);
      }
    
     const signout = () => {
        localStorage.removeItem("token");
          setIsAuthenticated(false);
      }

     return (
          <AuthContext.Provider value={{ bookData,setBookData,
         login,signout ,fetchBooks
              ,isAuthenticated,setIsAuthenticated}}>
              {children}
        </AuthContext.Provider>
     );
 };