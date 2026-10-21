import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Forward /api/* to the .NET API so the browser never hits CORS.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:5080" } },
});
