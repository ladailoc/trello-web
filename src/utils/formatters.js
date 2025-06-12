/**
 * Created by La Dai Loc's author on 2025-06-07.
 * Updated by La Dai Loc's author on 2025-06-07.
 * ---
 * Viết hoa chữ cái đầu tiên của chuỗi đầu vào.
 *
 * @param {string} val - Chuỗi cần xử lý.
 * @returns {string} - Chuỗi với chữ cái đầu viết hoa.
 */
export const capitalizeFirstLetter = (val = "") => {
  if (typeof val !== "string" || val.length === 0) return "";
  return val[0].toUpperCase() + val.slice(1);
};

/**
 * Created by La Dai Loc's author on 2025-06-13.
 * Updated by La Dai Loc's author on 2025-06-13.
 * ---
 * Tạo một card giữ chỗ (placeholder) để sử dụng khi kéo thả.
 *
 * @param {object} column - Đối tượng column chứa thông tin như _id và boardId.
 * @returns {object} - Đối tượng card giữ chỗ với thuộc tính đặc biệt FE_PlaceholderCard.
 */
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true, // Đánh dấu đây là card placeholder
  };
};
