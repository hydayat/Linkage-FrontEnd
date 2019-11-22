import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/myFriend?'+'.*'), "delete", {
	msg:'OK'
})