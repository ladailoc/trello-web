import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createAppTheme } from "./theme"; // Giả sử file theme vẫn được import

function ThemeWrapper() {
  // Lưu trữ chế độ: 'light', 'dark', hoặc 'system'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme-mode");
    return savedMode || "system"; // Mặc định là 'system'
  });

  // Phát hiện chế độ hệ thống (light/dark)
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log("prefersDarkMode:", prefersDarkMode);

  // Xác định palette.mode dựa trên mode
  const paletteMode =
    mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

  // Tạo theme với paletteMode
  const theme = createAppTheme(paletteMode);

  // Lưu chế độ vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App setMode={setMode} mode={mode} />{" "}
      {/* Truyền mode và setMode vào App */}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);
