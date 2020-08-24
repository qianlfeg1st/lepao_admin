/**
 * 将时间戳格式化为 2018-08-08 08:08:08
 */
export default timeStamp => {

  if (!timeStamp) return ''

  const date = new Date(+timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const formatNumber = num => {
    const str = num.toString()
    return str[1] ? str : `0${str}`
  }

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
