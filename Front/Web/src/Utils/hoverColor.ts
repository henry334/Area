
type color = {
    r: number;
    g: number;
    b: number;
};

const hexToRgb = (hex: string) => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
};

const darkenRgb = ({ r, g, b }: color, factor = 0.1) => {
    // Darken each color channel
    r = Math.round(r * (1 - factor));
    g = Math.round(g * (1 - factor));
    b = Math.round(b * (1 - factor));

    return { r, g, b };
};

const rgbToHex = ({ r, g, b }: color) => {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
};

const hoverColor = (hex: string, factor = 0.1) => {
    const rgb = hexToRgb(hex);
    const darkened = darkenRgb(rgb, factor);
    return rgbToHex(darkened);
}


export default hoverColor;