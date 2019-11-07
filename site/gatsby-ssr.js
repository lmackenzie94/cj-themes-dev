import React from 'react';
import Layout from 'components/Layout';
import { GlobalContext, useVideo, usePageReady } from 'global';

export const wrapPageElement = ({ element, props }) => (
  <GlobalContext.Provider value={{ useVideo, usePageReady }}>
    <Layout {...props}>{element}</Layout>
  </GlobalContext.Provider>
);
