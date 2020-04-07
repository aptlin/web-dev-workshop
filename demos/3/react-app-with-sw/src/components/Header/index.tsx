import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "reactstrap";
import AuthButton from "../../components/AuthButton";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import "./index.css";
import ErrorBoundary from "../../components/ErrorBoundary";

const Header: React.FC = () => {
  return (
    <Navbar>
      <Link className="navbar-brand-link" to="/">
        <Logo />
        <span className="brandname">Moodie</span>
      </Link>
      <ErrorBoundary>
        <Search />
        <AuthButton />
      </ErrorBoundary>
    </Navbar>
  );
};
export default Header;
