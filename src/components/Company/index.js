import React, { useState, useEffect, useContext, useReducer } from 'react'
import { useHistory, withRouter, Link } from 'react-router-dom'
import { RouteConfigContext } from '@/router'
import { Row, Col, Menu, Dropdown } from 'antd'
import styles from './index.module.scss'
import 'moment/locale/zh-cn' // 配置moment为中文

const { SubMenu } = Menu

const topMenu = {
  company: '/join',
  goods: '/goods',
  user: '/user'
}

function Admin (props) {

  // console.log('Admin-props', props)

  const history = useHistory()

  const { location, children } = props

  // 获取全部路由对象
  const RouteConfig = useContext(RouteConfigContext)

  // console.log('RouteConfig', RouteConfig)

  const [current, setCurrent] = useState('')

  useEffect(() => {

    // 导航栏路由切换匹配
    const pathname = location.pathname

    if (!pathname) return

    const targetRoute = RouteConfig.find(item => item.path.split('/')[2] === pathname.split('/')[2])

    // console.log('~~~~~~~~', pathname)

    console.log('@@targetRoute@@', targetRoute)

    if (!targetRoute) return

    setCurrent(targetRoute.navMenu)
  }, [location.pathname])

  const handleClick = e => {

    console.log('handleClick', e)

    // history.push(`/${e.keyPath[0]}`)

    history.push(topMenu[e.key])

    setCurrent(e.key)
  }

  return (
    <>

      <div className={ styles.wrap }>
        <Row className={ styles.header }>
          <Col span={ 7 } className={ styles.header__left }>
            <img className={ styles.header__logo } src={ require('../../assets/images/logo.png') } alt="乐跑健康" />
            <div className={ styles.header__name }>乐跑健康企业平台</div>
          </Col>
          <Col span={ 10 } className={ styles.header__center }>
            <Link to="/company/index" className={ `${styles.header__menu} ${current === 'index' && styles.header__active}` }>首页</Link>
            <Link to="/company/staff" className={ `${styles.header__menu} ${current === 'staff' && styles.header__active}` }>员工</Link>
            <Link to="/company/goods" className={ `${styles.header__menu} ${current === 'goods' && styles.header__active}` }>奖品</Link>
          </Col>
          <Col span={ 7 } className={ styles.header__right }>

          </Col>
        </Row>
      </div>

      <div className={ styles.body }>{ children }</div>

    </>
  )
}

export const AdminContext = React.createContext()

export default withRouter(Admin)
