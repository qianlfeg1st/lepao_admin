import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button, Breadcrumb } from 'antd'
import { bill } from '@/api'
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
      width: 50,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 200,
    },
    {
      title: '最后结算日期',
      dataIndex: 'lastBillCreateTimeLabel',
      width: 200,
    },
    {
      title: '未结算订单数',
      dataIndex: 'unOrderTotalLabel',
      width: 100,
      render: e => (
        <>{ `${e}笔` }</>
      ),
    },
    {
      title: '未结算总额',
      dataIndex: 'unMoneyTotalLabel',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render (e) {

        return (
          <Button type="primary" onClick={ () => push(`/bill/${e.companyId}?name=${e.companyName}`) }>账单</Button>
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

      const { state, data } = await bill.getCompanyList()

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
        <Breadcrumb.Item>公司列表（企业账单）</Breadcrumb.Item>
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
