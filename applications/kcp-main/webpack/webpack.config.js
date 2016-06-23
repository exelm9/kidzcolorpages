module.exports = {
 entry: [
   '../client/'
 ],
 output: {
   path: __dirname + '/../dist',
   publicPath: '/kcp-dist',
   filename: 'bundle.js'
 },
 module: {
   loaders: [{
     exclude: /node_modules/,
     loader: 'babel',
     query: {
       presets: ['react', 'es2015', 'stage-1']
     }
   }]
 },
 resolve: {
   extensions: ['', '.js', '.jsx']
 },
 devServer: {
   historyApiFallback: true,
   contentBase: './'
 }
};