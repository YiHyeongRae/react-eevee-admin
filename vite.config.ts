import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    base: isProduction ? "/react-eevee-admin/" : "/",
    plugins: [react(), svgr()],
    resolve: {
      alias: [{ find: "#", replacement: "/src" }],
    },
  };
});
