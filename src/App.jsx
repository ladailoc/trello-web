import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import HomeIcon from "@mui/icons-material/Home";
import { pink } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "./theme";

function App() {
  // Sử dụng useState để lưu trạng thái chế độ sáng/tối
  const [mode, setMode] = useState(() => {
    // Khôi phục chế độ từ localStorage nếu có
    const savedMode = localStorage.getItem("theme-mode");
    return savedMode || "light";
  });

  // Tạo theme dựa trên mode hiện tại
  const theme = createAppTheme(mode);

  // Lưu chế độ vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // Hàm chuyển đổi chế độ
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button variant="outlined" onClick={toggleColorMode}>
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
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
          <h1>Chế độ hiện tại: {mode}</h1>
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
