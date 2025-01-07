const useMakeFreeze = (item: {}[] | [] | {}) => {
  const freeze = JSON.parse(JSON.stringify(item));
  return freeze;
};

export default useMakeFreeze;
