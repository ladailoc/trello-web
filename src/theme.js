import { createTheme } from "@mui/material/styles";

// Tạo hàm tạo theme dựa vào mode
export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light mode
            primary: { main: "#4355B9" }, // Xanh chàm dịu hơn
            secondary: { main: "#A88EDA" }, // Tím nhạt dễ chịu
            background: {
              default: "#F4F6F8", // Nền xám trắng nhẹ
              paper: "#FFFFFF", // Giấy trắng nhẹ
            },
            text: {
              primary: "#2D3748", // Xám đậm dễ đọc
              secondary: "#718096", // Xám phụ nhẹ
            },
            success: { main: "#48BB78" },
            info: { main: "#4299E1" },
            warning: { main: "#ECC94B" },
            error: { main: "#E53E3E" },
          }
        : {
            // Dark mode
            primary: { main: "#667EEA" },
            secondary: { main: "#B794F4" },
            background: {
              default: "#1A202C",
              paper: "#2D3748",
            },
            text: {
              primary: "#EDF2F7",
              secondary: "#A0AEC0",
            },
            success: { main: "#48BB78" },
            info: { main: "#63B3ED" },
            warning: { main: "#ECC94B" },
            error: { main: "#FC8181" },
          }),
    },
  });
};

// Xuất theme mặc định (light mode)
const theme = createAppTheme("light");
export default theme;
