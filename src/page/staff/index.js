import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button } from 'antd'
import { staff } from '@/api'

function Join () {

  const RouteHistory = useHistory()
  const [listLoading, setListLoading] = useState(true)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)

  const listColumns = [
    {
      title: '企业编号',
      dataIndex: 'companyId',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 100,
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
      width: 200,
      render (e) {

        return (
          <Button type="primary" onClick={ () => RouteHistory.push(`/staff/${e.companyId}`) }>查看明细</Button>
        )
      }
    },
  ]

  useEffect(() => {

    load()
  }, [flag])

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

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 400px)', y: `calc(100vh)` }}
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
