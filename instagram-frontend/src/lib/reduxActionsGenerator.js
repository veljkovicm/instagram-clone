/**
 * Generates an object with action types.
 *
 * @param {string[] list}
 * @return {Object}
 *
 * @example
 *
 *     import { reduxActionsGenerator } from '@src/lib';
 *     const actionTypes = reduxActionsGenerator([ 'FOO', 'BAR' ]);
 *     console.log(actionTypes); // { FOO: 'FOO', BAR: 'BAR' }
 */
export default (list = []) => list.reduce((acc, action) => ({
  ...acc,
  [action]: action,
}), {});
