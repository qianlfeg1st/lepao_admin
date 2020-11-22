import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button, Breadcrumb } from 'antd'
import { prize } from '@/api'
import { AdminContext } from '@/components/Admin'

function Prize () {

  const RouteHistory = useHistory()
  const [listLoading, setListLoading] = useState(false)
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
      width: 200,
    },
    {
      title: '已分配商品',
      dataIndex: 'recommendGoodsTotal',
      width: 100,
    },
    {
      title: '已选用商品',
      dataIndex: 'goodsTotal',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <Button type="primary" onClick={ () => RouteHistory.push(`/prize/${e.companyId}?name=${e.companyName}`) }>编辑奖品</Button>
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

      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>公司列表（企业奖品）</Breadcrumb.Item>
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

export default Prize
