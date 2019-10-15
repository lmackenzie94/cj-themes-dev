/** @jsx jsx */
import { Styled, jsx } from 'theme-ui';
import React from 'react';
import { breakpoints } from 'theme';

function parseWidthOrHeightValue(val) {
  return isNaN(val) ? val : val <= 1 ? `${val * 100}%` : val;
}

function getWidthOrHeightValue(val) {
  if (Array.isArray(val)) {
    return val.map(v => parseWidthOrHeightValue(v));
  } else {
    return parseWidthOrHeightValue(val);
  }
}

function checkForHeading(variantName) {
  const hasHeading = variantName.search(/h[1-6]/g);
  return hasHeading >= 0;
}

export const Box = React.forwardRef(
  ({ width = 1, height = `auto`, sx, ...props }, forwardedRef) => {
    return (
      <Styled.div
        {...props}
        ref={forwardedRef}
        sx={{
          position: `relative`,
          display: `inline-block`,
          width: getWidthOrHeightValue(width),
          height: getWidthOrHeightValue(height),
          ...sx
        }}
      />
    );
  }
);

export const Flex = React.forwardRef(
  ({ width, height, sx, ...props }, forwardedRef) => (
    <Styled.div
      {...props}
      ref={forwardedRef}
      sx={{ position: `relative`, display: `flex`, ...sx }}
    />
  )
);

export const Text = React.forwardRef(
  ({ as = `span`, variant = null, ...props }, forwardedRef) => (
    <Styled.div
      {...props}
      as={as}
      ref={forwardedRef}
      sx={{
        position: `relative`,
        display: `inline-block`,
        fontFamily: `body`,
        fontWeight: `body`,
        fontSize: [0, 1, 2],
        variant: `text.${variant}`
      }}
    />
  )
);

export const Heading = React.forwardRef(
  ({ as = `h2`, variant = null, ...props }, forwardedRef) => {
    let variantName = variant
      ? variant.indexOf('.') >= 0
        ? variant
        : `text.${variant}`
      : checkForHeading(as)
      ? `text.${as}`
      : null;

    return (
      <Styled.h2
        {...props}
        as={as}
        ref={forwardedRef}
        sx={{
          position: `relative`,
          display: `block`,
          fontFamily: `heading`,
          lineHeight: `heading`,
          fontSize: [0, 1, 2],
          mb: `0.175em`,
          variant: variantName
        }}
      />
    );
  }
);

export const Button = React.forwardRef(
  ({ disabled = false, variant = `default`, sx, ...props }, forwardedRef) => (
    <Styled.div
      as={`button`}
      {...props}
      ref={forwardedRef}
      sx={{
        position: `relative`,
        cursor: disabled ? `default` : `pointer`,
        variant: `buttons.${variant}`,
        ...sx
      }}
    />
  )
);

// layout

export const Section = React.forwardRef(
  ({ disabled = false, variant = `default`, sx, ...props }, forwardedRef) => (
    <Styled.div
      as={`section`}
      {...props}
      ref={forwardedRef}
      sx={{
        variant: `sections.${variant}`,
        ...sx
      }}
    />
  )
);

export const Container = React.forwardRef(
  ({ disabled = false, sx, ...props }, forwardedRef) => (
    <Styled.div
      {...props}
      ref={forwardedRef}
      sx={{
        position: `relative`,
        width: `100%`,
        maxWidth: breakpoints,
        m: `0 auto`,
        px: [0, 0, 62, 84, 240],
        ...sx
      }}
    />
  )
);

export const Row = React.forwardRef(({ sx, ...props }, forwardedRef) => (
  <Styled.div
    {...props}
    ref={forwardedRef}
    sx={{
      position: `relative`,
      display: `flex`,
      flexWrap: `wrap`,
      mx: [-1, -2, -3, -4, -5],
      my: [-1, -2, -3, -4, -5],
      ...sx
    }}
  />
));

export const Column = React.forwardRef(
  ({ sx, width = undefined, ...props }, forwardedRef) => (
    <Styled.div
      {...props}
      ref={forwardedRef}
      sx={{
        position: `relative`,
        display: `block`,
        width: width === undefined ? `auto` : getWidthOrHeightValue(width),
        flex: width === undefined ? `1 1 auto` : `none`,
        px: [1, 2, 3, 4, 5],
        py: [1, 2, 3, 4, 5],
        ...sx
      }}
    />
  )
);
