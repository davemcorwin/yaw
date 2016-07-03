module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },

  plugins: {
    babel: {
      presets: ['es2015', 'stage-0']
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 4 versions'])
      ]
    }
  }
};
