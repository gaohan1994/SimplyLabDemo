import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderContainer = styled(Container)(({ theme }) => ({
  maxWidth: "md",
  left: 0,
  right: 0,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  background: theme.palette.background.paper,
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: theme.palette.background.paper,
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(3),
}));
