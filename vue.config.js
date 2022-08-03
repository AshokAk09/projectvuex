module.exports = {
  devServer:{
    port:8100,
    proxy:"http://localhost:3000"
  }, 
  transpileDependencies: true

}