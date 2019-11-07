import { darken, lighten } from 'polished';
import { title, subtitle, h1, h2, h3, h4, h5, h6, content } from './typography';
import defaultSection, { header, small, tiny, nav } from './section';
import defaultButton, {
  icon as iconButton,
  dropdown as dropdownButton
} from './buttons';
import { easeInQuad, easeOutQuad } from '@campj/utils/easing';

export const breakpoints = [`500px`, `768px`, `1024px`, `1368px`, `1920px`];
const pageTransitionVariants = {
  in: {
    visibility: `visible`,
    x: 0,
    transition: {
      type: `tween`,
      duration: 0.4,
      ease: easeOutQuad
    }
  },
  out: {
    x: `100%`,
    transition: {
      type: `tween`,
      duration: 0.4,
      ease: easeInQuad
    },
    transitionEnd: {
      visibility: `hidden`,
      x: `-100%`
    }
  }
};
// base colors
const colors = {
  black: `#444444`,
  white: `#ffffff`,
  grey: `#ECECEC`,
  greyLine: `#E6E6E6`,
  red: `#ed8270`,
  yellow: `#F6DF74`,
  blue: `#79B0CD`,
  green: `#C2D8C6`
};

const theme = {
  pageTransitionVariants,
  useCustomProperties: true,
  initialColorMode: `light`,
  breakpoints,
  fontSizes: [14, 16, 20, 24, 32, 48, 64, 72, 80, 92, 108, 120],
  colors: {
    ...colors,
    text: colors.black,
    background: colors.white,
    primary: colors.red,
    primaryDark: darken(0.5, colors.red),
    faded: darken(0.05, colors.white),
    divider: darken(0.1, colors.white),
    modes: {
      blue: {
        text: colors.black,
        background: colors.grey,
        primary: colors.blue,
        primaryDark: darken(0.5, colors.blue),
        faded: darken(0.05, colors.grey),
        divider: darken(0.1, colors.grey)
      },
      yellow: {
        text: colors.black,
        background: colors.yellow,
        primary: colors.red,
        primaryDark: darken(0.35, colors.yellow),
        faded: lighten(0.025, colors.yellow),
        divider: lighten(0.075, colors.yellow)
      },
      green: {
        text: colors.black,
        background: colors.green,
        primary: colors.black,
        primaryDark: darken(0.5, colors.green),
        faded: lighten(0.025, colors.green),
        divider: lighten(0.075, colors.green)
      }
    }
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    heading: `Larish`,
    body: `Calibre`,
    title: `Druk`
  },
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1,
    title: 1
  },
  text: {
    title,
    subtitle,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    content
  },
  buttons: {
    default: defaultButton,
    icon: iconButton,
    dropdown: dropdownButton
  },
  sections: {
    default: defaultSection,
    header,
    small,
    tiny,
    nav
  }
};

export default theme;
