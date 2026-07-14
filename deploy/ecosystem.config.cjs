module.exports = {
  apps: [
    {
      name: "aes-web",
      script: ".next/standalone/server.js",
      cwd: "/var/www/aes",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://aes-designstudio.com",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "400M",
    },
  ],
};
