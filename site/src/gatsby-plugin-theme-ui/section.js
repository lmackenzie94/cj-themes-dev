const section = {
  display: `block`,
  width: `100%`,
  px: [20, 30, 40],
  willChange: `background-color`,
  transition: `background-color 0.2s ease-out`,
};

export default {
  ...section,
  py: [40, 60, 80],
};

export const header = {
  ...section,
  pt: [80, 100, 120],
  pb: [40, 60, 80],
};

export const small = {
  ...section,
  py: [20, 30, 40],
};

export const tiny = {
  ...section,
  py: 20,
};

export const nav = {
  ...section,
  py: [10, 15],
};
