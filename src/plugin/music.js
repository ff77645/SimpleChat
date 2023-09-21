import {Howl} from 'howler'


class Music {
    static instance
    constructor(){
        if(Music.instance) return Music.instance
        // 音乐列表
        this.songList = []
        // 正在播放音乐索引
        this.playSongIndex = 0
        // 正在播放的音乐
        this.playSong = ''
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

    play(songId){
        if(songId){
            this.playSongIndex = this.songList.findIndex(i=>i.id === songId)
        }
        this.playSong = this.songList[this.playSongIndex]
        if(!this.playSong) return
        this.sound = new Howl({
            src:[],
        })
        this.sound.onload = this.onload
        this.sound.onend = this.onend
    }

    previousSong(){
        if(this.playSongIndex === 0) return
        this.playSongIndex--
        this.play()
    }

    nextSong(){
        if(this.playSongIndex === this.songList.length - 1) return 
        this.playSongIndex++
        this.play()
    }

    playing(){
        return this.sound
    }

    onload(){

    }

    onend(){
        this.nextSong()
    }
}