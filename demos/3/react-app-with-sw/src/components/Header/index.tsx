import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import AuthButton from '../../components/AuthButton';
import Logo from '../../components/Logo';
import Search from '../../components/Search';
import './index.css';
import ErrorBoundary from '../../components/ErrorBoundary';

const Header: React.FC = () => {
  return (
    <Navbar className="d-flex align-items-center justify-content-start px-0 py-0">
      <Link className="navbar-brand-link" to="/">
        <Logo />
        <span className="brandname">Moodie</span>
      </Link>
      <ErrorBoundary>
        <div className="first-on-big-second-on-small">
          <Search />
        </div>
        <div className="second-on-big-first-on-small">
          <AuthButton />
        </div>
      </ErrorBoundary>
    </Navbar>
  );
};
export default Header;
