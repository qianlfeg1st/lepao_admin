import React, { useState, useEffect } from 'react'
import { Button, Modal, Steps, InputNumber } from 'antd'
import styles from './index.module.scss'

const { Step } = Steps

function Account () {

  const [tip, setTip] = useState(false)
  const [modal, setModal] = useState(false)
  const [current, setCurrent] = useState(0)

  const steps = [
    {
      title: '输入新手机号',
      content: 'First-content',
    },
    {
      title: '输入验证码',
      content: 'Second-content',
    },
  ];

  const next = () => {

    setCurrent(current + 1)
  }

  const prev = () => {

    setCurrent(current - 1)
  }

  const cancelTip = () => {

    setTip(false)
  }

  const cancelPhone = () => {

    setModal(false)
  }

  return (
    <div className={ styles.page }>

      <section className={ styles.main }>

        <div className={ styles.main__title }>账号管理</div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>
            <div className={ styles.main__label }>头像</div>
            <div className={ styles.main__info }>
              <img className={ styles.main__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            </div>
          </div>
        </div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>
            <div className={ styles.main__label }>昵称</div>
            <div className={ styles.main__info }>张春花</div>
          </div>
          <div className={ styles.main__right } onClick={ () => setTip(true) }>变更绑定的微信号 &#62;</div>
        </div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>
            <div className={ styles.main__label }>手机号</div>
            <div className={ styles.main__info }>15858155190</div>
          </div>
          <div className={ styles.main__right } onClick={ () => setModal(true) }>变更手机号 &#62;</div>
        </div>

      </section>

      <Modal
        visible={ tip }
        title="变更企业绑定的管理员微信号"
        onCancel={ cancelTip }
        onOk={ null }
        maskClosable={ false }
        centered
        width="450px"
        footer={[
          <Button key="cancel" type="default" size="default" onClick={ cancelTip }>取消</Button>,
        ]}
      >
        <p className={ styles.tip }>请联系乐跑健康官方</p>
        <p className={ styles.phone }>400-800-6060</p>
      </Modal>

      <Modal
        visible={ modal }
        title="变更手机号"
        onCancel={ cancelPhone }
        onOk={ null }
        maskClosable={ false }
        centered
        width="450px"
        footer={[
          current > 0 && <Button key="prev" type="default" size="default" onClick={ prev }>上一步</Button>,
          <Button key="next" type="primary" size="default" onClick={ next }>下一步</Button>,
          <Button key="cancel" type="default" size="default" onClick={ cancelPhone }>取消</Button>,
        ]}
      >
        <Steps current={ current }>
          <Step title="输入新手机号" />
          <Step title="输入验证码" />
        </Steps>

        {
          current === 0
            ?
            <InputNumber size="large" placeholder="请输入联系人手机" maxLength={ 11 } className={ styles.input } />
            :
            <InputNumber size="large" placeholder="请输入验证码" maxLength={ 4 } className={ styles.input } />
        }
      </Modal>

    </div>
  )
}

export default Account
