import React, { useState, useEffect } from 'react'
import { Collapse, Table } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { baseURL } from '@/config'
import { company } from '@/api'
import cloneDeep from 'lodash.clonedeep'

const { Panel } = Collapse

function Staff () {

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'joined',
      width: 100,
      render (e) {

        return <>{ e ? '已加入' : '未加入' }</>
      }
    },
    {
      title: '操作',
      width: 100,
    },
  ]

  const [dept, setDept] = useState({ deptInfo: [] })
  const [activeKey, setActiveKey] = useState([])

  useEffect(() => {

    getEmpInfo()
  }, [])

  const getEmpInfo = async () => {

    try {

      const { state, data } = await company.getEmpInfo()

      if (!state) return

      console.log('~~~', data)
      setDept(data)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const getEmpsDept = async deptId => {

    try {

      const { state, data } = await company.getEmpsDept({
        deptId,
      })

      if (!state) return

      const index = dept.deptInfo.findIndex(item => item.deptId === deptId)
      const clone = cloneDeep(dept)

      clone.deptInfo[index].data = data

      setDept(clone)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const collapseChange = e => {

    const deptId = e.filter(item => activeKey.indexOf(item) === -1)

    getEmpsDept(deptId[0])

    setActiveKey(e)
  }

  return (
    <div className={ styles.page }>

      <section className={ styles.banner }>
        <section className={ styles.header }>
          <div className={ styles.header__left }>企业员工（{ dept.empCount }）</div>
          <div className={ styles.header__right }>
            点击右侧二维码，加为企业员工
            <img className={ styles.header__qrcode } src={ require(`../../../assets/images/qrcode.png`) } />
          </div>
        </section>
      </section>

      <div className={ styles.code }>
        <img className={ styles.code__img } src={ `${baseURL}cpy_emp/invite_join_companyemp?base_access_token=eyJhbGciOiJIUzI1NiJ9.CBQQm5zRwtou.1GwyO5NuO4RXNXYPpCev6WKG0QD9jYfbbMy2I2uXpeg` } />
        <h1 className={ styles.code__name }>中国比亚迪汽车有限公司</h1>
        <p className={ styles.code__tip }>微信扫一扫，加为企业员工</p>
        <div className={ styles.code__btn }>保存到本地</div>
      </div>

      <Collapse
        ghost
        bordered={ false }
        activeKey={ activeKey }
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className={ `site-collapse-custom-collapse ${styles.collapse}` }
        onChange={ collapseChange }
      >
        {
          dept.deptInfo.map(item => {

            return (
              <Panel header={ `${item.deptName}（${item.empCount}）` } key={ item.deptId } className={ styles.collapse__panel }>
                <Table
                  columns={ columns }
                  dataSource={ item.data }
                  showHeader={ false }
                  pagination={ false }
                  rowKey={ record => record.userId }
                  rowClassName={ (_, index) => index & 1 ? styles.even : styles.odd }
                />
              </Panel>
            )
          })
        }
      </Collapse>

    </div>
  )
}

export default Staff
