/** Isolated PM2 apps — unique names/ports. Do not reuse 3000/3010/8000/8001. */
module.exports = {
  apps: [
    {
      name: 'tdyu-endowment',
      cwd: '/opt/tdyu-endowment',
      script: 'server/src/index.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '220M',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '18787',
      },
    },
    {
      name: 'tdyu-next',
      cwd: '/opt/tdyu-endowment/next',
      script: 'server.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '280M',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: '13000',
        API_ORIGIN: 'http://127.0.0.1:18787',
      },
    },
  ],
}
