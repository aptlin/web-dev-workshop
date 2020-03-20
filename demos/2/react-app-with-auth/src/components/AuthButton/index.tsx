import React, { EventHandler, SyntheticEvent, useState } from "react";
import {
  Spinner,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useAuth0 } from "../../services/Auth";
import "./index.css";
import ProfilePicture from "../ProfilePicture";

const AuthButton: React.FC = ({ ...props }) => {
  const {
    loginWithPopup,
    isInitializing,
    isAuthenticated,
    logout,
    user
  } = useAuth0();

  const onClick: EventHandler<SyntheticEvent<HTMLAnchorElement>> = async e => {
    e.preventDefault();
    if (!isInitializing) {
      isAuthenticated ? logout() : await loginWithPopup();
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div id="auth-button">
      {isInitializing ? (
        <Spinner type="grow" {...props} />
      ) : isAuthenticated ? (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props}>
          <DropdownToggle color="light" caret>
            <ProfilePicture src={user!.picture || ""} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={onClick} color="danger" {...props}>
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button onClick={onClick} color="info" {...props}>
          <span>Login</span>
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
