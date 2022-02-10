import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";

import { AuthProvider, useAuth } from "./state/state";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              // This route is protected by the RequireAuth
              // component, which will redirect to the login page if the user is not logged in.
              <RequireAuth>
                <UsersPage />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

// Simple wrapper for <Route> that redirects to the login page if you're not yet authenticated.
function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
