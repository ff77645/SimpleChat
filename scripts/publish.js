import fs from 'fs'
import FormData from 'form-data'
import path from 'path'
import { fileURLToPath } from 'url';

async function uploadFolder(folderPath,url){

  const data = await readFile(folderPath + '/index.html')
  url = url + '?path=html/index.html'
  return fetch(url, {
    headers:{
      // 'Content-Type':'multipart/form-data;boundary=files'
      // 'Content-Type':'application/x-www-form-urlencoded'
      'Content-Type':'application/octet-stream'
    },
    method: 'POST',
    body: data
  })
}

// node将文件读取为arrayBuffer
function readFile(filePath){
  return new Promise((resolve,reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

const folderPath = path.join(path.resolve(),'dist')
const url = 'http://localhost:8787/api/chat/release'

uploadFolder(folderPath,url)
.then(res => res.json())
.then(text => console.log(text))