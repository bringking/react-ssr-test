// @flow
const React = require("react");
const h = React.createElement;
const useData = require('../use-data');

const someLoader = (appContext) => {
  if(!appContext.loaded) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ loaded: true });
      }, 2000);
    })
  }
}

const someOtherLoader = (appContext) => {
  if(!appContext.someOtherPromise) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ someOtherPromise: true });
      }, 2000);
    })
  }
}

module.exports = (routeContext, appContext) => {
  // use a data Loader "hook"
  useData(someLoader(appContext));
  useData(someOtherLoader(appContext));
  // Render
  return props => {
    return h('div', null, [`Hello ${JSON.stringify(props)}`]);
  };
};
