import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button } from 'antd'
import { prize } from '@/api'

function Prize () {

  const RouteHistory = useHistory()
  const [listLoading, setListLoading] = useState(false)
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
      title: '已选商品',
      dataIndex: 'recommendGoodsTotal',
      width: 100,
    },
    {
      title: '推荐的热门商品',
      dataIndex: 'goodsTotal',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <Button type="primary" onClick={ () => RouteHistory.push(`/prize/${e.companyId}`) }>编辑奖品</Button>
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

      const { state, data } = await prize.getCompanyList()

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

export default Prize
