import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/myFriend?'+'.*'), "get", {
	totalNumber: 7,//一共多少朋友
	totalPages: 2,//一共多少页
	friendList: [{
		username: 'Luo Hao',
		sex: 1,
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A good software engineer.'
	}, {
		username: 'Mr. Zha',
		sex: 0,
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'An excellent software engineer.'
	}, {
		username: 'Yimin Li',
		sex: 1,
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A bad student.'
	}, {
		username: 'Luo Hao 2',
		sex: 0,
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A good software engineer.'
	}, {
		username: 'Mr. Zha 2',
		sex: 1,
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'An excellent software engineer.'
	}, {
		username: 'Mr. Zha 3',
		sex: 1,
		iconUrl:"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'An excellent software engineer.'
	}]
});
