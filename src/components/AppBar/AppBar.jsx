import { useState } from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import ModeSelect from "../ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import TrelloIcon from "~/assets/trello.svg?react";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const AppBar = ({ mode, setMode, theme }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: theme.palette.mode === "light" ? "#004C99" : "#2c3e50",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "white" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SvgIcon
            component={TrelloIcon}
            sx={{ color: "white" }}
            inheritViewBox
          ></SvgIcon>
          <Typography
            variant="span"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            variant="outlined"
            startIcon={<LibraryAddIcon />}
            sx={{
              color: "white",
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Search field */}
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize="small"
                sx={{
                  color: searchValue ? "white" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setSearchValue("")}
              />
            ),
          }}
          sx={{
            minWidth: "120px",
            maxWidth: "180px",
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />
        {/* Mode Select */}
        <ModeSelect
          mode={mode}
          handleModeChange={handleModeChange}
        ></ModeSelect>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "white" }} />
          </Badge>
        </Tooltip>
        {/* Help */}
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
        </Tooltip>
        {/* User Avatar */}
        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
