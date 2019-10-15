// this is shadowing 'index.js' from 'cj-theme'
import merge from 'lodash.merge';
import baseTheme from '@campj/theme/src/gatsby-plugin-theme-ui/index.js';

export default merge({}, baseTheme, {
  colors: {
    background: 'cornflowerblue',
    primary: '#bada55'
  }
});

// using lodash.merge prevents us from having to do:
// export default {
//     ...baseTheme,
//     colors: {
//         ...baseTheme.colors,
//         background: 'cornflowerblue'
//     }
// }
