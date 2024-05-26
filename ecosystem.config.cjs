module.exports = {
  apps: [
    {
      script: '.output/server/index.mjs',
      max_memory_restart: '200M',

      // Logging
      //   out_file: './out.log',
      //   error_file: './error.log',
      //   merge_logs: true,
      //   log_date_format: 'DD-MM HH:mm:ss Z',
      //   log_type: 'json',

      // Env Specific Config
      env_production: {
        name: 'alvasori',
        NODE_ENV: 'production',
        PORT: 5000,
        exec_mode: 'cluster',
        instances: 0,
      },
      env_stage: {
        name: 'alvasori-stage',
        NODE_ENV: 'production',
        PORT: 5001,
        mode: 'fork',
        instances: '1',
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
