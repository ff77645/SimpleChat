#!/usr/bin/env zx
import dotenv from 'dotenv'
dotenv.config()
const {HOST_IP,SERVER_PWD} = process.env

await $`npm run build`

await $`scp -r dist/ root@${ip}:${pwd}`
  .pipe(process.stdout)
