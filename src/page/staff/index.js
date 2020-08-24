import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import api from '@/api'

function Join () {

  const joinState = {
    PBCompanyJoinStateOpen: '开放加入',
    PBCompanyJoinStateClose: '不开放加入',
  }

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([
    {
      "companyId": 0,
      "companyName": "string",
      "empJoinedTotal": 0,
      "empJoiningTotal": 0,
      "empTotal": 0
    }
  ])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
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
      title: '企业状态',
      dataIndex: 'joinState',
      width: 100,
      render: (e) => (
        <>{ joinState[e] }</>
      ),
    },
    {
      title: '企业部门',
      dataIndex: 'deptNames',
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
  ]

  useEffect(() => {

    // load()
  }, [page, size, flag])

  const load = async () => {

    try {

      setListLoading(true)

      const { status, data } = await api.staff.getCompanyList({
        // page,
        // size,
      })

      if (!status) return

      // setListData(data.data)
      // setTotal(data.total)

      // dispatch({ type: 'change' })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  return (
    <>

      {/* 表格 */}
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
