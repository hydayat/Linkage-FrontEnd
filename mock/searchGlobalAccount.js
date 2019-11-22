import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/globalAccount/all?' + '.*'), "get", {
	"totalNumber": 20,
	"globalUserList": [{
		username: 'Super Luo',
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A good software engineer.'
	}, {
		username: 'Super Mr. Zha',
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'An excellent software engineer.'
	}, {
		username: 'Super Yimin Li',
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: 'A bad student.'
	}],
	"totalPages": 5
});
