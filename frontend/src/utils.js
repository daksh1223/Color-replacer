function toHex(color) {
    switch (color) {
        case 'Violet': return "#9400D3";
        case 'Indigo': return "#4B0082";
        case 'Blue': return "#0000FF";
        case 'Green': return "#00FF00";
        case 'Yellow': return "#FFFF00";
        case 'Orange': return "#FF7F00";
        case 'Red': return "#FF0000";
        case 'Black': return "#000000";
        case 'White': return "#FFFFFF";
    }
}
export default toHex;