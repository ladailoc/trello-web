import Box from "@mui/material/Box";
import Card from "./Card/Card";

const ListCards = ({ theme }) => {
  return (
    <Box
      sx={{
        p: "0 5px",
        m: "0 5px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
          5
        )} - ${theme.trello.columnHeaderHeight} - ${
          theme.trello.columnFooterHeight
        })`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2cf",
        },
      }}
    >
      <Card />
      <Card temporaryHideMedia />
    </Box>
  );
};

export default ListCards;
