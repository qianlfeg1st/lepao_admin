
import React, { useState, useEffect, } from 'react'
// import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { common } from '@/api'

function Login (props) {

  console.log('props', props)

  // const RouteHistory = useHistory()

  const handleSubmit = async values => {

    try {

      setLoginLoading(true)

      const { data } = await common.login({
        ...values,
      })

      sessionStorage.setItem('accessToken', data.accessToken)

      message.success('登录成功')

      RouteHistory.push('/join')
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoginLoading(false)
    }
  }

  return (
    <div className={ styles.body }>

      <img src={ require(`../../assets/images/title.png`) } className={ styles.body__title } alt="" />

      <h1 className={ styles.body__subTitle }>再小的个体题，也有自己的品牌</h1>

      <img src={ require(`../../assets/images/test.png`) } className={ styles.body__qrCode } />

      <p className={ styles.body__text }>手机微信扫一扫，使用微信账号</p>

      <p className={ styles.body__text }>登录管理后台</p>

    </div>
  )
}

export default Login