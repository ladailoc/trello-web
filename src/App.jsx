import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { Container, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function ModeSelect({ mode, handleModeChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      {/* Dropdown để chọn chế độ */}
      <Select value={mode} onChange={handleModeChange} size="small">
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon fontSize="small" /> Light Mode
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" /> Dark Mode
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function App({ mode, setMode }) {
  const theme = useTheme();
  // Xử lý thay đổi chế độ
  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          height: theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ModeSelect
          mode={mode}
          handleModeChange={handleModeChange}
        ></ModeSelect>
      </Box>
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
      <Box
        sx={{
          backgroundColor: "primary.main",
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
    </Container>
  );
}

export default App;
