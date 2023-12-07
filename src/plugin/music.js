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

        this.eventMap = {}
        Music.instance = this
        window.music = this
    }

    static getInstance(){
        return Music.instance
    }

    on(event,fn){
        if(!event || !fn) return console.error('参数不全')
        console.log('添加事件：',event,fn);
        if(this.eventMap[event]){
            this.eventMap[event].push(fn)
        }else{
            this.eventMap[event] = [
                fn
            ]
        }
    }
    off(event,fn){
        if(!event) return console.error('参数不全')
        if(!this.eventMap[event]) return
        if(fn){
            console.log('移除事件:',event,this.eventMap[event].filter(f=>f===fn));
            this.eventMap[event] = this.eventMap[event].filter(f=>f!==fn)
        }else{
            this.eventMap[event] = []
            console.log('移除所有事件:',event);
        }
    }

    once(event,fn){
        if(!event || !fn) return console.error('参数不全')
        const f = (...arg)=>{
            this.off(event,f)
            fn(...arg)
        }

        this.on(event,f)
    }

    triggerEvent(event,...arg){
        if(this.eventMap[event]){
            this.eventMap[event].forEach(fn=>fn(...arg))
        }
    }

    addSong(song){
        this.songList.push(song)
        console.log(this.songList);
    }

    getSound(song){
        this.songIndex = this.songList.findIndex(i=>i.id === song.id)
        const _song = this.songList[this.songIndex]
        if(_song.sound) return _song
        const src = _song.source.map(i=>i.url)
        const options = {
            src,
            html5:true,
            autoplay:true,
            preload:false,
        }
        
        for(let event of events){
            const et = `on${event}`
            if(this[et] && this[et] instanceof Function){
                options[et] = this[et].bind(this,_song)
            }
        }
        const sound = new Howl(options)
        _song.sound = sound
        return _song
    }

    playSong(song){
        this.songIndex = this.songList.findIndex(i=>i.id === song.id)
        const _song = this.songList[this.songIndex]
        this.triggerEvent('change',_song)
        return _song
    }

    previousSong(){
        console.log('上一首',this.songIndex)
        if(this.songIndex === 0) return
        this.songIndex--
        const song = this.songList[this.songIndex]
        this.triggerEvent('change',song)
        // this.playSong(this.songList[this.songIndex])
    }

    nextSong(){
        console.log('下一首:',this.songIndex)
        if(this.songIndex === this.songList.length - 1) return 
        this.songIndex++
        const song = this.songList[this.songIndex]
        // const sound = this.getSound(song)
        // sound.onload
        this.triggerEvent('change',song)
        // this.playSong(this.songList[this.songIndex])
    }

    playingSong(){
        return this.song
    }

    onload(song){
        console.log('加载成功',song.name);
        this.triggerEvent('load',song)
    }
    onloaderror(song){
        console.log('加载失败',song.name);
        this.triggerEvent('loaderror',song)
    }
    onplayerror(song){
        console.log('播放错误',song.name);
        this.triggerEvent('playerror',song)
    }
    onplay(song){
        this.song = song
        console.log('播放开始',song.name);
        this.triggerEvent('play',song)
    }
    onend(song){
        console.log('播放完毕',song.sound.loop());
        song.sound.loop() || this.nextSong()
        this.triggerEvent('end',song)
    }
    onpause(song){
        console.log('播放暂停');
        this.triggerEvent('pause',song)
    }
    onstop(song){
        console.log('播放停止',song.name);
        this.triggerEvent('stop',song)
    }
}

export default Music