import type { FunctionComponent } from "react";
import { League } from "lib/types";
import {
  Container,
  Divider,
  List,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import TitledListItem from "components/General/TitledListItem";
import { capitalize } from "lodash";

interface LeagueCardProps {
  league: League;
}

const LeagueCard: FunctionComponent<LeagueCardProps> = ({ league }) => {
  return (
    <Container component={Paper} variant="outlined">
      <List>
        <TitledListItem
          title="League Name"
          onClick={() => console.log("League name clicked")}
        >
          {league.name}
        </TitledListItem>
        <Divider />
        <TitledListItem
          title="Current Status"
          onClick={() => console.log("Current status clicked")}
        >
          {capitalize(league.status)}
        </TitledListItem>
        <Divider />
        <TitledListItem title="Teams">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Owner</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {league.teams.map((team) => (
                <TableRow>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TitledListItem>
      </List>
    </Container>
  );
};

export default LeagueCard;
