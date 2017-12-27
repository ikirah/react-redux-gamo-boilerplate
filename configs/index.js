module.exports = {
  development: {
    isProduction: false,
    host: 'localhost',
    port: 3000,
    serviceURL: '/serviceURL'
  },
  production: {
    isProduction: true,
    host: 'http://yourserver.com', // use localhost to test in local machine
    port: 3001
  }
}[process.env.NODE_ENV || 'development']
