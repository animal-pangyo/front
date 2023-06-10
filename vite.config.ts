import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "https://3a83-119-197-110-181.jp.ngrok.io/",
      "/posts": "https://3a83-119-197-110-181.jp.ngrok.io",
      "/stores": "https://3a83-119-197-110-181.jp.ngrok.io",
      "/admin": "https://3a83-119-197-110-181.jp.ngrok.io",
      "/google": "https://3a83-119-197-110-181.jp.ngrok.io",
      "/comment": "https://3a83-119-197-110-181.jp.ngrok.io",
    },
  },
});
