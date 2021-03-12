export default (str = '') => {

  if (!str) return {}

  if (typeof str !== 'string') throw new Error('str must be a string')

  const content = str.split('?')[Number(str.includes('?'))]

  if (!content) return

  return Object.fromEntries(content.split('&').filter(item => item).map(item => {

    const temp = item.split('=')

    return [temp[0], decodeURIComponent(temp[1])]
  }))
}