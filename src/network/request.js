import axios from 'axios'

// ES6 Promise的封装
export function request_POST(url, options={}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: 'http://49.234.93.13:8001'+url,
      data: options,
      timeout: 5000,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// ES6 Promise的封装
export function request_GET(url, options={}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'http://49.234.93.13:8001'+url,
      params: options,
      timeout: 5000,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
