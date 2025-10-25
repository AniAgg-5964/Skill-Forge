import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://skill-forge-km0u.onrender.com/", // proxy backend requests
    },
  },
});
