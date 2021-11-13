import type { FunctionComponent } from "react";
import { useState } from "react";
import LoginForm from "components/Login/LoginForm";
import SignUpForm from "components/Login/SignUpForm";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div
      style={{
        height: "80vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      {!signUp ? (
        <LoginForm handleSignUp={() => setSignUp(true)} />
      ) : (
        <SignUpForm handleSignIn={() => setSignUp(false)} />
      )}
    </div>
  );
};

export default Login;
