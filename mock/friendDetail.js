import Mock from 'mockjs';
export default Mock.mock(RegExp('/user/myFriend/info?' + '.*'), "put", {
	msg: "OK",
    info: {
        username: "skr",
        iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
        description: "i hate zzj",
        sex: 0,
        address: "Nine Eyes Bridge.",
    }
});