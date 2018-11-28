// @flow
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

async function waitForComponent(initialProps, pageFunc, req, res) {
  try {
    // Nothing thrown, just return the result
    return { Component: pageFunc({ req, res }, initialProps), initialProps };
  } catch (e) {
    console.log("Caught: ", e);
    // data already resolved, return nothing;
    if (!e) {
      return { Component: pageFunc({ req, res }, initialProps), initialProps };
    }
    // it is something else, re-throw it
    if (!e.then) {
      throw e;
    }
    // It's a promise, wait for it
    const props = await e;
    // render again until we get a non-thenable
    return waitForComponent({ ...props, ...initialProps }, pageFunc, req, res);
  }
}

async function requestHandler(req, res, next) {
  const page = require("./pages/about");
  const { Component, initialProps } = await waitForComponent(
    {},
    page,
    req,
    res
  );
  res.send(
    ReactDOMServer.renderToString(React.createElement(Component, initialProps))
  );
  next();
}

const expressApp = express();
expressApp.use(requestHandler).listen(3000);
