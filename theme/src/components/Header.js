/** @jsx jsx */
import { jsx } from 'theme-ui';

import { useColorMode } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircle } from '@fortawesome/pro-solid-svg-icons/faCircle';
// import { faCircle as faCircleOutline } from '@fortawesome/pro-regular-svg-icons/faCircle';
import theme from 'theme';
import { Section, Container, Flex, Button } from 'system';
import Tent from 'components/icons/Tent';

function Header() {
  const currentColor = React.useRef(0);
  const [colorMode, setColorMode] = useColorMode();

  const modes = React.useMemo(() => {
    let keys = Object.keys(theme.colors.modes);
    keys.unshift(theme.initialColorMode);
    return keys;
  }, []);

  const changeColorMode = () => {
    currentColor.current++;
    if (currentColor.current >= modes.length) {
      currentColor.current = 0;
    }
    setColorMode(modes[currentColor.current]);
  };
  return (
    <Section variant={`nav`}>
      <Container>
        <Flex sx={{ justifyContent: `space-between` }}>
          <Button as={Link} to={`/`} variant={`icon`}>
            <Tent />
          </Button>
          <Button variant={`icon`} onClick={changeColorMode}>
            {/* <FontAwesomeIcon
              icon={colorMode === `light` ? faCircleOutline : faCircle}
            /> */}
            <span sx={{ fontFamily: `heading`, ml: [`5px`] }}>{colorMode}</span>
          </Button>
        </Flex>
      </Container>
    </Section>
  );
}

export default Header;
