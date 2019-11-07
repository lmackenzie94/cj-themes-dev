import '@babel/polyfill';
import objectFitImages from 'object-fit-images';
import React from 'react';
import Layout from 'components/Layout';
import { GlobalContext, useVideo, usePageReady } from 'global';

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
    console.log(`👍 IntersectionObserver is polyfilled`);
  }

  const testImg = document.createElement(`img`);
  if (
    typeof testImg.style.objectFit === `undefined` ||
    typeof testImg.style.objectPosition === `undefined`
  ) {
    objectFitImages();
    console.log(`👍 Object-fit/Object-position are polyfilled`);
  }
};

export const wrapPageElement = ({ props, element }) => {
  return (
    <GlobalContext.Provider value={{ useVideo, usePageReady }}>
      <Layout {...props}>{element}</Layout>
    </GlobalContext.Provider>
  );
};

export const shouldUpdateScroll = () => {
  return false;
};
