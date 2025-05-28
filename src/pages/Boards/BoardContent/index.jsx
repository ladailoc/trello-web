import Box from "@mui/material/Box";

const BoardContent = ({ theme }) => {
  return (
    <Box
      sx={{
        // backgroundColor: "primary.main",
        bgcolor: theme.palette.mode === "light" ? "#74b9ff" : "#34495e",
        width: "100%",
        height: (theme) =>
          `calc(100vh - (${theme.trello.appBarHeight} + ${theme.trello.boardBarHeight}))`,
        // Chiều cao còn lại sau khi trừ header và board bar
        display: "flex",
        alignItems: "center",
      }}
    >
      Board Content
    </Box>
  );
};

export default BoardContent;
