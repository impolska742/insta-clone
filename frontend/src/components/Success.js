import React, { useEffect, useState } from "react";

const Success = ({ success }) => {
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
        <div className="alert alert-dismissible alert-success">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <strong>{success}</strong>
        </div>
      )}
    </>
  );
};

export default Success;
