
// export const commands = [
//     {
//         rep:'setting',
//         rep_ch:'设置',
//         des:'修改设置',
//         subs:[
//             {
//                 rep:'head',
//                 rep_ch:'头像',
//                 des:'设置或修改你的头像',
//                 tips:'setting head [url]',
//                 tips_ch:'设置 头像 [头像链接]'
//             },
//             {
//                 rep:'name',
//                 rep_ch:'名称',
//                 des:'设置或修改你的昵称'
//             }
//         ]
//     },
//     {
//         rep:'music',
//         rep_ch:'音乐',
//         des:'分享音乐',
//         subs:[
//             {
//                 rep:'search',
//                 rep_ch:'搜索',
//                 des:'搜索音乐'
//             },
//             {
//                 rep:'history',
//                 rep_ch:'历史',
//                 des:'音乐搜索历史'
//             }
//         ]
//     },
//     {
//         rep:'emoji',
//         rep_ch:'表情',
//         des:'发送表情',
//         subs:[
//             {
//                 rep:'favorite',
//                 rep_ch:'收藏',
//                 des:'查看收藏的表情包'
//             }
//         ]
//     },
//     {
//         rep:'image',
//         rep_ch:'图片',
//         des:'分享图片'
//     }
// ]


export const commands = [
    // 设置
    {
        keywords:'setting 设置 user head 头像',
        des:'设置: 用户头像',
        des_en:'setting: user head',
    },
    {
        keywords:'setting 设置 user name nikename 名字 昵称',
        des:'设置: 用户昵称',
        des_en:'setting: user nikename',
    },

    // 发送表情
    {
        keywords:'send 发送 emoji 表情',
        des:'发送: 表情',
        des_en:'send: emoji',
    },
    {
        keywords:'send 发送 emoji 表情 favorite 收藏',
        des:'发送: 收藏表情',
        des_en:'send: favorite emoji',
    },

    // 发送图片
    {
        keywords:'send 发送 image 图片',
        des:'发送: 图片',
        des_en:'send: image',
    },

    // 发送音乐
    {
        keywords:'send 发送 music 音乐',
        des:'发送: 音乐',
        des_en:'send: music',
    },
]