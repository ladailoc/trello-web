import { Box } from "@mui/material";
import ModeSelect from "../ModeSelect";

const AppBar = ({ mode, setMode, theme }) => {
  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      <ModeSelect mode={mode} handleModeChange={handleModeChange}></ModeSelect>
    </Box>
  );
};

export default AppBar;
