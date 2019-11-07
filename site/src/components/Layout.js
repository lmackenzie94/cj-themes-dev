/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from 'react';
import Helmet from 'react-helmet';
import { Global, css } from '@emotion/core';
import { motion } from 'framer-motion';
import { withTheme } from 'emotion-theming';
// import NetworkDetectorWithTheme from 'utils/networkDetectorWithTheme';

// css to be injected into global styles
import minireset from '!!raw-loader!css/minireset.css';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { GlobalContext } from 'global';

function Layout({ location, children, theme, data }) {
  if (typeof window !== `undefined`) {
    // useSmoothScroll();
  }

  const currentPage = useRef(location.pathname);
  const [first, setFirst] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const [page, setPage] = useState(children);

  const { usePageReady } = useContext(GlobalContext);
  const [pageReady, setPageReady] = usePageReady(state => [
    state.ready,
    state.actions.set
  ]);

  const onTransitionComplete = useCallback(() => {
    if (transitioning === true) {
      setPage(children);
      currentPage.current = location.pathname;
      window.scroll({ top: 0 });
    }
  });

  useEffect(() => {
    if (pageReady) {
      setTransitioning(false);
    }
  }, [pageReady]);

  useEffect(() => {
    if (first) {
      setFirst(false);
      // setTransitioning(false);
    } else {
      if (currentPage.current !== location.pathname) {
        setPageReady(false);
        setTransitioning(true);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      process.env.NODE_ENV === `development` &&
      transitioning === false &&
      currentPage.current === location.pathname
    ) {
      setPage(children);
    }
  }, [data, children, location.pathname, transitioning]);

  return (
    <React.Fragment>
      <Helmet />
      <Global
        styles={css`
          ${minireset}
          html, body {
            width: 100%;
          }
          body {
            will-change: background-color;
            transition: background-color 0.2s ease-out;
            overflow-x: hidden;
            overflow-y: scroll;
          }

          ::-webkit-scrollbar {
            width: 0.75rem;
          }

          ::-webkit-scrollbar-track {
            box-shadow: inset 1px 0 0px rgba(0, 0, 0, 0.1);
            background-color: ${theme.colors.greyLine};
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${theme.colors.primary};
          }

          & * {
            ::selection {
              background: ${theme.colors.faded};
            }
          }

          #___gatsby > div {
            display: flex;
            flex-direction: column;
            min-height: 100vh;

            & main {
              flex: 1 1 auto;
            }
          }
        `}
      />
      {/* <NetworkDetectorWithTheme /> */}
      <Header />
      <main sx={{ position: `relative`, width: `100%`, mb: [30, 40, 50] }}>
        {page}
      </main>
      <Footer />
      <motion.figure
        initial={`in`}
        variants={theme.pageTransitionVariants}
        animate={transitioning ? `in` : `out`}
        onAnimationComplete={onTransitionComplete}
        sx={{
          backfaceVisibility: `hidden`,
          position: `fixed`,
          top: 0,
          left: 0,
          width: `100%`,
          height: `100vh`,
          bg: `primary`,
          zIndex: 1000
        }}
      />
    </React.Fragment>
  );
}

export default withTheme(Layout);
