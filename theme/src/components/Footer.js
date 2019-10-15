/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Section, Container, Text } from 'system';
function Footer() {
  return (
    <Section
      variant={`tiny`}
      sx={{ borderTop: `1px solid`, borderColor: `divider`, bg: `faded` }}
    >
      <Container>
        <Text
          dangerouslySetInnerHTML={{ __html: `&copy; 2019 Camp Jefferson` }}
        />
      </Container>
    </Section>
  );
}

export default Footer;
