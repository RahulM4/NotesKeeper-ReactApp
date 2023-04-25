import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
    props.showAlert("Logout successfully", "success");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NotesKeeper</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":"" }`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":"" }`}  to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" >
              <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to='/signup' role="button">Signup</Link>
            </form> : <button className="btn btn-primary mx-2" onClick = {handleLogout}>Logout</button>
            }
            
          </div>
       </div>
      </nav>
    </div>
  )
}

