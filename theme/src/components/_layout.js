/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout as DefaultLayout,
  Header,
  Footer,
  Main,
  Container
} from 'theme-ui';
import { Global } from '@emotion/core';

const Layout = ({ children }) => (
  <DefaultLayout sx={{ bg: 'background', color: 'text', fontFamily: 'body' }}>
    <Global styles={{ body: { margin: 0 } }} />
    <Header>
      <span>HEADER</span>
    </Header>
    <Main>
      <Container>
        <Styled.h1>Camp Jefferson Theming</Styled.h1>
        {children}
      </Container>
    </Main>
    <Footer>
      <span>Footer</span>
    </Footer>
  </DefaultLayout>
);

export default Layout;
