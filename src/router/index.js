import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'

// 引入路由
import FrontendAuth from './../page/FrontendAuth/index'
import NotFound from './../page/notFound/index'
import Login from './../page/login/index'
import Join from './../page/join/index'

import Staff from './../page/staff/index'
import StaffDetail from './../page/staff/detail/index'

import Prize from './../page/prize/index'
import PrizeDetai from './../page/prize/detail/index'

import Exchange from './../page/exchange/index'
import ExchangeDetai from './../page/exchange/detail/index'

import Point from './../page/point/index'
import PointDetai from './../page/point/detail/index'

// import Equipment from './../page/equipment/index'
// import Order from './../page/order/index'

// 用户管理
// import UserAlipay from './../page/user/alipay'

// 定义routes
const routerConfig = [
  {
    path: '/',
    component: Login,
    children: <Login />,
    auth: false,
    title: '登录',
  },
  {
    path: '/login',
    component: Login,
    children: <Login />,
    auth: false,
    title: '登录',
  },
  {
    path: '/404',
    component: NotFound,
    children: <NotFound />,
    auth: false,
    title: '未找到页面',
  },
  {
    path: '/join',
    component: Join,
    children: <Join />,
    auth: false,
    title: '企业入驻',
  },
  {
    path: '/staff',
    component: Staff,
    children: <Staff />,
    auth: false,
    title: '企业员工',
  },
  {
    path: '/staff/:companyId',
    component: StaffDetail,
    children: <StaffDetail />,
    auth: false,
    title: '企业员工',
  },
  {
    path: '/prize',
    component: Prize,
    children: <Prize />,
    auth: false,
    title: '企业奖品',
  },
  {
    path: '/prize/detail',
    component: PrizeDetai,
    children: <PrizeDetai />,
    auth: false,
    title: '企业奖品',
  },
  {
    path: '/exchange',
    component: Exchange,
    children: <Exchange />,
    auth: false,
    title: '企业兑换',
  },
  {
    path: '/exchange/:companyId',
    component: ExchangeDetai,
    children: <ExchangeDetai />,
    auth: false,
    title: '企业兑换',
  },
  {
    path: '/point',
    component: Point,
    children: <Point />,
    auth: false,
    title: '企业积分',
  },
  {
    path: '/point/detail',
    component: PointDetai,
    children: <PointDetai />,
    auth: false,
    title: '企业积分',
  },
  /*
  {
    path: '/order',
    component: Order,
    children: <Order />,
    auth: true,
    title: '订单管理'
  },
  {
    path: '/equipment',
    component: Equipment,
    children: <Equipment />,
    auth: true,
    title: '设备管理'
  },
  */
]

export const RouteConfigContext = React.createContext()

function BasicRoute () {

  return (
    <>
      <RouteConfigContext.Provider value={ routerConfig }>
        <Router>
          <Switch>
            <FrontendAuth />
          </Switch>
        </Router>
      </RouteConfigContext.Provider>
    </>
  )
}

export default BasicRoute
