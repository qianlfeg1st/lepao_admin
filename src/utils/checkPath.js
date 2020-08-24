export default (path, route) => {

  let arr = []

  path = path.split('/')
  route = route.split('/')

  path.shift()
  route.shift()

  for (let i = 0; i < (path.length > route.length ? path.length : route.length); i++) {

    let isParam = route[i] && route[i].includes(':')
    let isOptional = route[i] && route[i].includes('?')

    if (path[i] === route[i] || (isParam && path[i] !== route[i]) || (isOptional && !path[i])) {

      arr.push(true)
    } else {

      arr.push(false)
    }
  }

  if (arr.every(item => item === true)) return true
}