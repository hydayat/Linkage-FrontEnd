import Mock from 'mockjs';
export default Mock.mock(RegExp('/moment/check?' + '.*'), "get", [
    {
        "id": 1,
        "poster_name": "zzj",
        "img": [
            "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
			"https://www.58.com/zp_images/allimg/121210/5_121210153603_1.png",
			"http://a1.att.hudong.com/30/40/01300000279088124453404734046.jpg"
        ],
        "video": [],
        "text": "I am unprecedented",
        "time": "2019-11-14 15:43:02"
    },
    {
        "id": 2,
        "poster_name": "Gay Luo",
        "img": [
			"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
            "http://a1.att.hudong.com/30/40/01300000279088124453404734046.jpg"
        ],
        "video": [],
        "text": "This is from postman",
        "time": "2019-11-15 15:53:02"
    }
]);
