import React from 'react'
import ReactDOM from 'react-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './page/App'
import './index.module.scss'

ReactDOM.render(
  <ConfigProvider locale={ zhCN }>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
)