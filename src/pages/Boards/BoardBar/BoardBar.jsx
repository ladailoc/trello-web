import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLE = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

const BoardBar = ({ theme, board }) => {
  return (
    <Box
      sx={{
        // backgroundColor: "primary.dark",
        width: "100%",
        height: theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: theme.palette.mode === "light" ? "#0066CC" : "#34495e",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label={board?.title || "Board Title"}
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": {
                bgcolor: "#a4b0de",
              },
            },
          }}
        >
          <Tooltip title="La Đại Lộc">
            <Avatar
              alt="La Dai Loc"
              src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/482005191_1317184785997582_2477304933580895668_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFKh8qI0-EqypY7-sLLZjjT_JkWxNJKwUb8mRbE0krBRl9IrqhVFtK44OkNr7MFmvi5Ih3nqbeE0kpS9WqXeUXG&_nc_ohc=j-brGMDGGH8Q7kNvwEMili3&_nc_oc=AdmFqn91d-CYJpkh5prApE0G23mForxztuQy_fDoEiZUud7OyYx5Akp33IJoTid3R1o&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=BgXiOt6vbwF1cLXRcbq9Jg&oh=00_AfK6zZPTsJeiDniRcHhBIghx8wxiZbXboIOx0hmWWl1gqA&oe=683B5F77"
            />
          </Tooltip>
          <Tooltip title="Alexander Hipp">
            <Avatar
              alt="Alexander Hipp"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Tooltip>
          <Tooltip title="Michael Dam">
            <Avatar
              alt="Michael Dam"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Tooltip>
          <Tooltip title="Alex Suprun">
            <Avatar
              alt="Alex Suprun"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Tooltip>
          <Tooltip title="A. C.">
            <Avatar
              alt="A. C."
              src="https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Tooltip>
          <Tooltip title="Vicky Hladynets">
            <Avatar
              alt="Vicky Hladynets"
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Tooltip>
          <Tooltip title="charlesdeluvio">
            <Avatar
              alt="charlesdeluvio"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Tooltip>
          <Tooltip title="La Đại Lộc">
            <Avatar
              alt="La Dai Loc"
              src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/482005191_1317184785997582_2477304933580895668_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFKh8qI0-EqypY7-sLLZjjT_JkWxNJKwUb8mRbE0krBRl9IrqhVFtK44OkNr7MFmvi5Ih3nqbeE0kpS9WqXeUXG&_nc_ohc=j-brGMDGGH8Q7kNvwEMili3&_nc_oc=AdmFqn91d-CYJpkh5prApE0G23mForxztuQy_fDoEiZUud7OyYx5Akp33IJoTid3R1o&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=BgXiOt6vbwF1cLXRcbq9Jg&oh=00_AfK6zZPTsJeiDniRcHhBIghx8wxiZbXboIOx0hmWWl1gqA&oe=683B5F77"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
