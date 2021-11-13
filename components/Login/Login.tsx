import type { FunctionComponent } from "react";
import LoginForm from "components/Login/LoginForm";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <div
      style={{
        height: "80vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;
