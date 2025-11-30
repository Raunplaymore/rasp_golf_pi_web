// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'my-raspi-app',
      script: './app.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
