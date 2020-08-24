export default stamp => {

  stamp = new Date(+stamp)

  const getMonth = stamp.getMonth() + 1
  const getDate = stamp.getDate()
  const year = stamp.getFullYear()
  const month = getMonth >= 10 ? getMonth : `0${getMonth}`
  const day = getDate >= 10 ? getDate : `0${getDate}`

  return `${year}-${month}-${day}`
}
