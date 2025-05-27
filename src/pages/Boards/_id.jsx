import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppBar from "../../components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";

const Board = ({ mode, setMode }) => {
  const theme = useTheme();

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar mode={mode} setMode={setMode} theme={theme} />
      <BoardBar theme={theme} />
      <BoardContent />
    </Container>
  );
};

export default Board;
