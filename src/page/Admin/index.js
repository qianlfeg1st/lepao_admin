import React, { useState, useEffect, useContext, useReducer } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { RouteConfigContext } from '../../router'
import { Row, Col, Menu, Dropdown } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import 'moment/locale/zh-cn' // 配置moment为中文
import api from '@/api'
import * as reducer from '../../reducer'

const { SubMenu } = Menu

function User (props) {

  const history = useHistory()

  const { location, targetRouterConfig, } = props

  // 获取父组件中匹配到的路由对象
  const [routeChildren, setRouteChildren] = useState(targetRouterConfig)
  // 获取全部路由对象
  const RouteConfig = useContext(RouteConfigContext)

  // console.log('RouteConfig', RouteConfig)

  const [selectedKeys, setSelectedKeys] = useState('/join')

  const [
    state,
    dispatch
  ] = useReducer(reducer.reducer, reducer.initialState)

  useEffect(() => {

    // 导航栏路由切换匹配
    const pathname = location.pathname

    // console.log('~~~~useEffect~~~~', pathname, selectedKeys, typeof selectedKeys)

    if (pathname) {

      const targetRoute = RouteConfig.find(item => item.path === pathname)

      if (targetRoute) {

        setSelectedKeys(pathname)
      }

      setRouteChildren(targetRoute)
    }
  }, [selectedKeys])

  const handleRouteClick = e => {

    // console.log('[e.keyPath[0]]', e.keyPath[0])

    setSelectedKeys(e.keyPath[0])
  }

  const logout = async () => {

    try {

      const { status } = await api.logout()

      if (status) {

        sessionStorage.clear()
        history.push('/login')
      }
    } catch (error) {

      console.log(error)
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <span className={ styles.logouTitle } onClick={ logout }>登 出</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={ styles.pageWrapper }>

      <Row className={ styles.header } id="header">
        <Col span={ 18 } className={ styles.header__left }>
          <img className={ styles.header__logo } src={ require(`../../assets/logo.png`) } alt="" />
          <div className={ styles.header__name }>控制台</div>
        </Col>
        <Col span={ 6 } className={ styles.header__right }>
          <Dropdown overlay={ menu } trigger={['click']}>
            <span>
              { sessionStorage.getItem('account') } <DownOutlined />
            </span>
          </Dropdown>
        </Col>
      </Row>

      <Row className={ styles.body }>
        <Col span={ 3 } className={ styles.aside }>
          <Menu onClick={ handleRouteClick } mode="inline" selectedKeys={ selectedKeys }>

            <Menu.Item key="/join" onClick={ () => history.push('/join') }>企业入驻</Menu.Item>

            <Menu.Item key="/staff" onClick={ () => history.push('/staff') }>企业员工</Menu.Item>

          </Menu>
        </Col>

        <AdminContext.Provider value={ [state.height, dispatch] }>
          <Col span={ 21 } className={ styles.main } id="main">{ routeChildren?.children }</Col>
        </AdminContext.Provider>
      </Row>
    </div>
  )
}

export const AdminContext = React.createContext()

export default withRouter(User)
