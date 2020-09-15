export default time => {

  return new Promise(resolve => {

    setTimeout(() => {

      resolve(true)
    }, time)
  })
}