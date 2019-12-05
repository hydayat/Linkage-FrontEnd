import Mock from 'mockjs';
export default Mock.mock('/moment/like?MomentId=1&Action=cancel','post',{
    msg: "OK"
})