import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import HomeIcon from "@mui/icons-material/Home";
import { pink } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from "@mui/material/Select"; // Added import
import MenuItem from "@mui/material/MenuItem"; // Added import
import { createAppTheme } from "./theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
function App() {
  // Lưu trữ chế độ: 'light', 'dark', hoặc 'system'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme-mode");
    return savedMode || "system"; // Mặc định là 'system'
  });

  // Phát hiện chế độ hệ thống (light/dark)
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Xác định palette.mode dựa trên mode
  const paletteMode =
    mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

  // Tạo theme với paletteMode
  const theme = createAppTheme(paletteMode);

  // Lưu chế độ vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // Xử lý thay đổi chế độ
  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          {/* Dropdown để chọn chế độ */}
          <Select value={mode} onChange={handleModeChange} size="small">
            <MenuItem value="light">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LightModeIcon fontSize="small" /> Light Mode
              </Box>
            </MenuItem>
            <MenuItem value="dark">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DarkModeOutlinedIcon fontSize="small" />
                Dark Mode
              </Box>
            </MenuItem>
            <MenuItem value="system">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SettingsBrightnessIcon fontSize="small" />
                System
              </Box>
            </MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: "background.paper",
            boxShadow: 1,
            mb: 3,
          }}
        >
          <h1>
            Chế độ hiện tại: {mode} (Theme: {paletteMode})
          </h1>
          <div>La Đại Lộc</div>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <AccessAlarmIcon />
          <ThreeDRotation />
          <HomeIcon />
          <HomeIcon color="primary" />
          <HomeIcon color="secondary" />
          <HomeIcon color="success" />
          <HomeIcon color="action" />
          <HomeIcon color="disabled" />
          <HomeIcon sx={{ color: pink[500] }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
