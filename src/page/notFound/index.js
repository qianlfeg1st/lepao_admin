import React from 'react'
import { useHistory  } from 'react-router-dom'
import styles from './index.module.scss'

function NotFound () {

  const RouteHistory = useHistory()

  const handleNav = () => {

    sessionStorage.getItem('accessTokenGAdmin') ? RouteHistory.push('/station') : RouteHistory.push('/login')
  }

  return (
    <div>
      <img className={ styles.tipImg } title="点击回首页" onClick={ handleNav } alt="" src={ require('./../../assets/images/404.jpg') } />
    </div>
  )

}

export default  NotFound
