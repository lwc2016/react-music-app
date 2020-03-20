export default {
    theme: {
        "@r": "150rem"
    },
    proxy: {
        '/api': {
          target: 'http://localhost:3030',
          changeOrigin: true
        }
      }
}