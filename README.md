# 使用说明

> A Vue.js project

## 1. 安装环境

1.  安装nodejs，百度安装即可，安装的时候需要勾选环境变量，确保可以在任何地方访问到node;
2.  在DOS窗口执行 
```bash
npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
```
3.  在该文件的同级目录执行
```bash
npm install --registry=https://registry.npm.taobao.org
```

## 2.开发和构建

1.  源码：主要是src和static文件夹。
2.  开发：在该文件的同级目录执行, ``` npm run dev ```,之后在浏览器打开``` localhost:9090 ```即可实时访问项目。
3.  构建：开发完成后如果要放置于其他地方，在该文件的同级目录执行, ``` npm run build ```,即可生成一个dist文件夹，该文件夹即为打包后的所有文件。
4. <b>新建页面</b>： 修改src/assets/data/navs.js，然后在node文件夹下执行``` node index.js ```即可自动生成vue文件并加入路由，在src/pages下找到该页面，编辑即可。

## 3.语法

1.  主要是[vue](https://cn.vuejs.org/v2/guide/), [vue-router](https://router.vuejs.org/zh/),[vue-router](https://router.vuejs.org/zh/), [element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation),[axios](https://github.com/axios/axios)。

2. 图片主要存放在static/img，在vue文件中使用
```
<img :src = "'./static/img/图片路径'">
```

3. 全局css主要是assets文件夹。

4. vue是数据驱动型，跟jq不同，如要需要改变视图，只需改变变量的值即可，比如 lists 变量是一个数组，在进行ajax请求后，将 data.results 中的数组直接复制给 lists 变量，表格或列表就会自动更新。


5. vue文件中的template，
```bash
# 属性名前带有:的代表属性值是一个变量
<div :text = "vartext"></div>

# 属性名前不带有:的就是常规的html使用方法
<div text = "vartext"></div>

# 在{{}} 内的变量将显示在div内，在js中使用 this.text = '其他文本';该div的内容将自动更新
<div>{{ text }}</div>

```

6. 
``` html
# 通过变量show的值来控制div的显示与否
<div v-if = "show"></div>


# 循环：遍历lists数组， list表示每一项，i表示索引
# lists = [{ text: '菜市场' }, { text: '测试' }, ]

# 将渲染为  <div>1.菜市场</div><div>2.测试</div>

<div v-for = "(list, i) in lists" :key = "i">{{ i + 1 }}.{{ list.text }}</div>

# 事件绑定 @事件名="方法名(参数)"
# 下例表示在每个div上绑定一个click事件,点击时将触发 toDetail 方法,携带的参数为 lists变量。
<div 
  v-for = "(list, i) in lists" 
  :key = "i"
  @click = "toDetail(list)">{{ i + 1 }}.{{ list.text }}</div>
```

7.  vue script
``` javascript
1. data中return的是在本页面需要使用的所有变量，在script其他部分通过this.变量名访问，在template中省略this；变量必须先进行声明

2. methods对象中书写所有的方法，在方法A中通过this.B()访问方法B。

3. created() 书写页面每次进入时需要使用的函数,比如ajax请求或初始化等。
4. mounted() 书写页面DOM元素加载完成后的函数，一般不建议操作DOM。

5. 使用this.$router.push(路径)进行跳转，this.$router.back()返回上一个页面。

6.  this.$router.query变量是vue-router路由的查询参数
```

8. ajax

``` javascript
1. 请求的基地址我写在html了，直接修改window.cfg.baseurl的值即可。

2. 使用的是axios，get和post我重写了，直接使用this.$http.get(url, params)或者this.$http.post(url, params)

3. 以get请求举例

// GET /user/get?id=1 返回的数据为 { info: { realname: 'test' } }

this.$http.get('/user/get', { id: 1 })
.then(res => {
  // 请求成功
  // res.data 才是请求到的json数据
  // this.userinfo = res.data.info;
}).catch(err => {
  // 请求失败
})

// 使用ES6简化后的版本
this.$http.get('/user/get', { id: 1 })
.then(({ data }) => {
  // 请求成功
  // data 就是请求到的json数据
  // this.userinfo = data.info;
}).catch(err => {
  // 请求失败
})
```
