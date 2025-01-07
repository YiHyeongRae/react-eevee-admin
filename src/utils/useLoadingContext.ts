import { LoadingContext } from "#/components/LoadingContextProvider";
import { useContext } from "react";

export const useLoadingContext = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);

  return {
    showLoading,
    hideLoading,
  };
};
