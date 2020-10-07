import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button, Breadcrumb } from 'antd'
import { staff } from '@/api'
import { AdminContext } from '@/components/Admin'

function Join () {

  const { push } = useHistory()
  const [listLoading, setListLoading] = useState(true)
  const [listData, setListData] = useState([])

  const { height } = useContext(AdminContext)

  const listColumns = [
    {
      title: '企业编号',
      dataIndex: 'companyId',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 150,
    },
    {
      title: '总员工数',
      dataIndex: 'empTotal',
      width: 100,
    },
    {
      title: '已加入员工数',
      dataIndex: 'empJoinedTotal',
      width: 100,
    },
    {
      title: '已审核确认员工数',
      dataIndex: 'empJoinedTotal',
      width: 100,
    },
    {
      title: '未确认员工数',
      dataIndex: 'empJoiningTotal',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render (e) {

        return (
          <Button type="primary" onClick={ () => push(`/staff/${e.companyId}?name=${e.companyName}`) }>查看明细</Button>
        )
      }
    },
  ]

  useEffect(() => {

    load()
  }, [])

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await staff.getCompanyList()

      if (!state) return

      setListData(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  return (
    <>

      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>公司列表（企业员工）</Breadcrumb.Item>
      </Breadcrumb>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 300px)', y: `calc(100vh - ${height}px)` }}
        rowKey={ e => e.companyId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

    </>
  )
}

export default Join
