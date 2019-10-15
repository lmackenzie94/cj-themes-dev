// base text
import button from 'theme/buttons';
const _title = {
  fontFamily: 'title',
  fontWeight: 'bold',
  lineHeight: 'heading',
  letterSpacing: 'heading',
  willChange: `color`,
  transition: `color 0.2s ease-out`,
  textTransform: `uppercase`,
};

const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  letterSpacing: 'heading',
  mt: `0.5em`,
  mb: `1em`,
  willChange: `color`,
  transition: `color 0.2s ease-out`,
  ':first-of-type': {
    mt: 0,
  },
  ':last-child': {
    mb: 0,
  },
};

export const title = {
  ..._title,
  fontSize: [9, 10, 11],
};
export const subtitle = {
  ...heading,
  fontSize: [2, 3, 4],
};
export const h1 = {
  ...heading,
  fontSize: [5, 6, 7],
};
export const h2 = {
  ...heading,
  fontSize: [4, 5, 6],
};
export const h3 = {
  ...heading,
  fontSize: [3, 4, 5],
};
export const h4 = {
  ...heading,
  fontSize: [2, 3, 4],
};
export const h5 = {
  ...heading,
  fontFamily: 'body',
  fontWeight: 'bold',
  lineHeight: 'body',
  letterSpacing: 'body',
  fontSize: [1, 2, 3],
};
export const h6 = {
  ...heading,
  fontFamily: 'body',
  fontWeight: 'body',
  lineHeight: 'body',
  letterSpacing: 'body',
  fontSize: [0, 1, 2],
};

export const content = {
  fontFamily: 'body',
  fontWeight: 'body',
  lineHeight: 'body',
  letterSpacing: 'body',
  fontSize: 1,
  '& h1': h1,
  '& h2': h2,
  '& h3': h3,
  '& h4': h4,
  '& h5': h5,
  '& h6': h6,
  '& p, & ul, & ol, & blockquote': {
    display: 'inline-block',
    mb: '1em',
  },
  '& a': {
    color: 'primary',
    textDecoration: 'none',
    ':hover, :focus': {
      textDecoration: 'underline',
    },
  },
  '& ul, & ol': {
    ml: [17],
    width: '100%',
  },
  '& ul': {
    listStyle: 'disc',
  },
  '& ol': {
    listStyle: 'decimal',
    textIndent: '5px',
  },
  '& blockquote': {
    py: 20,
    px: 30,
    backgroundColor: 'faded',
    borderLeft: '5px solid',
    borderColor: 'primary',
  },
  '& *:first-of-type': {
    mt: 0,
  },
  '& *:last-child': {
    mb: 0,
  },
  '& a.btn': { textDecoration: 'none', ...button },
};
