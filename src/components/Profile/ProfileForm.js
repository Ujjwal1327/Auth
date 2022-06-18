import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/Authcontext";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enterdNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBlfzJ2jm_yqnmVb_p6ywjHY9zvld-EmV4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enterdNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then(() => {
        console.log("Password Changed");
        history.replace("/");
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  };

  const logoutHandler = () => {
    console.log("234322");
    console.log(authCtx.token);
    authCtx.logout();
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button onClick={logoutHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
