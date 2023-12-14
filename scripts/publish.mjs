#!/usr/bin/env zx
import dotenv from 'dotenv'
dotenv.config()
const {HOST_IP,SERVER_PWD} = process.env

await $`npm run build`

await $`scp -r dist/ root@${HOST_IP}:${SERVER_PWD}`
  .pipe(process.stdout)
