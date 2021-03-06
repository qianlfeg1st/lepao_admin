import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'

import FrontendAuth from '@/components/FrontendAuth/'
import NotFound from '@/page/notFound/'
import Login from '@/page/login/'

import Join from '@/page/join/'

import Staff from '@/page/staff/'
import StaffDetail from '@/page/staff/detail/'

import Prize from '@/page/prize/'
import PrizeDetail from '@/page/prize/detail/'
import PrizeChoose from '@/page/prize/choose/'

import Exchange from '@/page/exchange/'
import ExchangeDetail from '@/page/exchange/detail/'

import Point from '@/page/point/'

import Steps from '@/page/steps/'
import StepsDetail from '@/page/steps/detail/'

import User from '@/page/user/'
import Goods from '@/page/goods/'

import Bill from '@/page/bill/'
import BillDetail from '@/page/bill/detail/'
import BillInfo from '@/page/bill/info/'

// 企业页面
import Company_index from '@/page/company/index/'
import Company_staff from '@/page/company/staff/'
import Company_prize from '@/page/company/prize/'
import Company_goods from '@/page/company/goods/'
import Company_inventory from '@/page/company/inventory/'
import Company_exchange from '@/page/company/exchange/'
import Company_account from '@/page/company/account/'
import Company_address from '@/page/company/address/'
import Company_gold from '@/page/company/gold/'

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
    path: '/company/index',
    component: Company_index,
    children: <Company_index />,
    auth: true,
    title: '首页',
    navMenu: 'index',
  },
  {
    path: '/company/account',
    component: Company_account,
    children: <Company_account />,
    auth: true,
    title: '账号管理',
    navMenu: 'index',
  },
  {
    path: '/company/address',
    component: Company_address,
    children: <Company_address />,
    auth: true,
    title: '收货地址',
    navMenu: 'index',
  },
  {
    path: '/company/gold',
    component: Company_gold,
    children: <Company_gold />,
    auth: true,
    title: '积分管理',
    navMenu: 'index',
  },
  {
    path: '/company/staff',
    component: Company_staff,
    children: <Company_staff />,
    auth: true,
    title: '人员',
    navMenu: 'staff',
  },
  {
    path: '/company/prize',
    component: Company_prize,
    children: <Company_prize />,
    auth: true,
    title: '挑选奖品',
    navMenu: 'goods',
  },
  {
    path: '/company/goods',
    component: Company_goods,
    children: <Company_goods />,
    auth: true,
    title: '当前商品',
    navMenu: 'goods',
  },
  {
    path: '/company/inventory',
    component: Company_inventory,
    children: <Company_inventory />,
    auth: true,
    title: '库存管理',
    navMenu: 'goods',
  },
  {
    path: '/company/exchange',
    component: Company_exchange,
    children: <Company_exchange />,
    auth: true,
    title: '兑换管理',
    navMenu: 'goods',
  },
  {
    path: '/bill',
    component: Bill,
    children: <Bill />,
    auth: true,
    title: '企业账单',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/bill/:companyId',
    component: BillDetail,
    children: <BillDetail />,
    auth: true,
    title: '企业账单',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/bill/info/:billId',
    component: BillInfo,
    children: <BillInfo />,
    auth: true,
    title: '账单详情',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/join',
    component: Join,
    children: <Join />,
    auth: true,
    title: '企业入驻',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/staff',
    component: Staff,
    children: <Staff />,
    auth: true,
    title: '企业员工',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/staff/:companyId',
    component: StaffDetail,
    children: <StaffDetail />,
    auth: true,
    title: '企业员工',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/prize',
    component: Prize,
    children: <Prize />,
    auth: true,
    title: '企业奖品',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/prize/:companyId',
    component: PrizeDetail,
    children: <PrizeDetail />,
    auth: true,
    title: '企业奖品',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/prize/choose/:companyId',
    component: PrizeChoose,
    children: <PrizeChoose />,
    auth: true,
    title: '挑选奖品',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/exchange',
    component: Exchange,
    children: <Exchange />,
    auth: true,
    title: '企业兑换',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/exchange/:companyId',
    component: ExchangeDetail,
    children: <ExchangeDetail />,
    auth: true,
    title: '企业兑换',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/point',
    component: Point,
    children: <Point />,
    auth: true,
    title: '企业积分',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/steps',
    component: Steps,
    children: <Steps />,
    auth: true,
    title: '步数统计',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/steps/:companyId',
    component: StepsDetail,
    children: <StepsDetail />,
    auth: true,
    title: '步数统计',
    navMenu: 'company',
    admin: true,
  },
  {
    path: '/user',
    component: User,
    children: <User />,
    auth: true,
    title: '用户管理',
    navMenu: 'user',
    admin: true,
  },
  {
    path: '/goods',
    component: Goods,
    children: <Goods />,
    auth: true,
    title: '商品库',
    navMenu: 'goods',
    admin: true,
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
