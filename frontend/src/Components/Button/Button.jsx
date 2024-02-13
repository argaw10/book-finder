import React from 'react';

const Button = ({value,onClick}) => {
  return (
    <div>
      <button onClick={onClick} id='home'
      style={{width:'200px',height:'50px',marginBottom:'20px'}}
      className='btn btn-primary'>{value}</button>
      
    </div>
  )
};

export default Button;