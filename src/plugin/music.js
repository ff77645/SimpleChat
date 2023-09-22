import {Howl} from 'howler'


let methods = []
const events = ['load', 'loaderror', 'playerror', 'play', 'end', 'pause', 'stop', 'mute', 'volume', 'rate', 'seek', 'fade', 'unlock']
class Music {
    static instance
    constructor(){
        if(Music.instance) return Music.instance
        // 音乐列表
        this.songList = []
        // 正在播放音乐索引
        this.songIndex = 0
        // 正在播放的音乐
        this.song = ''
        // 当前Howl 实例 
        this.sound = ''

        Music.instance = this
    }

    static getInstance(){
        return Music.instance
    }

    addSong(song){
        this.songList.push(song)
        console.log('添加歌曲:',song,this.songList);
    }

    playSong(song){
        if(!song){
            this.song = this.songList[this.songIndex]
        }else{
            this.song = song
            this.songIndex = this.songList.findIndex(i=>i.id === song.id)
        }
        if(!this.song) return
        this.sound && this.sound.unload()
        const src = this.song.source.map(i=>i.url)
        this.sound = new Howl({
            src,
            html5:true,
            autoplay:true,
        })


        if(!methods.length) methods = Object.keys(Object.getPrototypeOf(this.sound))
        console.log({methods});

        // 绑定方法
        for(let method of methods){
            if(!this.hasOwnProperty(method)){
                this[method] = this.sound[method]
            }
        }
        // 绑定事件
        for(let event of events){
            const et = `on${event}`
            if(this[et] && this[et] instanceof Function){
                this.sound.on(event,this[et])
            }
        }
    }

    previousSong(){
        console.log('上一首',this.songIndex)
        console.log({songList:this.songList});
        if(this.songIndex === 0) return
        this.songIndex--
        this.playSong()
    }

    nextSong(){
        console.log('下一首:',this.songIndex)
        console.log({songList:this.songList});
        if(this.songIndex === this.songList.length - 1) return 
        this.songIndex++
        this.playSong()
    }

    playingSong(){
        return this.song
    }

    onload(){
        console.log('加载成功');
    }
    onloaderror(){
        console.log('加载失败');
    }
    onplayerror(){
        console.log('播放错误');
    }
    onplay(){
        console.log('播放开始');
    }
    onend(){
        console.log('播放完毕');
        this.nextSong()
    }
    onpause(){
        console.log('播放暂停');
    }
    onstop(){
        console.log('播放停止');
    }
}

export default Music