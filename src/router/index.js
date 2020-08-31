import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'

// 引入路由
import FrontendAuth from '@/components/FrontendAuth/'
import NotFound from './../page/notFound/'
import Login from './../page/login/'

import Join from './../page/join/'

import Staff from './../page/staff/'
import StaffDetail from './../page/staff/detail/'

import Prize from './../page/prize/'
import PrizeDetail from './../page/prize/detail/'

import Exchange from './../page/exchange/'
import ExchangeDetail from './../page/exchange/detail/'

import Point from './../page/point/'

import Steps from './../page/steps/'
import StepsDetail from './../page/steps/detail/'

import User from './../page/user/'
import Goods from './../page/goods/'


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
    auth: true,
    title: '企业入驻',
    navMenu: 'company',
  },
  {
    path: '/staff',
    component: Staff,
    children: <Staff />,
    auth: true,
    title: '企业员工',
    navMenu: 'company',
  },
  {
    path: '/staff/:companyId',
    component: StaffDetail,
    children: <StaffDetail />,
    auth: true,
    title: '企业员工',
    navMenu: 'company',
  },
  {
    path: '/prize',
    component: Prize,
    children: <Prize />,
    auth: true,
    title: '企业奖品',
    navMenu: 'company',
  },
  {
    path: '/prize/:companyId',
    component: PrizeDetail,
    children: <PrizeDetail />,
    auth: true,
    title: '企业奖品',
    navMenu: 'company',
  },
  {
    path: '/exchange',
    component: Exchange,
    children: <Exchange />,
    auth: true,
    title: '企业兑换',
    navMenu: 'company',
  },
  {
    path: '/exchange/:companyId',
    component: ExchangeDetail,
    children: <ExchangeDetail />,
    auth: true,
    title: '企业兑换',
    navMenu: 'company',
  },
  {
    path: '/point',
    component: Point,
    children: <Point />,
    auth: true,
    title: '企业积分',
    navMenu: 'company',
  },
  {
    path: '/steps',
    component: Steps,
    children: <Steps />,
    auth: true,
    title: '步数统计',
    navMenu: 'company',
  },
  {
    path: '/steps/:companyId',
    component: StepsDetail,
    children: <StepsDetail />,
    auth: true,
    title: '步数统计',
    navMenu: 'company',
  },
  {
    path: '/user',
    component: User,
    children: <User />,
    auth: true,
    title: '用户管理',
    navMenu: 'user',
  },
  {
    path: '/goods',
    component: Goods,
    children: <Goods />,
    auth: true,
    title: '商品库',
    navMenu: 'goods',
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
