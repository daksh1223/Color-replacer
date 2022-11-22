function toHex(color) {
  switch (color) {
    case "Gray":
      return "#808080";
    case "Purple":
      return "#A020F0";
    case "Blue":
      return "#0000FF";
    case "Green":
      return "#00FF00";
    case "Yellow":
      return "#FFFF00";
    case "Orange":
      return "#FF7F00";
    case "Red":
      return "#FF0000";
    case "Black":
      return "#000000";
    case "White":
      return "#FFFFFF";
  }
}
export default toHex;
