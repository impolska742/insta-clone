import React, { useState, useEffect } from "react";

const ErrorMessage = ({ error }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {show && (
        <div className="alert alert-dismissible alert-danger">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <strong>{error}</strong>{" "}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
