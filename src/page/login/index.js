
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { common } from '@/api'
import sleep from '@/utils/sleep'

function Login () {

  const RouteHistory = useHistory()

  const [qrcode, setQrcode] = useState('http://47.99.193.34/master/hc2/company_login/login_mgr_get_qr?secure=')

  const secureRef = useRef(null)

  useEffect(() => {

    getSecure()
    checkLogin()

    return () => {

      // 停止 checkLogin
      secureRef.current = null
    }
  }, [])

  const login = async values => {

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

  const getSecure = async () => {

    try {

      const { data, state } = await common.getSecure()

      if (!state) return

      setQrcode(`${qrcode}${data.stringValue}`)
      secureRef.current = data.stringValue
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const checkLogin = async () => {

    await sleep(3000)

    if (!secureRef.current) return

    try {

      const { data, state } = await common.checkLogin({
        secure: secureRef.current,
      })

      if (!state) return

      checkLogin()

      // console.log('checkLogin', data)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  return (
    <div className={ styles.body }>

      {/* <button onClick={ () => { RouteHistory.push('/join') } }>TEST</button> */}

      <img src={ require(`../../assets/images/title.png`) } className={ styles.body__title } alt="" />

      <h1 className={ styles.body__subTitle }>再小的个体题，也有自己的品牌</h1>

      <img src={ qrcode } className={ styles.body__qrCode } />

      <p className={ styles.body__text }>手机微信扫一扫，使用微信账号</p>

      <p className={ styles.body__text }>登录管理后台</p>

    </div>
  )
}

export default Login