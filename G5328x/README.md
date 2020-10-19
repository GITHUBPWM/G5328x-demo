# g5328x

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

整体项目结构（由路由组织）：
’/‘指向index页面，在index页面的<router-link>是网站的一级标题（常用功能、交换设置），里面循环渲染的<router-link>是二级标题，点击一级标题时会重定位到2级标题;
index页面的<router-view>应该展示一级标题的内容组件，但一级标题实际上没有内容，只是起了个引导作用，引导到二级标题的内容。所以在项目路由中配置各路由的组件时，一级标题用的是公共PageIndex组件，里面只写了个<router-view>用来显示二级标题的组件内容。
在二级标题中就是每个页面的具体内容了，展示的是具体组件，但如果还有子组件的页面，会在路由的component中设置为公共<ThirdMenu>组件来引导显示三级内容。

