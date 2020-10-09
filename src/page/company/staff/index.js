import React, { useState, useEffect } from 'react'
import { Collapse, Table } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const { Panel } = Collapse

function Staff () {

  const columns = [
    {
      title: '昵称',
      dataIndex: 'a',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'b',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'c',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
    },
  ]

  const data = [
    {
      id: '1',
      a: '钱立峰',
      b: '15858155190',
      c: '审核通过',
    },
    {
      id: '2',
      a: '钱立峰',
      b: '15858155190',
      c: '审核通过',
    },
    {
      id: '3',
      a: '钱立峰',
      b: '15858155190',
      c: '审核通过',
    },
    {
      id: '4',
      a: '钱立峰',
      b: '15858155190',
      c: '审核通过',
    },
  ]

  return (
    <div className={ styles.page }>

      <section className={ styles.banner }>
        <section className={ styles.header }>
          <div className={ styles.header__left }>企业员工（1005）</div>
          <div className={ styles.header__right }>
            点击右侧二维码，加为企业员工
            <img className={ styles.header__qrcode } src={ require(`../../../assets/images/qrcode.png`) } />
          </div>
        </section>
      </section>

      <div className={ styles.code }>
        <img className={ styles.code__img } src={ require(`../../../assets/images/111.png`) } />
        <h1 className={ styles.code__name }>中国比亚迪汽车有限公司</h1>
        <p className={ styles.code__tip }>微信扫一扫，加为企业员工</p>
        <div className={ styles.code__btn }>保存到本地</div>
      </div>

      <Collapse
        ghost
        bordered={ false }
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className={ `site-collapse-custom-collapse ${styles.collapse}` }
      >
        <Panel header="部门A（48）" key="1" className={ styles.collapse__panel }>
          <Table
            columns={ columns }
            dataSource={ data }
            showHeader={ false }
            pagination={ false }
            rowKey={ record => record.id }
            rowClassName={ (_, index) => index & 1 ? styles.even : styles.odd }
          />
        </Panel>

        <Panel header="待审核的员工（3）" key="2" className={ styles.collapse__panel }>
          <Table
            columns={ columns }
            dataSource={ data }
            showHeader={ false }
            pagination={ false }
            rowKey={ record => record.id }
            rowClassName={ (_, index) => index & 1 ? styles.even : styles.odd }
          />
        </Panel>

      </Collapse>

    </div>
  )
}

export default Staff
