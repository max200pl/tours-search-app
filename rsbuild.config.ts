import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact(), pluginSass()],

  output: {
    cssModules: {
      localIdentName: "[local]--[hash:base64:5]",
    },
  },
});
