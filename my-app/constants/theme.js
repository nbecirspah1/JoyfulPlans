const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  lightBlue: "#A2DFFF",
  mintGreen: "#B2FAB4",
  lightPink: "#F7CAC9",
  teal: "#1ABC9C",
  lavander: "#d0e051",
  paleGreen: "#E3F1E3"
  
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

// const SIZES = {
//   xSmall: 10,
//   small: 12,
//   medium: 16,
//   large: 20,
//   xLarge: 24,
//   xxLarge: 32,
// };

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  body1: 32,
  body2: 24,
  body3: 16,
  body4: 14,
  body5: 12,

  // App dimensions
  width: 375,
  height: 812,
};

export default SIZES;

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
