import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock_data";

const Board = ({ mode, setMode }) => {
  const theme = useTheme();

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar mode={mode} setMode={setMode} theme={theme} />
      <BoardBar theme={theme} board={mockData?.board} />
      <BoardContent theme={theme} board={mockData?.board} />
    </Container>
  );
};

export default Board;
