import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const BoardContent = ({ theme, board }) => {
  // Sử dụng PointerSensor để hỗ trợ kéo thả bằng chuột và cảm ứng
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10, // Khoảng cách di chuyển tối thiểu để kích hoạt kéo thả
  //   },
  // });
  // Yêu cầu di chuyển 10px sẽ kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Khoảng cách di chuyển tối thiểu để kích hoạt kéo thả
    },
  });

  // Nhấn giữ 250ms trên thiết bị cảm ứng để kích hoạt kéo thả
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  // Ưu tiên sử dụng mouseSensor và touchSensor để hỗ trợ kéo thả trên cả thiết bị chuột và cảm ứng, không bị bug
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    // console.log("Drag ended:", event);
    const { active, over } = event;

    if (!over) return;

    // Kiểm tra xem active và over có khác nhau không
    if (active.id !== over.id) {
      // Lấy vị trí cũ từ active và vị trí mới từ over
      const oldIndex = orderedColumns.findIndex((col) => col._id === active.id);
      const newIndex = orderedColumns.findIndex((col) => col._id === over.id);

      // Dùng  arrayMove để sắp xếp lại mảng orderedColumns
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map((col) => col._id);
      // console.log("dndOrderedColumnsIds:", dndOrderedColumnsIds);

      // Cập nhật lại state orderedColumns sau khi kéo thả
      setOrderedColumns(dndOrderedColumns);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: theme.palette.mode === "light" ? "#0066CC" : "#34495e",
          width: "100%",
          height: theme.trello.boardContentHeight,
          padding: "10px 0",
        }}
      >
        <ListColumns theme={theme} columns={orderedColumns} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
