import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
const BoardContent = ({ theme, board }) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#0066CC" : "#34495e",
        width: "100%",
        height: theme.trello.boardContentHeight,
        padding: "10px 0",
      }}
    >
      <ListColumns theme={theme} columns={orderedColumns} />
    </Box>
  );
};

export default BoardContent;
