/**
 * Given a color, return the complementary color.
 */
export const complementaryColor = (color) => {
    const hexColor = color.replace('#', '0x');
  
    return `#${('000000' + (('0xffffff' ^ hexColor).toString(16))).slice(-6)}`;
  };