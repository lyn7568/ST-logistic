var copy = function copy(selector, cb) {
  var el = document.querySelector(selector);
  if(!el) {
    cb && cb('复制的目标元素不存在');
    return;
  }

	var range = document.createRange();
	var end = el.childNodes.length;
	range.setStart(el,0);
	range.setEnd(el,end);

	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand("copy",false,null);
  selection.removeRange(range);
  
  cb && cb(undefined, '复制成功');
}

var mypath = {
  basename(str) {
    var s = '';
    str.replace(/(\w+\.\w+)/g, (match, $1) => { s = $1 });
    return s;
  },
  extname(str) {
    var s = '';
    str.replace(/(\w+\.\w+)/g, (match, $1) => { s = $1 });
    return '.' + s.split('.')[1];
  }
}
export {
  copy,
  mypath
}