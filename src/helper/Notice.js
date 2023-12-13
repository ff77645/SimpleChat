export default class Notice{
  static instance = null
  constructor(){
    if(Notice.instance) return Notice.instance
    this.permission = Notification.permission
    if(this.permission == 'default') this.requestPermission()
    Notice.instance = this
  }

  requestPermission(){
    return Notification.requestPermission().then(res=>{
      this.permission = res
    })
  }

  async show(title,body,icon){
    if(this.permission == 'granted'){
      return new Notification(title,{
        body,
        icon
      })
    }else{
      return this.requestPermission().then(()=>this.show(title,body,icon))
    }
  }
}