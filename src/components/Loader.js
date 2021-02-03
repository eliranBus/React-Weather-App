import React from 'react';
import cloudGif from '../assets/images/cloud-loading.gif';

function Loader() {
  return (
    <div className="loader">
      <img
        src={cloudGif}
        alt="clouds-loader"
      />
    </div>
  );
}

export default Loader;
