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
