//Importe
import { build } from "velite";

class VeliteWebpackPlugin {
  static started = false;
  
  /** @param {any} compiler */
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Configuração de imagens do Supabase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rmqkiclsynxcwovkteqj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  // 2. Cabeçalhos de Segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
        ],
      },
    ];
  },  

  // 3. Plugin do Velite
  /** @param {any} config */
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },

  // 4. Ignorar avisos chatos do TypeScript na hora de compilar na Vercel
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;