import { scale } from './index';

const FontBaseValue = scale(18);

export const Theme = {
  colors: {
    gray26:"#262626",
    gray42:"#424242",
    gray63:'#636363',
    gray74:"#747474",
    bcground: '#2B2B2B',
    yellow: '#FCB415',
    green:"#4caf50",
    checkboxGray:'#373737'
  },
  fonts: {
    sizes: {
      h1:scale(28),
      h2: scale(26),
      h3: scale(24),
      h4: scale(22),
      h5: scale(20),
      h6: scale(18),
      p6: scale(16),
      p5: scale(15),
      p4: scale(14),
      p3: scale(12),
      p2: scale(11),
      p1: scale(10),
      base: FontBaseValue,
      small: FontBaseValue * 0.8,
      medium: FontBaseValue,
      large: FontBaseValue * 1.2,
      xlarge: FontBaseValue / 0.75,
      xxlarge: FontBaseValue * 1.6,
    },
    lineHeights: {
      medium: 18,
      big: 24,
    },
  },
};