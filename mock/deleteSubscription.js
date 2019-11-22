import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/follow?'+'.*'), "delete", {
	msg:'OK'
})