let value= {
    chatList: [
      // {
      //   name: "zzj",
      //   id: 0
      // },
      // {
      //   name: "skr",
      //   id: 1
      // }
    ], //聊天列表id为索引号
    myself: {
      name: "myself",
      id: 1
    },
    current: [
      {
        name: "",
        id: 0,
        unreadMessageNum:0,
      }
    ], //当前选中的聊天对象
    currentMessage: [], //与当前选中的聊天对象的聊天信息
    messageList: [
      //总聊天信息，和chatList相对应
      // [
      //   {
      //     content: "一号消息",
      //     myself: true,
      //     participantId: 1,
      //     timestamp: {
      //       year: 2012,
      //       month: 3,
      //       day: 5,
      //       hour: 20,
      //       minute: 10,
      //       second: 3,
      //       millisecond: 123
      //     },
      //     uploaded: true,
      //     viewed: true
      //   }
      // ],
      // [
      //   {
      //     content: "二号消息",
      //     myself: true,
      //     participantId: 1,
      //     timestamp: {
      //       year: 2012,
      //       month: 3,
      //       day: 5,
      //       hour: 20,
      //       minute: 10,
      //       second: 3,
      //       millisecond: 123
      //     },
      //     uploaded: true,
      //     viewed: true
      //   }
      // ]
    ],
    visible: true, //与v-if 一起使用，暂未用到
    chatTitle: "My chat title", //聊天标题 暂未用到（可改为聊天对象姓名）
    placeholder: "send your message", //输入框填充字
    colors: {
      //框头，信息，消息框的颜色设置
      header: {
        bg: "#708090",
        text: "#fff"
      },
      message: {
        myself: {
          bg: "#fff",
          text: "#bdb8b8"
        },
        others: {
          bg: "#fb4141",
          text: "#fff"
        },
        messagesDisplay: {
          //bg: 'rgb(247, 243, 243)',
          //bg: '#f7f3f3'
          bg: "#f7f3f3"
        }
      },
      submitIcon: "#b91010" //发送图标
    },
    borderStyle: {
      //聊天框border 曲角程度
      topLeft: "10px",
      topRight: "10px",
      bottomLeft: "10px",
      bottomRight: "10px"
    },
    hideCloseButton: false,
    submitIconSize: "40px",
    closeButtonIconSize: "20px",
    asyncMode: true,
  };
export default value;