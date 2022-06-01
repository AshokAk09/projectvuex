module.exports = {
  devServer:{
    port:8183,
    proxy:"http://localhost:3000"
  }, 
  transpileDependencies: true

}