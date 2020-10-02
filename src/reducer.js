export const initialState = {
  height: 0,
}

export function reducer (state, action) {

  switch (action.type) {

  case 'change':
    return {
      height: getHeight(),
    }

  default:
    throw new Error()
  }
}

function getHeight1 () {

  const header = document.querySelector('#header')
  const pagebar = document.querySelector('.pagebar')
  const searchbar = document.querySelector('.searchbar')
  const arr = [100]

  if (header) arr.push(parseInt(window.getComputedStyle(header).height))
  if (pagebar) arr.push(parseInt(window.getComputedStyle(pagebar).height))

  if (searchbar) {

    const styles = window.getComputedStyle(searchbar)

    arr.push(parseInt(styles.height))
    arr.push(parseInt(styles['margin-bottom']))
  }

  // console.log('~~arr~~', arr)

  return arr.reduce((prev, curr) => prev + curr)
}

function getHeight () {

  let arr = [180];

  [...document.querySelector('#main').children].filter(item => {

    return ![...item.classList].includes('ant-table-wrapper')
  }).forEach(item => {

    arr.push(parseInt(window.getComputedStyle(item).height))
  })

  // console.log('@@@@@@', arr)

  return arr.reduce((prev, curr) => prev + curr)
}