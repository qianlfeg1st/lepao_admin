
import React, { useState, useEffect, } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import api from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  labelAlign: 'left',
}

function Login (props) {

  console.log('props', props)

  const [
    form
  ] = Form.useForm()

  const [
    loginLoading,
    setLoginLoading,
  ] = useState(false)

  const RouteHistory = useHistory()

  useEffect(() => {

    // if (localStorage.getItem('GAdminUserAccount')) {

    //   form.setFieldsValue({'account': localStorage.getItem('GAdminUserAccount')})
    // }

    // if (props.history.action === 'REPLACE') message.error('登录失效，请重新登录')
  }, [])

  const handleSubmit = async values => {

    try {

      setLoginLoading(true)

      const { data } = await api.common.login({
        ...values,
      })

      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('account', data.account)

      message.success('登录成功')
      setLoginLoading(false)

      RouteHistory.push('/account')
    } catch (error) {

      setLoginLoading(false)

      console.error('error', error)
    }
  }

  return (

    <div className={ styles.bodyWrap }>

      <div className={ `${styles.header} flex hCenter` }>
        {/* <img className={ styles.header__logo } src={ require(`../../assets/logo.png`) } alt="浙江壳牌燃油" /> */}
        {/* <p className={ styles.header__name }>浙江壳牌燃油有限公司 - 速车控制台</p> */}
      </div>

      <div className={ styles.form }>

        <h3 className={ styles.form__title }>用户登录</h3>

        <Form form={ form } { ...formItemLayout } onFinish={ handleSubmit }>

          <Form.Item label="账号" name="identity" rules={[{required: true, message: '请输入账号'}]}>
            <Input size="large" placeholder="请输入账号" prefix={ <UserOutlined className={ styles.icon } /> } />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password size="large" placeholder="请输入密码" prefix={ <LockOutlined /> } />
          </Form.Item>

          <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            <Button shape="round" type="primary" block loading={ loginLoading } htmlType="submit" size="large">登 录</Button>
          </Form.Item>

        </Form>
      </div>

    </div>
  )
}

export default Login