import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/selfInfo?' + '.*'),'put',{
    msg: "OK"
})