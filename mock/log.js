import Mock from 'mockjs';
export default Mock.mock(RegExp('/login' + '.*'), "post", {
	msg: {
		id: 2,
		unreadMessage: {
			count: 0,
			unreadList: [{
					to: 'zzj', // 发给谁
					content: 'You are stupid!', // 内容是啥
					name: 'Mr.Zha', // 谁发的
				},
				{
					to: 'zzj', // 发给谁
					content: 'You are foolish!', // 内容是啥
					name: 'Lym', // 谁发的
				},
				{
					to: 'zzj', // 发给谁
					content: 'You are very very foolish!', // 内容是啥
					name: 'Lym', // 谁发的
				}
			]
		},
		unreadAddFriendRequest: {//别人加我
			count: 0,
			unreadList: [{
				id:0,
				targetName:'', // 谁加我
				selfIntro:'You are good.', //自我介绍
				username:'Mr.Xi',
			},{
				id:1,
				targetName:'', // 谁加我
				selfIntro:'You are bad.', //自我介绍
				username:'Mr. Zha'
			}]
		},
		unreadAddFriendReply: {//我加别人，别人给回复
			count: 0,
			unreadList: [{
				id:1,
				acceptStatus:true,
				targetName:'Hetler',
			},{
				id:2,
				acceptStatus:false,
				targetName:'Trumple',
			}]
		},
		username: "zzj"
	},
	status: 200
});
