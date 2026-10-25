import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The repository is deployed as a GitHub Pages project site.
export default defineConfig({
  base: "/guia-radiologia-madre-vannini/",
  plugins: [react()],
});