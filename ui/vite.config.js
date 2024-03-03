import reactRefresh from "@vitejs/plugin-react-refresh";

// vite.config.js
export default {
  plugins: [reactRefresh()],
  esbuild: {},
  build: {
    outDir: "../dist",
  },
};
