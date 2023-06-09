import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:8080",//"https://3a83-119-197-110-181.jp.ngrok.io/",
      "/posts": "http://localhost:8080",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/stores": "http://localhost:8080",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/admin": "http://localhost:8080",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/google": "http://localhost:8080",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/comment": "http://localhost:8080",//"https://3a83-119-197-110-181.jp.ngrok.io",
    },
  },
});