/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { withTheme } from 'emotion-theming';
// import Img from 'components/Img';
import PropTypes, { number } from 'prop-types';
import Break from 'components/Break';

// static elements
import {
  Box,
  Button,
  Heading,
  Section,
  Container,
  Row,
  Column,
  Text
} from 'system';

// motion elements
// import {
//   Heading as MotionHeading,
//   Button as MotionButton
// } from 'system/motion';

// spring elements
// import {
//   Heading as AnimatedHeading,
//   Button as AnimatedButton
// } from 'system/animated';

import { useSpring } from 'react-spring';
import { withGlobal } from 'global';

function ImageBlock({ id, images }) {
  const numberOfImages = images.length;

  let flexValues;
  switch (numberOfImages) {
    case 4:
      flexValues = [`100%`, `100%`, `100%`, `1 0 50%`];
      break;
    case 3:
      flexValues = [`100%`, `100%`, `100%`, `auto`];
      break;
    default:
      flexValues = [`100%`, `100%`, `auto`];
      break;
  }

  return (
    <Section>
      <Container>
        <Break sxProps={{ mt: 0 }}>{`Image(s) Block`}</Break>
        <Row
          sx={{
            display: `flex`,
            justifyContent: `center`,
            flexWrap: `wrap`
          }}
        >
          {images.map(image => (
            <Column
              key={image.id}
              sx={{
                flex: flexValues
              }}
            >
              {/* <Img
                key={image.id}
                {...image}
                alt={image.alt || image.title || image.id}
              /> */}
            </Column>
          ))}
        </Row>
      </Container>
    </Section>
  );
}

export default withTheme(withGlobal(ImageBlock));
