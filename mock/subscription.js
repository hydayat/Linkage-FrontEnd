import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/follow?'+'.*'), "get", {
	totalNumber: 20,//一共多少朋友
	totalPages: 50,//一共多少页
	followedList: [{
		username: 'Super Luo',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A good software engineer.'
	}, {
		username: 'Super Mr. Zha',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'An excellent software engineer.'
	}, {
		username: 'Super Yimin Li',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A bad student.'
	}, {
		username: 'Super Luo 2',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A good software engineer.'
	}, {
		username: 'Super Mr. Zha 2',
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'An excellent software engineer.'
	}]
});
