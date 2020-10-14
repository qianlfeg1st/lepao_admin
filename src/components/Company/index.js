import React, { useState, useEffect, useContext } from 'react'
import { useHistory, withRouter, Link } from 'react-router-dom'
import { RouteConfigContext } from '@/router'
import { Row, Col } from 'antd'
import styles from './index.module.scss'

const topMenu = {
  company: '/join',
  goods: '/goods',
  user: '/user'
}

function Admin (props) {

  const history = useHistory()

  const { location, children } = props

  // 获取全部路由对象
  const RouteConfig = useContext(RouteConfigContext)

  // console.log('RouteConfig', RouteConfig)

  const [current, setCurrent] = useState('')

  useEffect(() => {

    // 导航栏路由切换匹配
    const pathname = location.pathname

    // console.log('location.pathname', location.pathname)

    if (!pathname) return

    const targetRoute = RouteConfig.find(item => item.path.split('/')[2] === pathname.split('/')[2])

    // console.log('@@targetRoute@@', targetRoute)

    if (!targetRoute) return

    setCurrent(targetRoute.navMenu)
  }, [location.pathname])

  return (
    <>

      <div className={ styles.wrap }>
        <Row className={ styles.header }>

          <Col span={ 5 } className={ styles.header__left }>
            <img className={ styles.header__logo } src={ require('../../assets/images/logo.png') } alt="乐跑健康" />
            <div className={ styles.header__name }>乐跑健康企业平台</div>
          </Col>

          <Col span={ 9 } className={ styles.header__center }>
            <Link to="/company/index" className={ `${styles.header__menu} ${current === 'index' && styles.header__active}` }>首页</Link>
            <Link to="/company/staff" className={ `${styles.header__menu} ${current === 'staff' && styles.header__active}` }>员工</Link>
            <Link to="/company/goods" className={ `${styles.header__menu} ${current === 'goods' && styles.header__active}` }>奖品</Link>
          </Col>

          <Col span={ 10 } className={ styles.header__right }>
            <Link to="/company/address" className={ styles.header__address }>
              <img src={ require('../../assets/images/address.png') } />
              企业收寄地址
            </Link>

            <Link to="/company/account" className={ styles.header__account }>
              <img src={ require('../../assets/images/account.png') } />
              账号管理
            </Link>

            <div className={ styles.header__line }>|</div>

            <div className={ styles.header__user }>
              <img src={ require('../../assets/images/111.png') } />
              管理员
            </div>

            <div className={ styles.header__service }>
              <img src={ require('../../assets/images/service.png') } />
              在线客服
            </div>
          </Col>
        </Row>
      </div>

      <div className={ styles.body }>

        {
          ['/company/goods', '/company/prize', '/company/inventory', '/company/gold', '/company/exchange'].includes(location.pathname) && (
            <div className={ styles.nav }>
              <Link to="/company/goods" className={ styles.nav__item }>{ location.pathname === '/company/goods' && '>' }当前奖品</Link>
              <Link to="/company/prize" className={ styles.nav__item }>{ location.pathname === '/company/prize' && '>' }挑选奖品</Link>
              <Link to="/company/inventory" className={ styles.nav__item }>{ location.pathname === '/company/inventory' && '>' }奖品库存管理</Link>
              <Link to="/company/gold" className={ styles.nav__item }>{ location.pathname === '/company/gold' && '>' }积分管理</Link>
              <Link to="/company/exchange" className={ styles.nav__item }>{ location.pathname === '/company/exchange' && '>' }员工兑换订单</Link>
            </div>
          )
        }

        { children }
      </div>

    </>
  )
}

export const AdminContext = React.createContext()

export default withRouter(Admin)
