// @flow
module.exports = (promise) => {
  if(promise && promise.then) {
    throw promise;
  }
}
