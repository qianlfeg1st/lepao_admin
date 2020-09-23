const url = {
  dev: 'http://47.99.193.34/master/hc2/',
  test: 'https://api.03os.com/admin/',
  prod: 'https://api.03os.com/admin/',
}

const baseURL = url[process.env.REACT_APP_ENV]
const imgURL = ''

export {
  baseURL,
  imgURL,
}
