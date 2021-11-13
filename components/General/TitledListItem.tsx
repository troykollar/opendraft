import { ChevronRight } from "@mui/icons-material";
import { Grid, ListItem, Typography, ListItemButton } from "@mui/material";
import type { FunctionComponent, MouseEventHandler } from "react";

interface TitledListItemProps {
  title: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const TitledListItem: FunctionComponent<TitledListItemProps> = ({
  title,
  onClick,
  children,
}) => {
  return (
    <>
      {onClick ? (
        <ListItemButton onClick={onClick} sx={{ padding: 2 }}>
          <Grid container alignItems="center">
            <Grid item sm={4} xs={12}>
              <Typography variant="overline">{title}</Typography>
            </Grid>
            <Grid item sm={7} xs={11}>
              {children}
            </Grid>
            <Grid item xs={1}>
              <ChevronRight />
            </Grid>
          </Grid>
        </ListItemButton>
      ) : (
        <ListItem sx={{ padding: 2 }}>
          <Grid container alignItems="center">
            <Grid item sm={4} xs={12}>
              <Typography variant="overline">{title}</Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
              {children}
            </Grid>
          </Grid>
        </ListItem>
      )}
    </>
  );
};

export default TitledListItem;
