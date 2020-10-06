const url = {
  dev: 'https://app.happyrun.cn/master/hc2/',
  test: 'https://app.happyrun.cn/master/hc2/',
  prod: 'https://api.03os.com/admin/',
}

const baseURL = url[process.env.REACT_APP_ENV]
const imgURL = ''

export {
  baseURL,
  imgURL,
}
