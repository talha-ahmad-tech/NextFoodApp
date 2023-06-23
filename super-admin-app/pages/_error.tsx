import React from 'react';

type ErrorProps = {
  statusCode?: number;
  message?: string;
};

const Error: React.FC<ErrorProps> = ({ statusCode, message }) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>{message || 'An error occurred on the server.'}</p>
    </div>
  );
};

export default Error;
