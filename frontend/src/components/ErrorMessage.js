import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div class="alert alert-dismissible alert-danger">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>{error}</strong>{" "}
    </div>
  );
};

export default ErrorMessage;
