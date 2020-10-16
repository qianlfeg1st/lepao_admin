import React, { useState, useEffect } from 'react'
import { Collapse, Table, Spin, Button, Modal } from 'antd'
import { CaretRightOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
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
      width: 100,
      render (e) {

        return <>{ e.phoneNumber || '未授权' }</>
      }
    },
    {
      title: '状态',
      dataIndex: 'joined',
      width: 100,
      render (e) {

        return (
          <div className={ styles.joined }>
            <img src={ require('../../../assets/images/joined.png') } />
            {
              e ? '通过审核' : '未通过审核'
            }
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 100,
      render (e) {

        return <Button type="link" onClick={ () => removeStaff(e.empId) }>从企业移除</Button>
      }
    },
  ]

  const waitColumns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '手机号',
      width: 100,
      render (e) {

        return <>{ e.phoneNumber || '未授权' }</>
      }
    },
    // {
    //   title: '部门',
    //   dataIndex: 'nickName',
    //   width: 100,
    // },
    {
      title: '操作',
      width: 100,
      render (e) {

        return (
          <>
            <Button type="link" onClick={ () => passStaff(e.empId) }>确认通过</Button>
            <Button type="link" onClick={ () => removeStaff(e.empId, 'wait') }>移除</Button>
          </>
        )
      }
    },
  ]

  const [dept, setDept] = useState({ deptInfo: [] })
  const [activeKey, setActiveKey] = useState([])
  const [loading, setLoading] = useState(true)
  const [wait, setWait] = useState([])

  useEffect(() => {

    getEmpInfo()
    getWaitStaff()
  }, [])

  const passStaff = async empId => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定审核通过吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          const { state } = await company.passStaff({
            empId,
          })

          if (!state) return

          getWaitStaff()
        } catch (error) {

          console.error('~~error~~', error)
        } finally {

          setLoading(false)
        }
      }
    })
  }

  const removeStaff = async (empId, status) => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定移除吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          const { state } = await company.removeStaff({
            empId,
          })

          if (!state) return

          if (status === 'wait') {

            getWaitStaff()
          } else {

            getEmpsDept(activeKey[0])
          }
        } catch (error) {

          console.error('~~error~~', error)
        }
      }
    })
  }

  const getWaitStaff = async () => {

    try {

      setLoading(true)

      const { state, data } = await company.getWaitStaff()

      if (!state) return

      setWait(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  const getEmpInfo = async () => {

    try {

      setLoading(true)

      const { state, data } = await company.getEmpInfo()

      if (!state) return

      setDept(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  const getEmpsDept = async deptId => {

    try {

      const { state, data } = await company.getEmpsDept({
        deptId,
      })

      if (!state) return

      const index = dept.deptInfo.findIndex(item => item.deptId === deptId)

      if (index < 0) return

      const clone = cloneDeep(dept)

      clone.deptInfo[index].data = data

      setDept(clone)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const collapseChange = e => {

    const deptId = e.filter(item => activeKey.indexOf(item) === -1)

    deptId.length && getEmpsDept(deptId[0])

    setActiveKey(e)
  }

  return (
    <div className={ styles.page }>

      <section className={ styles.banner }>
        <section className={ styles.header }>
          <div className={ styles.header__left }>企业员工（{ dept.empCount }人）</div>
          <div className={ styles.header__right }>
            扫描右侧二维码，加为企业员工
            <img className={ styles.header__qrcode } src={ require(`../../../assets/images/qrcode.png`) } />
          </div>
        </section>
      </section>

      <div className={ styles.code }>
        <img className={ styles.code__img } src={ `${baseURL}cpy_emp/invite_join_companyemp?base_access_token=eyJhbGciOiJIUzI1NiJ9.CBQQm5zRwtou.1GwyO5NuO4RXNXYPpCev6WKG0QD9jYfbbMy2I2uXpeg` } />
        <h1 className={ styles.code__name }>{ dept.companyName }</h1>
        <p className={ styles.code__tip }>微信扫一扫，加为企业员工</p>
        <div className={ styles.code__btn }>保存到本地</div>
      </div>

      <Spin spinning={ loading }>
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
                <Panel header={ `${item.deptName}（${item.empCount}人）` } key={ item.deptId } className={ styles.collapse__panel }>
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

        <Collapse
          ghost
          bordered={ false }
          activeKey={ activeKey }
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className={ `site-collapse-custom-collapse ${styles.collapse}` }
          onChange={ collapseChange }
        >
          <Panel header={ `待审核的企业员工（${wait.length}人）` } className={ styles.collapse__panel }>
            <Table
              columns={ waitColumns }
              dataSource={ wait }
              showHeader={ false }
              pagination={ false }
              rowKey={ record => record.userId }
              rowClassName={ (_, index) => index & 1 ? styles.even : styles.odd }
            />
          </Panel>
        </Collapse>
      </Spin>

    </div>
  )
}

export default Staff
