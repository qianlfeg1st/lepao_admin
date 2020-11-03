import React, { useState, useEffect, useContext, memo } from 'react'
import { withRouter, Link, useHistory } from 'react-router-dom'
import { RouteConfigContext } from '@/router'
import { Row, Col, Modal, Button, Spin } from 'antd'
import styles from './index.module.scss'
import { company } from '@/api'

const topMenu = [
  {
    name: '首页',
    value: '/company/index',
    menu: 'index',
  },
  {
    name: '员工',
    value: '/company/staff',
    menu: 'staff',
  },
  {
    name: '奖品',
    value: '/company/goods',
    menu: 'goods',
  },
]

const goodsMenu = [
  {
    name: '当前奖品',
    value: '/company/goods',
  },
  {
    name: '挑选奖品',
    value: '/company/prize',
  },
  {
    name: '奖品库存管理',
    value: '/company/inventory',
  },
  {
    name: '积分管理',
    value: '/company/gold',
  },
  {
    name: '员工兑换订单',
    value: '/company/exchange',
  },
]

function Admin (props) {

  const history = useHistory()

  const { location, children } = props

  // 获取全部路由对象
  const RouteConfig = useContext(RouteConfigContext)

  // console.log('RouteConfig', RouteConfig)

  const [current, setCurrent] = useState('')
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState(true)

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

  const handleCancel = () => {

    setModal(false)
  }

  const getServiceInfo = async () => {

    try {

      setLoading(true)
      setModal(true)

      const { state, data } = await company.getServiceInfo()

      if (!state) return

      setService(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  const toAdmin = () => {

    const role = JSON.parse(sessionStorage.getItem('role')) || []

    console.log('~~~~~', role)

    if (role.includes('PBUserRolePrivilegeAdmin')) history.replace('/join')
  }

  return (
    <>

      <div className={ styles.wrap }>
        <Row className={ styles.header }>

          <Col span={ 5 } className={ styles.header__left }>
            <img className={ styles.header__logo } src={ require('../../assets/images/logo.png') } alt="乐跑健康" />
            <div className={ styles.header__name } onClick={ toAdmin }>乐跑健康企业平台</div>
          </Col>

          <Col span={ 9 } className={ styles.header__center }>
            {
              topMenu.map(({ value, name, menu }) => {

                return (
                  <Link
                    key={ value }
                    to={ value }
                    className={ `${styles.header__menu} ${current === menu && styles.header__active}` }
                  >
                    { name }
                  </Link>
                )
              })
            }
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

            {/* <div className={ styles.header__user }>
              <img src={ require('../../assets/images/111.png') } />
              管理员
            </div> */}

            <div className={ styles.header__service } onClick={ getServiceInfo }>
              <img src={ require('../../assets/images/service.png') } />
              在线客服
            </div>

            <div className={ styles.header__service } onClick={ toAdmin } style={{ marginLeft: '20px' }}>乐跑平台</div>
          </Col>
        </Row>
      </div>

      <div className={ styles.body }>
        {
          goodsMenu.map(({value}) => value).includes(location.pathname)
            ?
            <div className={ styles.nav }>
              {
                goodsMenu.map(item => {

                  return (
                    <Link
                      key={ item.value }
                      to={ item.value }
                      className={ `${styles.nav__item} ${location.pathname === item.value && styles.nav__active}` }
                    >
                      { location.pathname === item.value && '>' }{ item.name }
                    </Link>
                  )
                })
              }
            </div>
            :
            null
        }

        { children }
      </div>

      <Modal
        closable={ false }
        visible={ modal }
        onCancel={ handleCancel }
        footer={[
          <Button key="cancel" type="default" size="default" onClick={ handleCancel }>关闭</Button>,
        ]}
        width="440px"
      >
        <Spin spinning={ loading }>
          <div className={ styles.service }>
            <img className={ styles.service__img } src={ service.qrImage } />
            <p className={ styles.service__phone }>联系方式：{ service.phoneNumber }</p>
          </div>
        </Spin>
      </Modal>

    </>
  )
}

export const AdminContext = React.createContext()

export default memo(withRouter(Admin))
