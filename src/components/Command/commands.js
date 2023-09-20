import { actionType } from './type'

export const commands = [
    // // 设置
    // {
    //     keywords:'setting 设置 user head 头像',
    //     rep:'设置: 用户头像',
    //     rep_en:'Setting: User Head',
    //     action:actionType.SETTING_HEAD,
    // },
    // {
    //     keywords:'setting 设置 user name nikename 名字 昵称',
    //     rep:'设置: 用户昵称',
    //     rep_en:'Setting: User Nikename',
    //     action:actionType.SETTING_USER_NAME,
    // },
    // 图片
    {
        keywords:'send 发送 image 图片',
        rep:'发送: 发送图片',
        rep_en:'Send: Send Image',
        action:actionType.SEND_IMAGE,
    },
    // 音乐
    {
        keywords:'send 发送 music 音乐',
        rep:'发送: 发送音乐',
        rep_en:'Send: Send Music',
        action:actionType.SEND_MUSIC,
    },
    //房间
    {
        keywords:'room 房间 create 创建',
        rep:'房间: 创建房间',
        rep_en:'Room: Create Room',
        action:actionType.CREATE_ROOM,
    }, 
    {
        keywords:'room 房间 join 加入',
        rep:'房间: 加入房间',
        rep_en:'Room: Join Room',
        action:actionType.JOIN_ROOM,
    },
    // 账号
    {
        keywords:'login 登录 account 账号 user 用户',
        rep:'账号: 账号登录',
        rep_en:'Account: Account Login',
        action:actionType.Login,
    },
    {
        keywords:'setting 设置 account 账号 user 用户 head 头像 nikename 名字 昵称',
        rep:'账号: 账号设置',
        rep_en:'Account: Account Setting',
        action:actionType.SETTING_USER_DATA,
    },
]