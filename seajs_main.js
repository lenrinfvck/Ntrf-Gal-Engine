seajs.config({
  base: '/js',
  //别名
  alias: {
    'jquery': '../lib/jquery-1.11.1.min.js'
  }
});

// 加载入口模块
seajs.use('main');