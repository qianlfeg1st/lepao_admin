import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import api from '@/api'

function Join () {

  const joinState = {
    PBCompanyJoinStateOpen: '开放加入',
    PBCompanyJoinStateClose: '不开放加入',
  }

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
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
      title: '已选商品',
      dataIndex: '',
      width: 100,
    },
    {
      title: '推荐的热门商品',
      dataIndex: '',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <Button type="primary">编辑奖品</Button>
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
