const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const rmdir = require('./rmdir');

const cp = spawn('node build.js', [], {
  cwd: __dirname,
  shell: true,
});
cp.on('close', function () {
  const dist = path.resolve('dist');
  const fonts = path.join(dist, 'wxfont.ttf');

  if (fs.existsSync(fonts)) {

    const cssPath = path.join('index.css');

    if (fs.existsSync(cssPath)) {
      let base64 = new Buffer(fs.readFileSync(fonts)).toString('base64');
      let cssContent = fs.readFileSync(cssPath, { encoding: 'utf8' });
      cssContent = cssContent.replace(/16px/, '32rpx').replace(/src:\s*([^}]+)(\n})/, function (all, cnt, tail) {
        return `src: url(data:font/truetype;charset=utf-8;base64,${base64}) format('truetype');${tail}`;
      });
      fs.writeFileSync(cssPath, cssContent);
      rmdir(dist);
      console.log('\u001b[32m', '编译完成', '\u001b[0m');
    } else {
      throw Error('没有找到css文件！');
    }
  } else {
    throw Error('没有找到ttf文件！');
  }
});