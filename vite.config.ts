import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { generateGalleryManifest } from "./scripts/generate-gallery-manifest.mjs";
import { optimizeGalleryImages } from "./scripts/optimize-gallery-images.mjs";

const galleryManifestPlugin = () => {
  const watchedRoots = [
    path.resolve(__dirname, "public/branch-photos"),
    path.resolve(__dirname, "public/store-front-thumbnails"),
    path.resolve(__dirname, "public/gallery"),
  ].map((absolutePath) => absolutePath.split(path.sep).join("/"));

  const isGalleryFile = (filePath: string) => {
    const normalized = path.resolve(filePath).split(path.sep).join("/");
    return watchedRoots.some((root) => normalized === root || normalized.startsWith(`${root}/`));
  };

  let regenerateTimer: ReturnType<typeof setTimeout> | undefined;

  const debounceRegenerate = (handler: () => Promise<void>) => {
    if (regenerateTimer) {
      clearTimeout(regenerateTimer);
    }

    regenerateTimer = setTimeout(() => {
      void handler();
    }, 120);
  };

  return {
    name: "gallery-manifest",
    async buildStart() {
      await optimizeGalleryImages(__dirname);
      await generateGalleryManifest(__dirname);
    },
    async configureServer(server: ViteDevServer) {
      await optimizeGalleryImages(__dirname);
      await generateGalleryManifest(__dirname);

      const handleFsEvent = (filePath: string) => {
        if (!isGalleryFile(filePath)) {
          return;
        }

        debounceRegenerate(async () => {
          try {
            await optimizeGalleryImages(__dirname);
            await generateGalleryManifest(__dirname);
            server.ws.send({ type: "full-reload" });
          } catch (error) {
            server.config.logger.error(
              `[gallery-manifest] Failed to regenerate manifest: ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          }
        });
      };

      server.watcher.on("add", handleFsEvent);
      server.watcher.on("change", handleFsEvent);
      server.watcher.on("unlink", handleFsEvent);
      server.watcher.on("addDir", handleFsEvent);
      server.watcher.on("unlinkDir", handleFsEvent);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/SmartByte/" : "/",

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), galleryManifestPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: mode !== "production",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "vendor-react";
          }

          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("cmdk") ||
            id.includes("vaul") ||
            id.includes("sonner")
          ) {
            return "vendor-ui";
          }

          if (id.includes("react-router-dom")) {
            return "vendor-router";
          }

          if (id.includes("@tanstack/react-query")) {
            return "vendor-query";
          }

          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }

          return "vendor-misc";
        },
      },
    },
  },
}));
