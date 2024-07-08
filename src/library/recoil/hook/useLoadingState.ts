const useLoadingState = {
  handler: (setter: Function) => {
    setter((prev: { isLoading: boolean }) => {
      return { ...prev, isLoading: !prev.isLoading };
    });
  },
};

export default useLoadingState;
