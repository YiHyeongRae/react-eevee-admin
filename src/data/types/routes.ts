import { LoaderFunction, ActionFunction } from "react-router-dom";

interface RouteCommonTypes {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<{}>;
}

interface IRouteTypes extends RouteCommonTypes {
  path: string;
  Element: React.ComponentType<{}>;
  withAuth: boolean;
}

interface PagesTypes {
  [key: string]: {
    default: React.ComponentType<{}>;
  } & RouteCommonTypes;
}

export type { PagesTypes, RouteCommonTypes, IRouteTypes };
