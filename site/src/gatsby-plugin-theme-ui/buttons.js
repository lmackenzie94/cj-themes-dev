export default {
  display: 'inline-block',
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: [0, 1, 2],
  px: [10, 20, 30],
  py: [`4px`, `6px`, `8px`],
  border: 'none',
  borderRadius: 4,
  backgroundColor: 'text',
  color: 'white',
  willChange: 'color background-color',
  transitionProperty: 'color, background-color',
  transition: ' 0.2s ease-in',
  textDecoration: `none`,
  ':hover, :focus': {
    outline: 'none',
    transition: '0.2s ease-out',
    backgroundColor: 'primary',
  },
};

export const icon = {
  color: 'primary',
  width: 40,
  height: 40,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'body',
  fontWeight: 'body',
  p: 0,
  border: 'none',
  borderRadius: 0,
  backgroundColor: 'transparent',
  fontSize: [2],
  '& span': {
    color: 'text',
  },
  ':hover, :focus': {
    outline: 'none',
  },
};

export const dropdown = {
  color: 'primary',
  height: '100%',
  // position: 'absolute',
  border: 'none',
  outline: 'none',
  background: 'none',
  p: 0,
  right: `5px`,
  top: `0`,
};
