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
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  // closestCenter,
  pointerWithin,
  // rectIntersection,
  getFirstCollision,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

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

  // Cùng 1 thời điểm chỉ có thể kéo thả 1 item
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null);

  // Điểm va chạm cuối cùng (xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // Tìm column chứa cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((col) =>
      col.cards.some((card) => card._id === cardId)
    );
  };

  // Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBeetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // Tìm vị trí index của overCard trong column đích (nơi card sắp được kéo thả vào)
      const overCardIndex = overColumn?.cards.findIndex(
        (card) => card._id === overCardId
      );

      // Logic tính toán cho card index mới (trên hoặc dưới overCard) lấy chuẩn ra từ code thư viện
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // Clone mảng orderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật lại orderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      // Column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Thêm placeholder card nếu column rỗng: bị kéo hết card đi, không còn card nào
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        // Cập nhật lại cardOrderIds của column active (cũ) sau khi xóa card
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      // Column đích (overColumn)
      if (nextOverColumn) {
        // Kiểm tra xem card đã tồn tại trong column đích (overColumn) chưa, nếu có thì cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id, // Cập nhật lại columnId của card đang kéo thả
        };

        // Tiếp theo là thêm card vào vị trí mới trong column đích (overColumn)
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        // Nếu column đích tồn tại placeholder card thì cần xóa nó đi
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        // Cập nhật lại cardOrderIds của column active (cũ) sau khi xóa card
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  };

  // Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    // console.log("Drag started:", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    // Nếu là kéo thả card thì cần lưu lại column cũ để xử lý khi kéo thả xong
    if (event?.active?.data?.current?.columnId) {
      setOldColumnDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  // Trigger trong quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    // Không làm gì nếu đang kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    // console.log("Drag over:", event);

    // Còn nếu kéo card thì xử lý thêm để có thể kéo thả card vào column khác
    const { active, over } = event;

    // Cần đảm bảo nếu không tồn tại active hoặc over khi kéo ra khỏi phạm vi container thì không làm gì cả
    // Điều này sẽ tránh lỗi khi kéo thả ra ngoài vùng chứa
    if (!active || !over) return;

    // Lấy dữ liệu của phần tử đang kéo (active)
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;

    // Lấy dữ liệu của phần tử đang được kéo qua (over : là card đang tương tác trên hoặc dưới so với active)
    const { id: overCardId } = over;

    // Tìm 2 cái columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    // Nếu không tìm thấy column nào thì không làm gì cả, tránh crash trang
    if (!activeColumn || !overColumn) return;

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo
    // Vì đây đang là đoạn xử lý lúc kéo handleDragOver, còn nếu kéo thả xong thì sẽ xử lý ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBeetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  // Trigger khi kết thúc kéo 1 phần tử
  const handleDragEnd = (event) => {
    // console.log("Drag ended:", event);
    const { active, over } = event;

    // Cần đảm bảo nếu không tồn tại active hoặc over khi kéo ra khỏi phạm vi container thì không làm gì cả
    // Điều này sẽ tránh lỗi khi kéo thả ra ngoài vùng chứa
    if (!active || !over) return;

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // Lấy dữ liệu của phần tử đang kéo (active)
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;

      // Lấy dữ liệu của phần tử đang được kéo qua (over : là card đang tương tác trên hoặc dưới so với active)
      const { id: overCardId } = over;

      // Tìm 2 cái columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      // Nếu không tìm thấy column nào thì không làm gì cả, tránh crash trang
      if (!activeColumn || !overColumn) return;

      // Hành động kéo thả card giữa 2 column khác nhau
      // Phải dùng tới activeDragItemData.columnId hoặc oldColumnDraggingCard._id (set vào state khi bắt đầu kéo thả)
      // chứ không phải activeData trong scope handleDragEnd vì sau khi qua onDragOver thì activeData đã bị cập nhật lại một lần rồi
      if (oldColumnDraggingCard._id !== overColumn._id) {
        moveCardBeetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        // Hành động kéo thả card trong cùng 1 column
        // Lấy vị trí cũ từ oldColumnDraggingCard
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        // Lấy vị trí mới từ overColumn
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        // Dùng arrayMove để sắp xếp lại mảng cards trong column cũ
        const dndOrderedCards = arrayMove(
          oldColumnDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        // Cập nhật lại state orderedColumns sau khi kéo thả
        setOrderedColumns((prevColumns) => {
          // Clone mảng orderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật lại orderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns);

          // Tìm tới column mà chúng ta đang thả
          const targetColumn = nextColumns.find(
            (col) => col._id === overColumn._id
          );

          // Cập nhật lại cards và cardOrderIds của column đích (overColumn)
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    // Xử lý kéo thả column trong BoardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Kiểm tra xem active và over có khác nhau không
      if (active.id !== over.id) {
        // Lấy vị trí cũ từ active và vị trí mới từ over
        const oldColumnIndex = orderedColumns.findIndex(
          (col) => col._id === active.id
        );
        const newColumnIndex = orderedColumns.findIndex(
          (col) => col._id === over.id
        );

        // Dùng  arrayMove để sắp xếp lại mảng orderedColumns
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        // const dndOrderedColumnsIds = dndOrderedColumns.map((col) => col._id);
        // console.log("dndOrderedColumnsIds:", dndOrderedColumnsIds);

        // Cập nhật lại state orderedColumns sau khi kéo thả
        setOrderedColumns(dndOrderedColumns);
      }
    }

    // Cập nhật lại activeDragItemId, activeDragItemType và activeDragItemData về null sau khi kéo thả xong
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Trường hợp đang kéo thả column thì không cần xử lý gì cả, sẽ dùng closestCorners
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        // Nếu đang kéo thả column thì dùng closestCorners để xác định vị trí thả
        return closestCorners({ ...args });
      }

      // Tìm các điểm giao nhau, va chạm - intersection với con trỏ
      const pointerIntersections = pointerWithin(args);

      // Kéo một card có image cover và kéo lên phía trên cùng ra khỏi khu vực kéo thả
      if (!pointerIntersections.length) return;

      // Thuật toán phát hiện va chạm sẽ trả về mảng các va chạm ở đây
      // const intersections =
      //   pointerIntersections?.length > 0
      //     ? pointerIntersections
      //     : rectIntersection(args);

      // Tìm overId đầu tiên trong đám intersections ở trên
      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        //   // Nếu cái over là column thì sẽ tìm tới cái cardId gần nhất bên trong khu vực qua chạm đó dựa vào
        //   // thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Tuy nhiên closestCorners
        //   // sẽ chính xác hơn trong trường hợp này vì nó sẽ tìm tới card gần nhất với
        const checkColumn = orderedColumns.find((col) => col._id === overId);
        if (checkColumn) {
          // console.log("overId before:", overId);
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
          // console.log("overId after:", overId);
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      // Nếu overId không tồn tại thì trả về mảng rỗng - tránh bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      // nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: theme.palette.mode === "light" ? "#0066CC" : "#34495e",
          width: "100%",
          height: theme.trello.boardContentHeight,
          padding: "10px 0",
        }}
      >
        <ListColumns theme={theme} columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} theme={theme} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
