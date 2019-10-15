/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';
import { Section, Container, Row, Column, Heading, Text, Button } from 'system';
import { withGlobal } from 'global';

function Index({ usePageReady }) {
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
            Camp Jefferson Theming (Testing)
          </Heading>
          <Text
            as={`article`}
            variant={`content`}
            sx={{
              fontFamily: `heading`,
              fontSize: [2, 3, 4],
              mt: [30, 40, 50]
            }}
            dangerouslySetInnerHTML={{
              __html: `Build landing pages or websites using <a href="https://gatsbyjs.org/">Gatsby</a> &amp; <a href="https://theme-ui.com/">Theme UI</a>.`
            }}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Row
            sx={{
              mb: [-30, -40, -50],
              '& > div': {
                display: `flex`,
                flexDirection: `column`,
                mb: [30, 40, 50]
              },
              '& article': { flex: `1 1 auto` },
              '& a': {
                flex: `none`,
                alignSelf: `flex-start`,
                mt: [20, 25, 30, 35, 50]
              }
            }}
          >
            {/* https://theme-ui.com */}
            <Column width={[1, 1 / 2, 1 / 2, 1 / 3]}>
              <Text
                as={`article`}
                variant={`content`}
                dangerouslySetInnerHTML={{
                  __html: `<h3>Typograhy</h3><p>Titles, headings (h1-h6) and content styling through variants.</p>`
                }}
              />
              <Button as={Link} to="/typography" title="Typography">
                Typography
              </Button>
            </Column>
            <Column width={[1, 1 / 2, 1 / 2, 1 / 3]}>
              <Text
                as={`article`}
                variant={`content`}
                dangerouslySetInnerHTML={{
                  __html: `<h3>Buttons</h3><p>Different button variants to be used throughout the project using Theme variants.</p>`
                }}
              />
              <Button as={Link} to="/buttons" title="Components">
                Buttons
              </Button>
            </Column>
            <Column width={[1, 1 / 2, 1 / 2, 1 / 3]}>
              <Text
                as={`article`}
                variant={`content`}
                dangerouslySetInnerHTML={{
                  __html: `<h3>Components</h3><p>A library of components to use in any project.</p>`
                }}
              />
              <Button as={Link} to="/components" title="Components">
                Components
              </Button>
            </Column>
          </Row>
        </Container>
      </Section>
    </React.Fragment>
  );
}

export default withGlobal(Index);
