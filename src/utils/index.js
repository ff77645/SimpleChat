import jshashes from 'jshashes'
import SparkMD5 from 'spark-md5'

export function base64ToFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}


export function base64ToBlob(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}


export function blobToFile(blob,type) {
    return new File([blob], 'filename', { type: type || 'image/jpeg' })
}


export function hmacSha1(key,str){
    return (new jshashes.SHA1).b64_hmac(key,str)
}


export function base64UrlSafeEncode(target) {
    return target.replace(/\//g, '_').replace(/\+/g, '-')
}


export function fileToBase64(file){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader()
        reader.onload = e =>{
            resolve(e.target.result)   
        }
        reader.readAsDataURL(file)
    })
}


export function getFileMd5(file,chunkSize){
    chunkSize = chunkSize || 1024 * 1024 * 2
    const chunks = Math.ceil(file.size / chunkSize)
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    let resolve,reject
    let chunk = 0

    const loadFile = ()=>{
        const start = chunk * chunkSize
        const subFile = file.slice(start,start+chunkSize)
        fileReader.readAsArrayBuffer(subFile)
    }

    fileReader.onload = e =>{
        spark.append(e.target.result)
        chunk++
        if(chunk === chunks) return resolve(spark.end())
        loadFile()
    }

    fileReader.onerror = err=>reject(err)

    loadFile()

    return new Promise((res,rej)=>{
        resolve = res
        reject = rej
    })
}

export function mergeChunksForArrayBuffer(chunks,type){
    chunks.sort((pre,next)=>pre.chunk - next.chunk)
    return new File([new Blob(chunks.map(i=>i.blob))],'filename',{type:type || 'image/jpeg'})
}