import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useMyLeagues } from "lib/hooks/useMyLeagues";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const [leagues, leaguesLoading, leaguesError] = useMyLeagues();
  return (
    <div>
      <Head>
        <title>OpenDraft.io</title>
        <meta
          name="description"
          content="A free and open source fantasy draft app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="sm" sx={{ paddingTop: 2 }}>
          <Grid container>
            <Grid item xs={6} sx={{ padding: 2 }}>
              <Button fullWidth variant="contained">
                Create a League
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ padding: 2 }}>
              <Button fullWidth variant="contained">
                Join a league
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Grid container>
            <Grid item xs={12} sx={{ paddingTop: 1, paddingBottom: 2 }}>
              <Typography variant="h5" textAlign="center">
                Your Leagues
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {!leaguesLoading ? (
                <Grow in={!leaguesLoading} timeout={1000}>
                  <Paper elevation={3} component={List} sx={{ padding: 2 }}>
                    {leagues?.map((league) => (
                      <ListItem disablePadding key={league.id}>
                        <ListItemButton>
                          <ListItemText>{league.name}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </Paper>
                </Grow>
              ) : (
                <Fade in={leaguesLoading}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 150,
                    }}
                  >
                    <CircularProgress />
                  </div>
                </Fade>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
