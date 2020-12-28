export default (list = []) => list.reduce((acc, action) => ({
  ...acc,
  [action]: action,
}), {});
