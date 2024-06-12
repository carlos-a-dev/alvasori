module.exports = {
  apps: [
    {
      script: '.output/server/index.mjs',
      max_memory_restart: '200M',

      // Logging
      out_file: '../logs/out.log',
      error_file: '../logs/error.log',
      merge_logs: true,
      log_date_format: 'DD-MM HH:mm:ss Z',
      log_type: 'json',

      // Env Specific Config
      env_production: {
        name: 'alvasori',
        cwd: '/var/www/alvasori.net/web/',
        NODE_ENV: 'production',
        PORT: 5000,
        exec_mode: 'cluster',
        instances: 0,
        DATABASE_URL: 'file:/var/www/alvasori.net/db/alvasori.db',
      },
      env_stage: {
        name: 'alvasori-stage',
        cwd: '/var/www/stage.alvasori.net/web/',
        NODE_ENV: 'production',
        PORT: 5001,
        mode: 'fork',
        instances: '1',
        DATABASE_URL: 'file:/var/www/stage.alvasori.net/db/alvasori.db',
      },
      env_development: {
        name: 'alvasori-dev',
        NODE_ENV: 'development',
        PORT: 3000,
        exec_mode: 'fork',
        instances: '1',
        // watch: true,
        // watch_delay: 3000,
        // ignore_watch: [
        //   './node_modules',
        //   './app/views',
        //   './public',
        //   './.DS_Store',
        //   './package.json',
        //   './yarn.lock',
        //   './samples',
        //   './src',
        // ],
      },
    },
  ],
}
