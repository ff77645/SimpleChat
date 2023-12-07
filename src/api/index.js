import request from "../utils/request";


// 登录
export function login(data){
  return request.post('/v1/auth/login',data)
}

// 更新用户数据
export function updateUserData(data){
  return request.post('/v1/auth/update-user',data)
}

// 获取用户信息
export function getUserInfo(params){
  return request.get('/v1/auth/user-info',{params})
}

// 创建房间
export function createRoom(data){
  return request.post('/v1/room/create',data)
}

// 加入房间
export function joinRoom(data){
  return request.post('/v1/room/join',data)
}