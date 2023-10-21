import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    props.showAlert("Logout successfully", "success");
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/NotesKeeper-React">NotesKeeper</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${location.pathname==="/NotesKeeper-React"?"active":"" }`} href="/NotesKeeper-React/home">Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname==="NotesKeeper-Reac/t/about"?"active":"" }`}  href="/NotesKeeper-React/about">About</a>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" >
              <a className="btn btn-primary mx-2" href='/NotesKeeper-React/login' role="button">Login</a>
              <a className="btn btn-primary mx-2" href='/NotesKeeper-React/signup' role="button">Signup</a>
            </form> : <button className="btn btn-primary mx-2" onClick = {handleLogout}>Logout</button>
            }
            
          </div>
          <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.toggleMode}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                🔆Dark
              </label>
            </div>
       </div>
      </nav>
    </div>
  )
}

