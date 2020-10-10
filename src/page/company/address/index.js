import React, { useState, useEffect } from 'react'
import { Radio, Modal, Button, DatePicker, Input, Form, Spin, InputNumber, Cascader } from 'antd'
import styles from './index.module.scss'
import options from '@/utils/city'

function Account () {

  const formItemLayout = {
    labelCol: { span: 5, offset: 2, },
    wrapperCol: { span: 14, },
    labelAlign: 'left',
  }

  const [ form ] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const submit = values => {

    console.log('~submit~', values)
  }

  return (
    <div className={ styles.page }>

      <section className={ styles.main }>

        <div className={ styles.main__title }>企业收寄地址</div>

        <Spin spinning={ loading }>
          <Form id="form" form={ form } { ...formItemLayout } onFinish={ submit } className={ styles.main__form }>

            <Form.Item label="企业收件人" name="contactName" rules={[{required: true, message: '请输入收件人姓名'}]}>
              <Input size="large" placeholder="请输入收件人姓名" maxLength={ 7 } />
            </Form.Item>

            <Form.Item label="联系人手机" name="contactPhoneNumber" rules={[{required: true, message: '请输入联系人手机'}]}>
              <InputNumber size="large" placeholder="请输入联系人手机" maxLength={ 11 } style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="省市区" name="city" rules={[{required: true, message: '请选择省市区'}]}>
              <Cascader size="large" options={ options } placeholder="请选择省市区" />
            </Form.Item>

            <Form.Item label="详细地址" name="address" rules={[{required: true, message: '请输入详细地址'}]}>
              <Input size="large" placeholder="请输入详细地址" maxLength={ 40 } />
            </Form.Item>

          </Form>
        </Spin>

        {/* <Button form="form" type="primary" htmlType="submit" size="default">确定</Button> */}
        <div className={ `${styles.main__btn} center` } onClick={ () => form.submit() }>保存</div>

      </section>

    </div>
  )
}

export default Account
