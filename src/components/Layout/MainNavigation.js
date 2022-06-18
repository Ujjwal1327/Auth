import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/Authcontext";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLogin = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLogin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLogin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
