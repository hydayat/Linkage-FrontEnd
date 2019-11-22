import Mock from 'mockjs';
export default Mock.mock(RegExp('/moment/delete'+'.*'), "post", {
	msg:'OK'
})