import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'

// 引入路由
import FrontendAuth from './../page/FrontendAuth/index'
import NotFound from './../page/notFound/index'
import Login from './../page/login/index'
import Join from './../page/join/index'
import Staff from './../page/staff/index'

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
