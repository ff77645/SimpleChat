import jshashes from 'jshashes'

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
