import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bakery-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={close}>
          🥐 Bakery Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="mainNav">
          <ul className="navbar-nav ms-auto gap-md-1">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={close}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add" onClick={close}>
                Add Bakery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bakeries" onClick={close}>
                View Bakeries
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
