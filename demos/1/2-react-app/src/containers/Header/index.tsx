import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import "./index.css";

const Header: React.FC<IInteractiveHeader> = ({ onSubmit }) => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link className="navbar-brand-link" to="/">
          <Logo />
          <span className="brandname">Moodie</span>
        </Link>
      </NavbarBrand>
      <Search onSubmit={onSubmit} />
    </Navbar>
  );
};
export default Header;
