import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/log',
		name: 'log',
		component: () => import('../views/Me/Log.vue'),
		// children:[
		// 	{
		// 		path:'log',
		// 		component:()=>import('../views/Me/Log.vue')
		// 	},
		// 	{
		// 		path:'account',
		// 		component:()=>import('../views/Me/Account.vue')
		// 	},
		// 	{
		// 		path:'friends',
		// 		component:()=>import('../views/Me/Friends.vue')
		// 	}
		// ]
	},
	{
		path:'/register',
		name:'register',
		component:()=>import('../views/Me/Register.vue')
	},
	{
		path:'/forgetPassword',
		name:'forgetPassword',
		component:()=>import('../views/Me/ForgetPassword.vue')
	},
	{
		path:'/account',
		component:()=>import('../views/Me/Account.vue')
	},
	{
		path:'/friends',
		name:'friends',
		component:()=>import('../views/Me/Friends.vue')
	},
	{
		path:'/addFriend',
		component:()=>import('../views/Me/AddFriend.vue')
	},
	{
		path: '/message',
		name: 'message',
		component: () => import('../views/Message/Message.vue')
	},
	{
		path: '/browseMoments',
		component: () => import('../views/Moments/BrowseMoments.vue')
	},
	{
		path: '/shareMoments',
		component: () => import('../views/Moments/ShareMoments.vue')
	},
	{
		path: '/chat',
		name:'chat',
		component: () => import('../views/Message/Chat.vue')
	},
	{
		path: '/invitation',
		name:'invitation',
		component: () => import('../views/Message/Invitation.vue')
	},
	{
		path: '/subscription',
		name: 'subscription',
		component: () => import('../views/Me/Subscription.vue')
	},
	{
		path: '/addSubscription',
		component: () => import('../views/Me/AddSubscription.vue')
	},
	{
		path: '/myMoments',
		component: () => import('../views/Me/MyMoments.vue')
	},
	{
		path: '/myPosts',
		component: () => import('../views/Me/MyPosts.vue')
	},
	{
		path: '/friendDetail',
		name: 'friendDetail',
		component: () => import('../views/Me/FriendDetail.vue')
	},
	{
		path: '/subscriptionDetail',
		name: 'subscriptionDetail',
		component: () => import('../views/Me/SubscriptionDetail.vue')
	},
	{
		path: '/hisMoments',
		name: 'hisMoments',
		component: () => import('../views/Me/HisMoments.vue')
	},
	{
		path: '/itsPosts',
		name: 'itsPosts',
		component: () => import('../views/Me/ItsPosts.vue')
	},
	{
		path: '/followers',
		name: 'followers',
		component: () => import('../views/Me/Followers.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
