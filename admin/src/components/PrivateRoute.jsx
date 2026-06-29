import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, ...rest }) => {
  const { currentAdmin } = useSelector((state) => state.admin);

  return (
    <Route
      {...rest}
      element={currentAdmin ? (
        element
      ) : (
        <Navigate to="/admin_login" replace state={{ from: rest.location }} />
      )}
    />
  );
};

export default PrivateRoute;