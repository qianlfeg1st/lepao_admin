export default str => {

  if (!str) return

  if (typeof str !== 'string') throw new Error('[str]的类型必须是字符串')

  const content = str.split('?')[Number(str.includes('?'))]

  if (!content) return

  return Object.fromEntries(content.split('&').filter(item => item).map(item => {

    const temp = item.split('=')

    return [temp[0], decodeURIComponent(temp[1])]
  }))
}