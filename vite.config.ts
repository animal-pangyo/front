import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io/",
      "/posts": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/stores": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/admin": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/google": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/comment": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/image": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
      "/uploads": "http://localhost:9000",//"https://3a83-119-197-110-181.jp.ngrok.io",
    },
  },
});