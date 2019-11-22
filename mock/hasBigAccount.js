import Mock from 'mockjs';
export default Mock.mock('/user/globalAccount/me', "get", {
	globalUser: {
		username: "zzjBigUser",
		iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		description: "I am unprecedented!",
		followerNumber: 150

	}
});
