import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// http://localhost:3000에서 동작 중인 백엔드로 프록시 설정
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
