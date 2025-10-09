import inject from "@rollup/plugin-inject";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["jquery"],
  },
});
