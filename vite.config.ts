import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["frontend-search-keywords.onrender.com"],
  },
  plugins: [react()],
});
