import React, { useState, useEffect, useContext, useReducer } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { RouteConfigContext } from '@/router'
import { Row, Col, Menu, Dropdown } from 'antd'
import { UserOutlined, HddOutlined, AuditOutlined, DollarOutlined, GiftOutlined, TransactionOutlined, TeamOutlined, UserAddOutlined, DownOutlined } from '@ant-design/icons'
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

  const [selectedKeys, setSelectedKeys] = useState(location.pathname)
  const [current, setCurrent] = useState('company')

  useEffect(() => {

    // 导航栏路由切换匹配
    const pathname = location.pathname

    // console.log('~~~~useEffect~~~~', pathname, selectedKeys, typeof selectedKeys)

    if (!pathname) return

    const targetRoute = RouteConfig.find(item => item.path.split('/')[1] === pathname.split('/')[1])

    // console.log('~~~~~~~~', pathname)

    // console.log('@@targetRoute@@', targetRoute)

    if (targetRoute) {

      setSelectedKeys(targetRoute.path)
      setCurrent(targetRoute.navMenu)
    } else {

      setSelectedKeys()
    }
  }, [selectedKeys, current])

  const handleClick = e => {

    console.log('handleClick', e)

    // history.push(`/${e.keyPath[0]}`)

    history.push(topMenu[e.key])

    setCurrent(e.key)
  }

  return (
    <>

      <Row className={ `${styles.wrap} ${styles.header}` }>
        <Col span={ 7 } className={ styles.header__left }>
          <img className={ styles.header__logo } src={ require('../../assets/images/logo.png') } alt="乐跑健康" />
          <div className={ styles.header__name }>乐跑健康企业平台</div>
        </Col>
        <Col span={ 10 } className={ styles.header__center }>
          <div className={ `${styles.header__menu} ${styles.header__active}` }>首页</div>
          <div className={ styles.header__menu }>员工</div>
          <div className={ styles.header__menu }>奖品</div>
        </Col>
        <Col span={ 7 } className={ styles.header__right }>

        </Col>
      </Row>


      <div className={ styles.body }>{ children }</div>
    </>
  )
}

export const AdminContext = React.createContext()

export default withRouter(Admin)
