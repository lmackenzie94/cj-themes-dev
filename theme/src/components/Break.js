/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Heading, Box } from 'system';
function Break({ children, sxProps }) {
  return (
    <React.Fragment>
      <Heading as={`h3`} variant={`subtitle`}>
        {children}
      </Heading>
      <Box
        as={`figure`}
        width={1}
        height={`1px`}
        sx={{
          willChange: `background-color`,
          transition: `background-color 0.2s ease-out`,
          bg: `text`,
          mb: [`5px`, `10px`, `20px`],
          ...sxProps
        }}
      />
    </React.Fragment>
  );
}

export default Break;
