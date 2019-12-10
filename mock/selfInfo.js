import Mock from 'mockjs';
export default Mock.mock('/user/selfInfo','get',{
    info: {
        description: "i am zzj ",
        sex: 1,
        iconUrl: "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
        address: "Nine-eyes Bridge",
        phoneNumber: "13568904488",
        username: "zzj",
		admin: true
    }
})