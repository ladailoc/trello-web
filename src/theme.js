import { createTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

export const createAppTheme = (mode) => {
  const baseTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            //         primary: { main: "#1976d2", 50: "rgba(56, 147, 186, 0.1)" },
            //         secondary: { main: "#9c27b0" },
            //         background: {
            //           default: "#f5f5f5",
            //           paper: "#ffffff",
            //         },
            //         text: {
            //           primary: "#212121",
            //           secondary: "#616161",
            //         },
            //         success: { main: "#2e7d32" },
            //         info: { main: "#0288d1" },
            //         warning: { main: "#f9a825" },
            //         error: { main: "#d32f2f" },
          }
        : {
            //         primary: { main: "#64b5f6" },
            //         secondary: { main: "#ba68c8" },
            //         background: {
            //           default: "#0d1117",
            //           paper: "#161b22",
            //         },
            //         text: {
            //           primary: "#e6edf3",
            //           secondary: "#8b949e",
            //         },
            //         success: { main: "#2ea043" },
            //         info: { main: "#58a6ff" },
            //         warning: { main: "#d29922" },
            //         error: { main: "#f85149" },
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "*::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#dcdde1",
              borderRadius: "8px",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "white",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "6px",
            textTransform: "none", // Không viết hoa chữ
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            "&.MuiTypography-body1": {
              fontSize: "0.875rem",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            "& fieldset": {
              border: "none",
              boxShadow: "0 0 1px white",
            },

            "&:hover fieldset": {
              border: "1px solid",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid",
            },
          },
        },
      },
    },
  });

  // Thêm thuộc tính tùy chỉnh
  return {
    ...baseTheme,
    trello: {
      appBarHeight: APP_BAR_HEIGHT,
      boardBarHeight: BOARD_BAR_HEIGHT,
      boardContentHeight: BOARD_CONTENT_HEIGHT,
    },
  };
};
