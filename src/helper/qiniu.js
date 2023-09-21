import {
    urlSafeBase64Encode,
    upload,
    compressImage as qiniu_compressImage,
} from 'qiniu-js'
import dayjs from 'dayjs'
import cfg_qiniu from '../config/qiniu'
import {hmacSha1,base64UrlSafeEncode} from '../utils'

// https://developer.qiniu.com/kodo/1283/javascript


export function generateUploadToken(options) {
    const { bucketName, assessKey, secretKey } = options
    const deadline = dayjs().unix() + 3600
    const putPolicy = JSON.stringify({ scope: bucketName, deadline })
    const encodedPutPolicy = urlSafeBase64Encode(putPolicy)
    const sign = base64UrlSafeEncode(hmacSha1(secretKey,encodedPutPolicy))
    const token = `${assessKey}:${sign}:${encodedPutPolicy}`
    return token
}


export const uploadFile = (file,name,putExtra={},config={})=>{
    const token = generateUploadToken(cfg_qiniu)
    const observable = upload(file, name, token, putExtra, config)
    let resolve,reject
    observable.subscribe({
      // next(res){
      //   console.log('next',res)
      // },
      error(err){
        // console.log('err0r',err)
        reject(err)
      },
      complete(res){
        // console.log('complete',res)
        resolve(res)
      }
    })
    return new Promise((res,rej)=>{
      resolve = res
      reject = rej
    })
}


export const compressImage = (file,options={})=>{
    return qiniu_compressImage(file,{
        ...options,
    })
}
