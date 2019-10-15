/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useTransition, config, animated } from 'react-spring';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';
// fetch polyfill for IE
// import 'whatwg-fetch';

// NOTE: need to add fetch polyfill and get font awesome icons working
// still kinda broken (goes away too quickly after reconnection)

function NetworkDetectorWithTheme({
  errorMessage = `Internet connection lost`,
  reconnectMessage = `Internet has reconnected`,
  autoHide,
  allowClose = false
}) {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [messageIsOpen, setMessageIsOpen] = useState(true);
  const webPing = useRef(0);

  useEffect(() => {
    handleConnectionChange();
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  useEffect(() => {
    if (autoHide && isDisconnected) {
      setTimeout(() => {
        setMessageIsOpen(false);
      }, 5000);
    }
  }, [autoHide, isDisconnected]);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      webPing.current = setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors'
        })
          .then(() => {
            setIsDisconnected(false);
            setMessageIsOpen(true);
            clearInterval(webPing.current);
          })
          .catch(() => setIsDisconnected(true));
      }, 2000);
      return;
    }
    setIsDisconnected(true);
    setMessageIsOpen(true);
  };

  const messageTransition = useTransition(isDisconnected, null, {
    config: { ...config.gentle, clamp: true },
    from: { y: `scaleY(0)` },
    enter: { y: `scaleY(1)` },
    leave: { y: `scaleY(0)`, delay: 5000 }
  });

  const messageSpring = useSpring({
    opacity: messageIsOpen ? 1 : 0
  });

  const themeStyles = {
    position: `fixed`,
    top: 0,
    left: 0,
    width: `100%`,
    zIndex: 1000,
    textAlign: `center`,
    bg: 'primary',
    color: 'text',
    fontFamily: 'body',
    fontSize: [0, 1, 2],
    padding: [2, 3]
  };

  return messageTransition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          sx={{ ...themeStyles }}
          style={
            messageIsOpen
              ? {
                  transform: props.y,
                  transformOrigin: `top`
                }
              : { ...messageSpring }
          }
        >
          <p>{!isDisconnected ? reconnectMessage : errorMessage}</p>
          {allowClose && (
            <button
              onClick={() => setMessageIsOpen(false)}
              sx={{
                fontSize: [2, 3],
                transiton: `color 0.2s ease-in`,
                ':hover svg': {
                  color: 'faded',
                  transiton: `color 0.2s ease-out`
                }
              }}
              style={{
                background: `none`,
                outline: `none`,
                border: `none`,
                cursor: `pointer`,
                position: `absolute`,
                top: `0px`,
                right: `10px`,
                height: `100%`,
                width: `40px`,
                display: `flex`,
                alignItems: `center`
              }}
            >
              {/* <FontAwesomeIcon icon={faTimes} sx={{ color: 'text' }} /> */}
            </button>
          )}
        </animated.div>
      )
  );
}

export default NetworkDetectorWithTheme;

// TO ADD: add dropdown for re-connection
// component remains after going 'offline' and making change in code or refreshing the page
