import {Howl} from 'howler'


let handles = []
class Music {
    static instance
    constructor(){
        if(Music.instance) return Music.instance
        // 音乐列表
        this.songList = []
        // 正在播放音乐索引
        this.currentSongIndex = 0
        // 正在播放的音乐
        this.currentSong = ''
        // 当前Howl 实例 
        this.sound = ''
        Music.instance = this
    }

    static getInstance(){
        return Music.instance
    }

    addSong(song){
        this.songList.push(song)
    }

    playSong(song){
        if(!song){
            this.currentSong = this.songList[this.currentSongIndex]
        }else{
            this.currentSong = song
        }
        if(!this.currentSong) return
        this.sound && this.sound.unload()
        const src = this.currentSong.source.map(i=>i.url)
        this.sound = new Howl({
            src,
            html5:true,
            autoplay:true,
        })

        this.sound.onend = this.nextSong

        if(!handles.length) handles = Object.keys(Object.getPrototypeOf(this.sound))
        for(let key of handles){
            if(!this.hasOwnProperty(key)){
                this[key] = handles[key]
            }
        }
    }

    previousSong(){
        console.log('Music previousSong',this.currentSongIndex)
        if(this.currentSongIndex === 0) return
        this.currentSongIndex--
        this.play()
    }

    nextSong(){
        console.log('Music nextSong',this.currentSongIndex)
        if(this.currentSongIndex === this.songList.length - 1) return 
        this.currentSongIndex++
        this.play()
    }

    playingSong(){
        return this.currentSong
    }
}

export default Music