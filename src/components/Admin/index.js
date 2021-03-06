import React, { useState, useEffect, useContext, useReducer, memo } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { RouteConfigContext } from '@/router'
import { Row, Col, Menu, Dropdown } from 'antd'
import { UserOutlined, HddOutlined, ContainerOutlined, GiftOutlined, TeamOutlined, UserAddOutlined, DownOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import 'moment/locale/zh-cn' // 配置moment为中文
import { common } from '@/api'
import * as reducer from '@/reducer'

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

  const [selectedKeys, setSelectedKeys] = useState(location.pathname)
  const [current, setCurrent] = useState('company')

  const [state, dispatch] = useReducer(reducer.reducer, reducer.initialState)

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

  useEffect(() => {

    dispatch({ type: 'change' })
  }, [location.pathname])

  const handleClick = e => {

    console.log('handleClick', e)

    // history.push(`/${e.keyPath[0]}`)

    history.push(topMenu[e.key])

    setCurrent(e.key)
  }

  const handleRouteClick = e => {

    // console.log('[e.keyPath[0]]', e.keyPath[0])

    setSelectedKeys(e.keyPath[0])
  }

  const logout = async () => {

    try {

      const { status } = await common.logout()

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

  const toCompany = () => {

    const role = JSON.parse(sessionStorage.getItem('role')) || []

    if (role.includes('PBUserRolePrivilegeCompanyMgr')) history.replace('/company/index')
  }

  return (
    <div className={ styles.pageWrapper }>

      <Row className={ styles.header } id="header">

        <Col span={ 6 } className={ styles.header__left }>
          <img className={ styles.header__logo } src={ require(`../../assets/images/logo.png`) } alt="" />
          <div className={ styles.header__name } onClick={ toCompany }>企业乐跑管理后台</div>
        </Col>

        <Col span={ 12 } className={ styles.header__center }>

          <Menu onClick={ handleClick } selectedKeys={ [current] } mode="horizontal" style={{
            background: 'transparent',
            color: '#fff',
            fontSize: '24px',
            border: 0,
          }}>
            <Menu.Item key="company" style={{ border: 0, }}>
              <span className={ current === 'company' ? styles.active : styles.unActive }>企业管理</span>
            </Menu.Item>
            <Menu.Item key="goods" style={{ border: 0, }}>
              <span className={ current === 'goods' ? styles.active : styles.unActive }>商品管理</span>
            </Menu.Item>
            <Menu.Item key="user" style={{ border: 0, }}>
              <span className={ current === 'user' ? styles.active : styles.unActive }>用户管理</span>
            </Menu.Item>
          </Menu>

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

        {
          (current === 'company') && (
            <Col span={ 3 } className={ styles.aside }>
              <Menu onClick={ handleRouteClick } mode="inline" selectedKeys={ selectedKeys }>

                <Menu.Item icon={ <UserAddOutlined /> } key="/join" onClick={ () => history.push('/join') }>企业入驻</Menu.Item>

                <Menu.Item icon={ <TeamOutlined /> } key="/staff" onClick={ () => history.push('/staff') }>企业员工</Menu.Item>

                <Menu.Item icon={ <GiftOutlined /> } key="/prize" onClick={ () => history.push('/prize') }>企业奖品</Menu.Item>

                <Menu.Item icon={ <ContainerOutlined /> } key="/bill" onClick={ () => history.push('/bill') }>企业账单</Menu.Item>

                <Menu.Item icon={ <ContainerOutlined /> } key="/exchange" onClick={ () => history.push('/exchange') }>企业兑换</Menu.Item>

                {/* <Menu.Item icon={ <DollarOutlined /> } key="/point" onClick={ () => history.push('/point') }>企业积分</Menu.Item> */}

                {/* <Menu.Item icon={ <AuditOutlined /> } key="/steps" onClick={ () => history.push('/steps') }>步数统计</Menu.Item> */}

              </Menu>
            </Col>
          )
        }

        {
          (current === 'goods') && (
            <Col span={ 3 } className={ styles.aside }>
              <Menu onClick={ handleRouteClick } mode="inline" selectedKeys={ selectedKeys }>

                <Menu.Item icon={ <HddOutlined /> } key="/goods" onClick={ () => history.push('/goods') }>商品库</Menu.Item>
              </Menu>
            </Col>
          )
        }

        {
          (current === 'user') && (
            <Col span={ 3 } className={ styles.aside }>
              <Menu onClick={ handleRouteClick } mode="inline" selectedKeys={ selectedKeys }>

                <Menu.Item icon={ <UserOutlined /> } key="/user" onClick={ () => history.push('/user') }>用户列表</Menu.Item>
              </Menu>
            </Col>
          )
        }

        <AdminContext.Provider value={{ height: state.height, dispatch }}>
          <Col span={ 21 } className={ styles.main } id="main">{ children }</Col>
        </AdminContext.Provider>
      </Row>
    </div>
  )
}

export const AdminContext = React.createContext()

export default memo(withRouter(Admin))
