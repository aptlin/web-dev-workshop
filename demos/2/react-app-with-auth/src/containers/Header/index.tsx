import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "reactstrap";
import AuthButton from "../../components/AuthButton";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import "./index.css";

const Header: React.FC = () => {
  return (
    <Navbar>
      <Link className="navbar-brand-link" to="/">
        <Logo />
        <span className="brandname">Moodie</span>
      </Link>
      <Search />
      <AuthButton />
    </Navbar>
  );
};
export default Header;
