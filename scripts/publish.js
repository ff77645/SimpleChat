import fs from 'fs'
import FormData from 'form-data'
import path from 'path'
import { fileURLToPath } from 'url';

function uploadFolder(folderPath,url){
  const form = new FormData()
  const files = fs.readdirSync(folderPath)
  files.forEach(file => {
    const p = folderPath + '/' + file
    if(file === 'assets' ) return 
    console.log(p);
    form.append('files', fs.createReadStream(p),file)
  })
  // console.log({form});
  return fetch(url, {
    // headers:{
    //   'Content-Type':'multipart/form-data'
    // },
    method: 'POST',
    body: form
  })
}

const folderPath = path.join(path.resolve(),'dist')
const url = 'http://127.0.0.1:8787/api/chat/release'

uploadFolder(folderPath,url)
.then(res => res.text())
.then(text => console.log(text))