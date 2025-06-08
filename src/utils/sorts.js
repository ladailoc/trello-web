/**
 * Created by La Dai Loc's author on 2025-06-07.
 * Updated by La Dai Loc's author on 2025-06-07.
 * ---
 * Sắp xếp originalArray theo thứ tự của orderArray dựa trên key, sử dụng Map để tăng hiệu năng.
 *
 * @param {Array} originalArray - Mảng cần sắp xếp.
 * @param {Array} orderArray - Mảng chứa thứ tự ID mong muốn.
 * @param {string} key - Tên thuộc tính dùng để đối chiếu trong originalArray.
 * @returns {Array} - Mảng đã được sắp xếp.
 */

export const mapOrder = (originalArray, orderArray, key) => {
  if (!Array.isArray(originalArray) || !Array.isArray(orderArray) || !key)
    return [];

  // Tạo Map lưu vị trí của từng key trong orderArray
  const orderMap = new Map(orderArray.map((id, index) => [id, index]));

  return [...originalArray].sort((a, b) => {
    const aOrder = orderMap.has(a[key])
      ? orderMap.get(a[key])
      : Number.MAX_SAFE_INTEGER;
    const bOrder = orderMap.has(b[key])
      ? orderMap.get(b[key])
      : Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });
};
