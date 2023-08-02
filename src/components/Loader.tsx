import React from 'react';
import { RotatingTriangles } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className='w-full flex justify-center p-10' >
      <RotatingTriangles
        visible={true}
        height="100"
        width="100"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
        colors={['#c80412', '#ef6000', '#e80']}
      />

    </div>
  );
};

export default Loader;