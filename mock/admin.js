import Mock from 'mockjs';
export default Mock.mock('/admin/post/trend?interval=3600','get',[{
  id:1,
  title: "HaHa!", //文章标题，长度要有限制
  visitTimes: 20, //访问量
  author: "Li Yimin", //文章作者的名字
  isTrend: false, //目前是否是热搜
},{
  id:2,
  title: "I am Unprecedented!", //文章标题，长度要有限制
  visitTimes: 50, //访问量
  author: "Zhang Zijian", //文章作者的名字
  isTrend: true, //目前是否是热搜
},{
  id:3,
  title: "You are stupid, I am Unprecedented! I am Zhang Zijian, Xiaozhang's Zhang!", //文章标题，长度要有限制
  visitTimes: 50, //访问量
  author: "Zhang Zijian", //文章作者的名字
  isTrend: true, //目前是否是热搜
}])