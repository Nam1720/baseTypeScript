import React from 'react';

const CatchError = (error: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="color-red">{error.message}</pre>
    </div>
  );
};

export default CatchError;
