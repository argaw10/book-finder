import { useContext, useState } from 'react';
import "./addbook.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const AddBook = () => {
  const navigate = useNavigate()  
  const [bookData, setBookData] = useState({
    title: '',
    publisher: '',
    authors: '',
    publishYear:''
  });
  const [formErrors, setFormErrors] = useState({});
  const { fetchBooks } = useContext(AuthContext);

  const handleChange = (e) => {    
    const {name,value} = e.target;
    setBookData(prevBookData => ({
      ...prevBookData,
      [name]: value
    }));
    
  };
  const validate = () => {
    let errors = {};  
    if (!bookData.title.trim()) {
      errors.title = 'Title is required';
    }  
    if (!bookData.authors) {
      errors.authors = 'Authors is required';
    }   
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    axios.post('http://localhost:8080/api/books/books', bookData)
      .then(response => {
        console.log('Form submitted successfully', response.data);
        fetchBooks();
      })
      .catch(error => {
        console.error('Error submitting form', error);
      });
      setBookData('');
    navigate('/');
  };
}

  return (
     <div className="form-container">
        <form >
          <h1>Add New Book</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="form-control" />
           <div style={{color:'red'}}> {formErrors.title && <p>{formErrors.title}</p>}</div>
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input
             type="text"
             name="publisher"
             value={bookData.publisher}
             onChange={handleChange}
             className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="authors">Authors</label>
            <input
            type="text" 
            name="authors"
            value={bookData.authors}
            onChange={handleChange}
            className="form-control" />
            <div style={{color:'red'}}>{formErrors.authors && <p>{formErrors.authors}</p>}</div>
          </div>
          <div className="form-group">
            <label htmlFor="date">Publisher Year</label>
            <input
            type="text"
            name="publishYear" 
            value={bookData.publishYear}
            onChange={handleChange}
            className="form-control" />
          </div>
          <div className='btnCancelSave'>
          <button           
            onClick={handleSubmit}          
            className="btn btn-success ">Add</button>
            
            <button onClick={() => navigate('/')}
           style={{width:'150px',height:'50px', marginBottom:'20px'}}
          className="btn btn-warning">Cancel</button>
          </div>
        </form>
      </div>
    
  )
}

export default AddBook;
