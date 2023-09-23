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
        // const src = song.source.map(i=>i.url)
        // const options = {
        //     src,
        //     autoplay:true,
        //     preload:false,
        // }
        
        // for(let event of events){
        //     const et = `on${event}`
        //     if(this[et] && this[et] instanceof Function){
        //         options[et] = this[et].bind(this,song)
        //     }
        // }

        // const sound = new Howl(options)
        // this.songList.push({
        //     ...song,
        //     sound,
        // })
        this.songList.push(song)
        console.log(this.songList);
    }

    getSound(song){
        const songindex = this.songList.findIndex(i=>i.id === song.id)
        const _song = this.songList[songindex]
        if(_song.sound) return _song
        const src = _song.source.map(i=>i.url)
        const options = {
            src,
            autoplay:true,
            preload:false,
        }
        
        for(let event of events){
            const et = `on${event}`
            if(this[et] && this[et] instanceof Function){
                options[et] = this[et].bind(this,song)
            }
        }
        const sound = new Howl(options)
        _song.sound = sound
        return _song
        // return this.songList.find(i=>i.id === song.id)
    }

    playSong(song){
        console.log('playSong',this.song,song);
        if(this.song.id === song.id && this.sound) return this.sound.play()
        this.sound && this.sound.unload()
        this.song = song
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
                this[method] = this.sound[method].bind(this.sound)
            }
        }
        // 绑定事件
        for(let event of events){
            const et = `on${event}`
            if(this[et] && this[et] instanceof Function){
                this.sound.on(event,this[et].bind(this))
            }
        }
    }

    previousSong(){
        console.log('上一首',this.songIndex)
        console.log({songList:this.songList});
        if(this.songIndex === 0) return
        this.songIndex--
        this.playSong(this.songList[this.songIndex])
    }

    nextSong(){
        console.log('下一首:',this.songIndex)
        console.log({songList:this.songList});
        if(this.songIndex === this.songList.length - 1) return 
        this.songIndex++
        this.playSong(this.songList[this.songIndex])
    }

    playingSong(){
        return this.song
    }

    onload(song){
        console.log('加载成功',song.name);
    }
    onloaderror(song){
        console.log('加载失败',song.name);
    }
    onplayerror(song){
        console.log('播放错误',song.name);
    }
    onplay(song){
        this.song = song
        console.log('播放开始',song.name);
    }
    onend(){
        console.log('播放完毕');
        this.nextSong()
    }
    onpause(){
        console.log('播放暂停');
    }
    onstop(song){
        console.log('播放停止',song.name);
    }
}

export default Music