import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/globalAccount/info?' + '.*'), "put", {
	msg: "OK",
    globalUserInfo: {
        username: "Super skr",
        iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
        description: "Super skr hate zzj",
		followerNumber: 1,
    }
});