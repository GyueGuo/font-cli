const svgsFont = require('nodejs-svgs2font');
const path = require('path');

const current = path.resolve('..');

svgsFont({
  fontName: 'wxfont', // 字体名称
  baseClass: 'wxfont', // 基础css类
  classPrefix: 'wxicon-', // 图标css前缀
  files: path.join(current, 'src'), // svg path
  output: path.join(current, 'dist'), // output path
  cssPath: path.join(current, 'index.css'), // css文件
  successLog: true, // 是否展示成功日志
});