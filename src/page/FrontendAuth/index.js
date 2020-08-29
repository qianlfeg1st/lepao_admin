import React, { useContext } from 'react'
import Admin from './../Admin/index'
import { Route, Redirect } from 'react-router-dom'
import { RouteConfigContext } from '../../router'

function FrontendAuth (props) {

  // 路由配置
  const routerConfig = useContext(RouteConfigContext)
  // 当前访问的路由
  const pathname = props.location.pathname.split('/')

  // 路由匹配
  const targetRouterConfig = routerConfig.find(({ path }) => {

    const pathArr = path.split('/')

    if (pathArr.length !== pathname.length) return false

    return pathArr.every((item, index) => item === pathname[index] || (pathname[index] && new RegExp('^:.{1,}$').test(item)))
  })

  // console.log('~~FrontendAuth-targetRouterConfig~~', targetRouterConfig)

  if (targetRouterConfig) {

    // 设置页面标题
    if ('title' in targetRouterConfig) document.title = targetRouterConfig.title

    // 不需要登录的页面
    if (!targetRouterConfig.auth) return <Route exact path={ targetRouterConfig.path } component={ targetRouterConfig.component } />
  } else {

    return <Redirect to="/404" />
  }

  // 已登录
  if (sessionStorage.getItem('token') || true) {

    return (
      <Route path="/" render={ () =>
        <Admin targetRouterConfig={ targetRouterConfig }>
          <Route path={ targetRouterConfig.path } component={ targetRouterConfig.component } />
        </Admin>
      }
      />
    )
  } else {

    return <Redirect to="/login" />
  }

}

export default FrontendAuth