import React, { useContext } from 'react';
import create from 'zustand';

const [useVideo] = create(set => ({
  currentVideo: null,
  actions: {
    set: id => set(() => ({ currentVideo: id }))
  }
}));

const [usePageReady] = create(set => ({
  ready: false,
  actions: {
    set: value => set(() => ({ ready: value === true }))
  }
}));

const GlobalContext = React.createContext({});
GlobalContext.displayName = `Global`;

const withGlobal = FunctionalComponent => props => (
  <FunctionalComponent {...props} {...useContext(GlobalContext)} />
);

export { GlobalContext, withGlobal, useVideo, usePageReady };
