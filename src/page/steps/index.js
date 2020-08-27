import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { steps } from '@/api'

function Join () {

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

  const listColumns = [
    {
      title: '企业编号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: '',
      width: 100,
    },
    {
      title: '已加入员工数',
      dataIndex: '',
      width: 120,
    },
    {
      title: '1月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '2月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '3月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '4月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '5月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '6月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '7月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '8月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '9月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '10月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '11月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '12月',
      dataIndex: '',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary">编辑</Button>
            <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除</Button>
            <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除并禁入</Button>
          </>
        )
      }
    },
  ]

  useEffect(() => {

    // load()
  }, [page, size, flag])

  const load = async () => {

    try {

      setListLoading(true)

      const { status, data } = await steps.getCompanyList({
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
