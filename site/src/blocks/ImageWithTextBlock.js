/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { withTheme } from 'emotion-theming';
// import Img from 'components/Img';
import PropTypes from 'prop-types';
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

// // motion elements
// import {
//   Heading as MotionHeading,
//   Button as MotionButton
// } from 'system/motion';

// // spring elements
// import {
//   Heading as AnimatedHeading,
//   Button as AnimatedButton
// } from 'system/animated';

import { useSpring } from 'react-spring';
import { withGlobal } from 'global';

function ImageWithTextBlock({ id, image, textNode, reverse, centerAlign }) {
  return (
    <Section>
      <Container>
        <Break sxProps={{ mt: 0 }}>{`Image With Text Block`}</Break>
        <Row
          sx={{
            display: `flex`,
            flexDirection: reverse ? `row-reverse` : `row`
          }}
        >
          <Column
            width={[1, 1, 1 / 2]}
            sx={{
              display: `flex`,
              flexDirection: `column`,
              justifyContent: centerAlign ? `center` : `flex-start`,
              order: [-1, -1, 0]
            }}
          >
            <Text
              variant={`content`}
              dangerouslySetInnerHTML={{
                __html: textNode.childMarkdownRemark.html
              }}
            />
          </Column>
          <Column width={[1, 1, 1 / 2]}>
            {/* <Img {...image} alt={image.alt || image.title || image.id} /> */}
          </Column>
        </Row>
      </Container>
    </Section>
  );
}

export default withTheme(withGlobal(ImageWithTextBlock));
