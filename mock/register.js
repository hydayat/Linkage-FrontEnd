import Mock from 'mockjs';
export default Mock.mock('/signup/user', "post", [
	{
		username: 'Luo Hao',
		description: 'A good software engineer.'
	}
]);
