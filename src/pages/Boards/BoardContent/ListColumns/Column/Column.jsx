import { useState } from "react";
import Box from "@mui/material/Box";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({ theme, column }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: { ...column },
  });

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn là 100% để tránh lỗi khi kéo thả 1 column ngắn và 1 column dài.
    // Lúc này phải kết hợp {...listeners} nằm ở Box chứ không phải div vùng ngoài để tránh trường hợp kéo vào vùng màu xanh
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");

  // Phải bọc div ngoài vì vấn đề chiều cao của column khi kéo thả sẽ có bug flickering
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: theme.palette.mode === "light" ? "#ebecf0" : "#333643",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
            5
          )})`,
        }}
      >
        {/* Column Header */}
        <Box
          sx={{
            height: theme.trello.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: "text.primary",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* List card*/}
        <ListCards cards={orderedCards} theme={theme} />

        {/* Column Footer */}
        <Box
          sx={{
            height: theme.trello.columnFooterHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default Column;
