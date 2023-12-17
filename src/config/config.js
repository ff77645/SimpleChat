export const ASSET_PREFIX = 'https://files.summer9.cn/'

// export const BASE_URL = 'http://localhost:80'
let BASE_URL = 'https://summer9.cn'
if(import.meta.env.DEV){
  BASE_URL = 'http://localhost'
}

export {
  BASE_URL
}