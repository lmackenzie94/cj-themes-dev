export const breakpoints = [`500px`, `768px`, `1024px`, `1368px`, `1920px`];

const theme = {
  colors: {
    text: 'black',
    background: 'tomato'
  },
  fonts: {
    heading: 'Larish',
    body: 'Calibre',
    title: 'Druk'
  },
  styles: {
    // this styles our header component, which we imported from 'theme-ui'
    Header: {
      backgroundColor: 'text',
      color: 'background',
      padding: 10
    },
    // by default, this won't be available in global css (use Styled.h1 from theme-ui)
    h1: {
      fontFamily: 'heading'
    }
  }
};

export default theme;
