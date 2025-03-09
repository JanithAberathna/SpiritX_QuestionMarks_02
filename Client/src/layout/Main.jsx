import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3JpY2tldHxlbnwwfHwwfHx8MA%3D%3D)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Spirit<span className='text-green-500'>11</span></h1>
            <p className="mb-5">
            Spirit11 empowers you to build your ultimate cricket dream team.
            Experience real-time player stats, strategic team selection and thrilling contests all in one platform. 
            
            </p>
            <button className="btn bg-green-500 text-white" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
