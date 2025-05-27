import { Box } from "@mui/material";

const BoardBar = ({ theme }) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      Board Bar
    </Box>
  );
};

export default BoardBar;
