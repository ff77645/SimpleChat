import {
    urlSafeBase64Encode,
    upload,
    compressImage as qiniu_compressImage,
} from 'qiniu-js'
import dayjs from 'dayjs'
import {qiniu} from '../config'
import {hmacSha1,base64UrlSafeEncode} from './index'

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
    const token = generateUploadToken(qiniu)
    const observable = upload(file, name, token, putExtra, config)
    observable.subscribe({
        next(res){
          console.log('next',res)
        },
        error(err){
          console.log('err0r',err)
        },
        complete(res){
          console.log('complete',res)
        }
      })
}


export const compressImage = (file,options={})=>{
    return qiniu_compressImage(file,{
        ...options,
    })
}
