import React from 'react';
import { RotatingTriangles } from "react-loader-spinner";

interface LoaderProps {
  size: number;
}

const Loader: React.FC<LoaderProps> = ({size}) => {
  return (
      <RotatingTriangles
        visible={true}
        height={size}
        width={size}
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
        colors={['#c80412', '#ef6000', '#e80']}
      />
  );
};

export default Loader;