/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

interface Window {
  BUILD_TIME: Date
}

/** 构建时间 */
declare const BUILD_TIME: number