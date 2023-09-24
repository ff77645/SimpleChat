import {Howl} from 'howler'

let methods = []
const events = ['load', 'loaderror', 'playerror', 'play', 'end', 'pause', 'stop', 'mute', 'volume', 'rate', 'seek', 'fade', 'unlock']
class Music {
    static instance
    constructor(){
        if(Music.instance) return Music.instance
        // 音乐列表
        this.songList = [
            {
                "name": "小苹果",
                "id": 1848183029,
                "songer": "呼禾",
                "time": 211012,
                "source": [
                    {
                        "level": "exhigh",
                        "type": "mp3",
                        "url": "http://m801.music.126.net/20230924023406/a23a32a79c71783d614271e09bbfa3de/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/9173996444/5a98/7fdf/2019/d676ab0182719aef273db365daade921.mp3",
                        "size": 8442819,
                        "id": 1848183029
                    },
                    {
                        "url": "https://music.163.com/song/media/outer/url?id=1848183029.mp3",
                        "type": "mp3"
                    }
                ],
                "picUrl": "http://p1.music.126.net/EhyM-E28jiDyohb8Pa8qaQ==/109951166035069093.jpg",
                "userId": 1,
                "avatar": "http://files.summer9.cn/blob:http://localhost:1420/8a085e41-4167-494f-b2e7-e9457317e3b8",
                "nickname": "哈哈哈哈哈",
                "date": "2023-09-23T18:09:06.559Z"
            },
            {
                "name": "爱",
                "id": 31877581,
                "songer": "黄丽玲",
                "time": 252995,
                "source": [
                    {
                        "level": "standard",
                        "type": "mp3",
                        "url": "http://m701.music.126.net/20230924200506/4c1d891a32bc958d8336f93910fd0711/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481999939/aeff/3063/6826/80471ccd1ae56898e9cdbc3513549638.mp3",
                        "size": 4049232,
                        "id": 31877581
                    },
                    {
                        "url": "https://music.163.com/song/media/outer/url?id=31877581.mp3",
                        "type": "mp3"
                    }
                ],
                "picUrl": "http://p1.music.126.net/moyoIrBy3ZIRdQAB6TvqqA==/7894493488261733.jpg",
                "avatar": "http://pic.yupoo.com/isfy666/ca92284b/96330991.jpeg",
                "date": "2023-09-24T11:40:07.054Z"
            }
        ]
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