import type { FunctionComponent } from "react";
import { CircularProgress, Container } from "@mui/material";

interface FullPageLoaderProps {}

const FullPageLoader: FunctionComponent<FullPageLoaderProps> = () => {
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default FullPageLoader;
