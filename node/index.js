var path = require('path'),
    fs = require('fs-extra');
var array = require('lodash/array');
var flattenDeep = array.flattenDeep;

var { getPageContent } = require('./temp/page');

var lists = require('../src/assets/data/navs');

var src_path = path.resolve(__dirname , '../src');

function create(lists, last_dir) {
  lists.map(list => {
    if(list.children) {
      /*  新建目录，子目录的组件 */
      create(list.children, last_dir + '/' + getPageName(list).toLowerCase());
    } else {
      /* 当前页面 */
      createPage(list, last_dir);
    }
  })
}

function createPage(list, last_dir) {
  fs.mkdirpSync(last_dir);
  var filename = last_dir + `/${getPageName(list)}Page.vue`;
  var exist = fs.existsSync(filename);
  if(exist) {
    return;
  }
  var writer = fs.createWriteStream(filename);
  writer.write( getPageContent( getPageName(list) ) );
}

function createRouter(lists, last_dir) {
  var _lists = getRouter(lists);
  _lists = flattenDeep(_lists);
  paths = _lists.map(v => v._path);
  var importPaths = getImportRouter(paths),
      exportPaths = getExportRouter(paths, _lists);
  var writer = fs.createWriteStream(src_path + '/router/add.js');
  writer.write(`
${importPaths}
export default [
  ${exportPaths}
]
  `);
}

function getRouter(lists, last_dir) {
  return lists.map(list => {
    if(!list.children) {
      let _dir = last_dir ? `${last_dir}/${getPageName(list)}` : `${getPageName(list)}`;
      return {
        ...list,
        _path: _dir
      }
    }

    return getRouter(list.children, getPageName(list))
  })
}

function getImportRouter(paths) {
  return `
${paths.map(_path => {
  return `const ${path.basename(_path)}Page = () => import('@/pages/${_path}Page.vue');`
}).join('\n')}
  `
}

function getExportRouter(paths, _lists) {
  var str = paths.map((_path, i) => {
    return `{
    path: '${_lists[i].url}', 
    component: ${path.basename(_path)}Page
  },`
  }).join('\n\t')

  return str;
}

function getPageName(obj) {
  return (obj.name || obj.title).replace(/^(\w)/g, (m, $1) => $1.toUpperCase() );
}

create(lists, src_path + '/pages');
createRouter(lists, src_path + '/router');