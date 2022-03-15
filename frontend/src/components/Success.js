/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Success = ({ success }) => {
  return (
    <div class="alert alert-dismissible alert-success">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>{success}</strong>
    </div>
  );
};

export default Success;
