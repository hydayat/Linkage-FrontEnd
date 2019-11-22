import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/globalAccount/description?'+'.*'), "put", {
	msg:'OK',
})