import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/globalAccount/me/followerList?' + '.*'), "get", {
	totalNumber: 20,//匹配到的用户总数
	totalPages: 50,//一共多少页
	followerList: [{
		username: 'Luo Hao',
		sex:1,
		description: 'A good software engineer.',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg"
	}, {
		username: 'Mr. Zha',
		sex:0,
		description: 'An excellent software engineer.',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg"
	}, {
		username: 'Yimin Li',
		sex:1,
		description: 'A bad student.',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg"
	}, {
		username: 'Luo Hao 2',
		sex:1,
		description: 'A good software engineer.',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg"
	}, {
		username: 'Mr. Zha 2',
		sex:0,
		description: 'An excellent software engineer.',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg"
	}]
});
