import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const EditeBook = () => {  
  const { setBookData} = useContext(AuthContext);
  const [isUpdateFinished, setIsUpdateFinished] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: id,
    title: "",
    authors:"",
    publisher: "",
    publishYear:""
  });
  //  Updating based on their ID
  useEffect(() => {
  axios.get("http://localhost:8080/api/books/books/" + id)
    .then((res) => {  
      setValues(currentValues => ({
        ...currentValues,
        title: res.data.title,
        publisher: res.data.publisher,
        authors: res.data.authors,
        publishYear: res.data.publishYear
      }));
    })
    .catch((err) => console.log(err));

}, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8080/api/books/books/" + id, values)
      .then((res) => { 
        if(!res.data) return;
        console.log('handleSubm',res.data);
        setIsUpdateFinished(true);
        
      })
      .catch((err) => console.log(err));
      
  };
  console.log('OutSideUseEf',isUpdateFinished);
  useEffect (() => {
    console.log('Inside useEf',isUpdateFinished);
    if(isUpdateFinished) {
      axios.get('http://localhost:8080/api/books/books')
      .then(res => setBookData(res.data))            
      .catch(error => console.log(error));
      navigate("/");
    }
  }, [isUpdateFinished, navigate, setBookData])
  
  return (
    <>
      <div className="form-container ">
        
        <form  >
        <h2>Update the Book</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={values.title}
              name="title"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="Enter Book Title"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              value={values.publisher}
              name="publisher"
              onChange={(e) =>
                setValues({ ...values, publisher: e.target.value })
              }
              placeholder="Enter Publisher"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              value={values.authors}
              name="author"
              onChange={(e) => setValues({ ...values, authors: e.target.value })}
              className="form-control"
              placeholder="Enter Number of Pages"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Publisher Year</label>
            <input type="text" 
            value={values.publishYear}
            onChange={(e) => setValues({...values,publishYear: e.target.value})}
            className="form-control" />
          </div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <button onClick={handleSubmit}
           style={{width:'150px',height:'50px', marginBottom:'20px'}}
           type="button" className="btn btn-success">
            Save
          </button>
          &nbsp;
          <button onClick={() => navigate('/')}
           style={{width:'150px',height:'50px', marginBottom:'20px'}}
          className="btn btn-warning">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditeBook;