import { Container, IconButton, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

interface PageWithBackButtonProps {
  pageTitle: string;
}

const PageWithBackButton: FunctionComponent<PageWithBackButtonProps> = ({
  children,
  pageTitle,
}) => {
  const router = useRouter();
  return (
    <>
      <Grid container sx={{ paddingTop: "32px" }}>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            onClick={router.back}
            sx={{ margin: "32px" }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h1" fontSize="2rem">
            {pageTitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Container>{children}</Container>
        </Grid>
      </Grid>
    </>
  );
};

export default PageWithBackButton;
