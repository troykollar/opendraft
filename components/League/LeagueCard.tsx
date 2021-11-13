import { FunctionComponent, useEffect } from "react";
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
  Button,
} from "@mui/material";
import TitledListItem from "components/General/TitledListItem";
import { capitalize } from "lodash";
import DeleteLeagueButton from "./DeleteLeagueButton";
import { useRouter } from "next/router";

interface LeagueCardProps {
  id: string;
  league: League;
}

const LeagueCard: FunctionComponent<LeagueCardProps> = ({ id, league }) => {
  const router = useRouter();
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
        <Divider />
        <TitledListItem title="Delete League">
          <DeleteLeagueButton id={id} league={league} />
        </TitledListItem>
      </List>
    </Container>
  );
};

export default LeagueCard;
