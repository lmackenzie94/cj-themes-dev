/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Section, Container, Heading } from 'system';
import { withGlobal } from 'global';
import { graphql } from 'gatsby';

//blocks & components
import ImageWithTextBlock from 'blocks/ImageWithTextBlock';
import ImageBlock from 'blocks/ImageBlock';
// import ComboBox from 'components/ComboBox';
import Break from 'components/Break';
// import Modal from 'components/Modal';

function renderBlock(block) {
  const { apiKey } = block.model;
  const { id } = block;

  if (!block) {
    return null;
  }
  let BlockComponent = null;
  let extras = {};
  switch (apiKey) {
    case 'image_with_text_block':
      BlockComponent = ImageWithTextBlock;
      const { reverse, centerAlign } = block;
      extras = { reverse, centerAlign };
      break;
    case 'image_block':
      BlockComponent = ImageBlock;
      break;
    default:
      break;
  }
  if (!BlockComponent) {
    return null;
  }
  return <BlockComponent key={id} id={id} {...block} {...extras} />;
}

function Components({ usePageReady, data }) {
  const { blocks } = data.page;

  console.log(process.env.NODE_ENV);

  const setPageReady = usePageReady(state => state.actions.set);
  setPageReady(true);
  return (
    <React.Fragment>
      <Section
        as={`header`}
        variant={`header`}
        sx={{
          bg: `faded`,
          borderBottom: `1px solid`,
          borderColor: `divider`,
          willChange: `border-color`,
          transition: `border-color 0.2s ease-out`
        }}
      >
        <Container>
          <Heading as={`h1`} variant={`title`}>
            Components
          </Heading>
        </Container>
      </Section>
      {blocks.map(block => renderBlock(block))}
      <Section>
        <Container>
          <Break sxProps={{ mt: 0 }}>{`ComboBox`}</Break>
          {/* <ComboBox /> */}
        </Container>
      </Section>
      <Section>
        <Container>
          <Break sxProps={{ mt: 0 }}>{`Modal`}</Break>
          {/* <Modal /> */}
        </Container>
      </Section>
    </React.Fragment>
  );
}

export default withGlobal(Components);

export const query = graphql`
  {
    page: datoCmsPage {
      id
      blocks {
        ... on DatoCmsImageWithTextBlock {
          id
          reverse
          centerAlign
          model {
            apiKey
          }
          image {
            id
            alt
            title
            url
            fluid(
              maxWidth: 600
              imgixParams: { auto: "compress, format", q: 75 }
            ) {
              ...GatsbyDatoCmsFluid_noBase64
            }
          }
          textNode {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on DatoCmsImageBlock {
          id
          model {
            apiKey
          }
          images {
            id
            alt
            title
            url
            fluid(
              maxWidth: 600
              imgixParams: { auto: "compress, format", q: 75 }
            ) {
              ...GatsbyDatoCmsFluid_noBase64
            }
          }
        }
      }
    }
  }
`;
