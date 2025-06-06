import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
const BoardContent = ({ theme }) => {
  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#0066CC" : "#34495e",
        width: "100%",
        height: theme.trello.boardContentHeight,
        padding: "10px 0",
      }}
    >
      <ListColumns theme={theme} />
    </Box>
  );
};

export default BoardContent;
