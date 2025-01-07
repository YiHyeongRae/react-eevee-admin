import { LoaderFunction, ActionFunction } from "react-router-dom";

interface RouteCommonTypes {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<{}>;
}

interface IRouteTypes extends RouteCommonTypes {
  path: string;
  Element: React.ComponentType<{}>;
}

interface PagesTypes {
  [key: string]: {
    default: React.ComponentType<{}>;
  } & RouteCommonTypes;
}

export type { PagesTypes, RouteCommonTypes, IRouteTypes };
