
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [succMessage,setSuccMessage] = useState('');
  const navigate = useNavigate();

    const handleSubmit = (e) => {  
      e.preventDefault();
      setSuccMessage('You Successfully submitted the comment !! , Thank you for you comment');   
      setTimeout(() => {
        setSuccMessage('');
        navigate('/home');       
      }, 2000);  
    }
    
  return (
    <>
     <div className="form-container">
   
        <form >
        {succMessage && <h5 style={{color:'green',fontWeight:'600'}}>{succMessage}</h5>}
          <h1>Contact us directly</h1>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
            type="text"
            name="name"
            className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
             type="email"
             name="publisher"
             className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
            type="text" 
            name="comment"
            className="form-control" />
          </div>
          <button onClick={handleSubmit}
           id='btnSubmit' className='btn btn-success'>Submit</button>
           
        </form>        
        
      </div>
     
      </>
  )
};

export default Contact;
