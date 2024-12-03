import React from "react";
import { Outlet, Link } from "react-router-dom";
import LoggedInUser from "../../components/Uporabnik/LoggedInUser";
import { useAuth } from "../../components/Uporabnik/AuthContext";
import "../../styles/navigation.css";

const Layout: React.FC = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <Link to="/">Oglasi</Link>
            </li>
            {isAdmin && (
             <>
              <li>
                <Link to="/kategorije">Kategorije</Link>
              </li>
              <li>
                <Link to="/uporabniki">Uporabniki</Link>
              </li>
             </>
            )}
            {!isLoggedIn && (
              <>
                <li className="rightsideli">
                  <Link to="/login">Login</Link>
                </li>
                <li className="rightsideli">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            <li className="loggedInUser">
              <LoggedInUser />
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
