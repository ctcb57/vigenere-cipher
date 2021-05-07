import React, { useState } from "react";

const ErrorMessage = ({ isError, errorMessage }) => {
  if (!isError) {
    return null;
  }
  return (
    <>
      <div className="uk-alert-danger" data-uk-alert>
        <p>{errorMessage}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
