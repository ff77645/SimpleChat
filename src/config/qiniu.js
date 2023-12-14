
const env = import.meta.env

export default {
  bucketName:env.VITE_QINIU_BUCKET,
  assessKey:env.VITE_QINIU_ASSESS_KEY,
  secretKey:env.VITE_QINIU_SECRET_KEY,
}