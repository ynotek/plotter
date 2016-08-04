var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: './app/components/Main.jsx',
  output: {
    filename: 'public/bundle.js'
  },

  devtool: 'inline-source-map',
  
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
       presets: ['es2015', 'react'],
       plugins: [
       "add-module-exports"
       ]
     }
   },
   {
    test: /\.css$/,
    loaders: ['style', 'css']
  }
  ]
},
plugins: [
new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    })
]
}
