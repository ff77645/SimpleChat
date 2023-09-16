import { actionType } from './type'

export const commands = [
    // 设置
    {
        keywords:'setting 设置 user head 头像',
        rep:'设置: 用户头像',
        rep_en:'setting: user head',
        action:actionType.SETTING_HEAD,
    },
    {
        keywords:'setting 设置 user name nikename 名字 昵称',
        rep:'设置: 用户昵称',
        rep_en:'setting: user nikename',
        action:actionType.SETTING_USER_NAME,
    },

    // 发送表情
    // {
    //     keywords:'send 发送 emoji 表情',
    //     rep:'发送: 表情',
    //     rep_en:'send: emoji',
    //     action:actionType.SEND_EMOJI,
    // },
    // {
    //     keywords:'send 发送 emoji 表情 favorite 收藏',
    //     rep:'发送: 收藏表情',
    //     rep_en:'send: favorite emoji',
    //     action:actionType.SEND_FAV_EMOJI,
    // },

    // 发送图片
    {
        keywords:'send 发送 image 图片',
        rep:'发送: 图片',
        rep_en:'send: image',
        action:actionType.SEND_IMAGE,
    },

    // 发送音乐
    {
        keywords:'send 发送 music 音乐',
        rep:'发送: 音乐',
        rep_en:'send: music',
        action:actionType.SEND_MUSIC,
    },
    //
    {
        keywords:'room 房间 create 创建',
        rep:'房间: 创建房间',
        rep_en:'room: create room',
        action:actionType.CREATE_ROOM,
    }, 
    {
        keywords:'room 房间 join 加入',
        rep:'房间: 加入房间',
        rep_en:'room: join room',
        action:actionType.JOIN_ROOM,
    }, 
]