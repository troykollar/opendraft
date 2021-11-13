import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  Grow,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import CreateLeagueDialog from "components/Index/CreateLeagueDialog";
import { useMyLeagues } from "lib/hooks/useMyLeagues";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [leagues, leaguesLoading, leaguesError] = useMyLeagues();
  const [createLeagueDialog, setCreateLeagueDialog] = useState(false);
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
              <Button
                onClick={() => setCreateLeagueDialog(true)}
                fullWidth
                variant="contained"
              >
                Create
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ padding: 2 }}>
              <Button fullWidth variant="contained" disabled>
                Join
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} sx={{ paddingTop: 1, paddingBottom: 2 }}>
              <Typography variant="h5" textAlign="center">
                Your Leagues
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Fade in={leaguesLoading}>
                <CircularProgress
                  sx={{ position: "relative", top: -5 }}
                  size={25}
                />
              </Fade>
            </Grid>
            <Grid item xs={12}>
              {leagues && leagues.length > 0 && (
                <Grow in={!leaguesLoading} timeout={1000}>
                  <Paper
                    variant="outlined"
                    component={List}
                    sx={{ padding: 2 }}
                  >
                    {leagues.map((league) => (
                      <ListItemButton
                        key={league.id}
                        onClick={() => router.push(`/league/${league.id}`)}
                      >
                        <ListItemText>{league.name}</ListItemText>
                      </ListItemButton>
                    ))}
                  </Paper>
                </Grow>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>

      <CreateLeagueDialog
        open={createLeagueDialog}
        onClose={() => setCreateLeagueDialog(false)}
      />

      <footer></footer>
    </div>
  );
};

export default Home;
