import { useState } from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const Profiles = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? "basic-menu-profiles" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="La Dai Loc"
            src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/482005191_1317184785997582_2477304933580895668_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFKh8qI0-EqypY7-sLLZjjT_JkWxNJKwUb8mRbE0krBRl9IrqhVFtK44OkNr7MFmvi5Ih3nqbeE0kpS9WqXeUXG&_nc_ohc=j-brGMDGGH8Q7kNvwEMili3&_nc_oc=AdmFqn91d-CYJpkh5prApE0G23mForxztuQy_fDoEiZUud7OyYx5Akp33IJoTid3R1o&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=BgXiOt6vbwF1cLXRcbq9Jg&oh=00_AfK6zZPTsJeiDniRcHhBIghx8wxiZbXboIOx0hmWWl1gqA&oe=683B5F77"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profiles",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: "28px", height: "28px", mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: "28px", height: "28px", mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profiles;
