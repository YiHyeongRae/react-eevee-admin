import { createContext, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export const LoadingContext = createContext({
  showLoading: () => {},
  hideLoading: () => {},
});

const LoadingProvider = (props: React.PropsWithChildren) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
