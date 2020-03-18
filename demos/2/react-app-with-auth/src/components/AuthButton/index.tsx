import React, { EventHandler, SyntheticEvent } from "react";
import { Spinner, Button } from "reactstrap";
import { useAuth0 } from "../../services/Auth";
import "./index.css"

const AuthButton: React.FC = ({ ...props }) => {
  const {
    loginWithPopup,
    isInitializing,
    isAuthenticated,
    logout
  } = useAuth0();

  const onClick: EventHandler<SyntheticEvent<HTMLAnchorElement>> = async e => {
    e.preventDefault();
    if (!isInitializing) {
      isAuthenticated ? logout() : await loginWithPopup();
    }
  };

  return (
    <div id="auth-button">
      {isInitializing ? (
        <Spinner type="grow" {...props} />
      ) : (
        <Button onClick={onClick} {...props}>
          {isAuthenticated ? <span>Logout</span> : <span>Login</span>}
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
