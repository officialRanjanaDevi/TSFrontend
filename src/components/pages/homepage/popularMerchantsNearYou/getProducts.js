const img_fashion = "/images/img_fashion.jpeg";
const img_electronic = "/images/img_electronic.png";
const img_jewellery = "/images/img_jewellery.png";
const img_furniture = "/images/img_furniture.png";

export function getProducts(
  activeTab,
  popular_fashion,
  popular_furniture,
  popular_electronics,
  popular_jewellery
) {
  switch (activeTab) {
    case "fashion":
      return popular_fashion;
    case "jewellery":
      return popular_jewellery;
    case "electronics":
      return popular_electronics;
    case "furniture":
      return popular_furniture;
    default:
      return [];
  }
}
