import Layout from "./layout";
import "./styles/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  ActionFunction,
} from "react-router-dom";
import { IRouteTypes, PagesTypes } from "./data/types/routes";
import LoadingProvider from "./components/LoadingContextProvider";
import { Analytics } from "@vercel/analytics/react";

const pages: PagesTypes = import.meta.glob("./pages/**/*.tsx", { eager: true });
const routes: IRouteTypes[] = [];

for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: (
      <Layout>
        <Element />
      </Layout>
    ),
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

function App() {
  return (
    <LoadingProvider>
      <RouterProvider router={router} />
      <Analytics />
    </LoadingProvider>
  );
}

export default App;
