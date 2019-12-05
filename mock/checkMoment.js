import Mock from 'mockjs';
export default Mock.mock(RegExp('/moment/check?' + '.*'), "get", [{
		"id": 1,
		"poster_name": "zzj",
		"poster_icon": "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		"img": [
			"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
			"https://www.58.com/zp_images/allimg/121210/5_121210153603_1.png",
			"http://a1.att.hudong.com/30/40/01300000279088124453404734046.jpg"
		],
		"video": [],
		"text": "I am unprecedented",
		"time": "2019-11-14 15:43:02",
		"like": [{
			"liker": "zzj",
			"moment_id": 1,
		},{
			"liker": "skr",
			"moment_id": 1,
		},{
			"liker": "mmp",
			"moment_id": 1,
		}],
		"comment": [{
			"id": 1,
			"commenter": "zzj",
			"moment_id": 1,
			"content": "This is from lh, This is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lhThis is from lh"
		}, {
			"id": 2,
			"commenter": "lym",
			"moment_id": 1,
			"content": "This is from lym"
		}, {
			"id": 3,
			"commenter": "zzj",
			"moment_id": 1,
			"content": "This is from zzj"
		}, {
			"id": 4,
			"commenter": "ff",
			"moment_id": 1,
			"content": "This is from ﬀ"
		}],
		"self_like": true
	},
	{
		"id": 2,
		"poster_name": "Gay Luo",
		"poster_icon": "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		"img": [
			"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
			"http://a1.att.hudong.com/30/40/01300000279088124453404734046.jpg"
		],
		"video": [],
		"text": "This is from postman",
		"time": "2019-11-15 15:53:02",
		"like": [{
			"liker": "zzj",
			"moment_id": 2,
		},{
			"liker": "lym",
			"moment_id": 2,
		},{
			"liker": "luo_hao",
			"moment_id": 2,
		}],
		"comment": [{
			"id": 9,
			"commenter": "zzj",
			"moment_id": 2,
			"content": "This is from lh"
		}, {
			"id": 10,
			"commenter": "zzj",
			"moment_id": 2,
			"content": "This is from lym"
		}],
		"self_like": false
	},
	{
		"id": 3,
		"poster_name": "Gay Luo",
		"poster_icon": "http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
		"img": [
			"http://static.dcfever.com/media/sharing/09/03/16/1616471237188585.jpg",
			"http://a1.att.hudong.com/30/40/01300000279088124453404734046.jpg"
		],
		"video": [],
		"text": "This is from postman",
		"time": "2019-11-15 15:53:02",
		"self_like": true,
		"like":[],
		"comment":[]
	}
]);
