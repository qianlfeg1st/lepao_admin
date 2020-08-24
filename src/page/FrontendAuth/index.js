import React, { useContext } from 'react'
import Admin from './../Admin/index'
import { Route, Redirect } from 'react-router-dom'
import checkPath from  './../../utils/checkPath'
import { RouteConfigContext } from '../../router'

function FrontendAuth (props) {

  const { location } = props

  // 获取全部路由
  const RouterConfig = useContext(RouteConfigContext)

  const pathname = location.pathname // 浏览器路由
  const isLogin = sessionStorage.getItem('token')
  let targetRouterConfig = RouterConfig.find(routeObj => routeObj.path === pathname)


  // 路由匹配
  if (!(targetRouterConfig && checkPath(pathname, targetRouterConfig.path))) {

    targetRouterConfig = undefined
  }

  // 设置页面标题
  if(targetRouterConfig && 'title' in targetRouterConfig) {

    document.title=targetRouterConfig.title
  }

  // 找不到页面
  if (!targetRouterConfig) return <Redirect to="/404" />

  // 进入不需要验证的页面
  if(targetRouterConfig && !targetRouterConfig.auth) {

    // return <Route exact path={ targetRouterConfig.path } component={ targetRouterConfig.component } />
    return (
      <Route path="/" render={ () =>
        <Admin targetRouterConfig={ targetRouterConfig }>
          <Route path={ targetRouterConfig.path } component={ targetRouterConfig.component } />
        </Admin>
      }
      />
    )
  }

  // 需要验证登录
  if (isLogin) {

    return (
      <Route path="/" render={ () =>
        <Admin targetRouterConfig={ targetRouterConfig }>
          <Route path={ targetRouterConfig.path } component={ targetRouterConfig.component } />
        </Admin>
      }
      />
    )
  } else {

    if (targetRouterConfig && targetRouterConfig.auth) {

      return <Redirect to="/login" />
    } else {

      return <Redirect to="/404" />
    }

  }
}

export default FrontendAuth