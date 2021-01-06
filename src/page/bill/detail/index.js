import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal, Form, Image, InputNumber, DatePicker, Input, message, Col, Row, Pagination, Breadcrumb } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { bill } from '@/api'
import styles from './index.module.scss'
import moment from 'moment'
import { AdminContext } from '@/components/Admin'
import formatDate from '@/utils/formatDate'

function BillDetail () {

  const { push } = useHistory()
  const { companyId } = useParams()

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [companyName, setCompanyName] = useState('')

  const { height } = useContext(AdminContext)

  const listColumns = [
    // {
    //   title: '编号',
    //   dataIndex: 'billId',
    //   width: 30,
    // },
    {
      title: '账单日期',
      dataIndex: 'dateRangeLabel',
      width: 100,
    },
    {
      title: '订单数量',
      dataIndex: 'orderNum',
      width: 100,
      render (e) {

        return <>{ `${e}件` }</>
      }
    },
    {
      title: '应付金额',
      dataIndex: 'moneyTotalLabel',
      width: 100,
    },
    {
      title: '实付金额',
      dataIndex: 'realMoneyTotalLabel',
      width: 100,
    },
    {
      title: '结算日期',
      dataIndex: 'createTimeLabel',
      width: 100,
    },
    // {
    //   title: '兑换积分',
    //   dataIndex: 'gold',
    //   width: 60,
    // },
    // {
    //   title: '库存',
    //   dataIndex: 'storeCount',
    //   width: 50,
    // },
    // {
    //   title: '上架时间',
    //   dataIndex: 'updownTime',
    //   width: 110,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'companyUsed',
    //   width: 50,
    //   render: (e) => (
    //     <>{ e ? '已挑选' : '未挑选' }</>
    //   ),
    // },
    {
      title: '操作',
      width: 100,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary" onClick={ () => push(`/bill/info/${e.billId}?name=${companyName}&companyId=${companyId}&type=bill`) }>开始结算</Button>
            <Button className="btn" type="primary" onClick={ () => push(`/bill/info/${e.billId}?name=${companyName}&companyId=${companyId}&type=detail`) }>详情</Button>
          </>
        )
      }
    },
  ]

  useEffect(() => {

    setCompanyName(decodeURIComponent(location.hash.split('?')[1].split('=')[1]))
  }, [])

  useEffect(() => {

    load()
  }, [flag])

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await bill.getBillList({
        firstResult: (page - 1) * size,
        companyId,
      })

      if (!state) return

      setListData(data.items)
      setTotal(+data.pageable.resultCount)
      setSize(+data.pageable.resultSize)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  return (
    <>

      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to="/bill">公司列表（企业账单）</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>企业账单</Breadcrumb.Item>
      </Breadcrumb>

      <div className={ styles.title }>{ companyName }已结算账单</div>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 300px)', y: `calc(100vh - ${height}px)` }}
        rowKey={ e => e.companyGoodsId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

      <div className="pagebar">
        <Pagination
          onChange={ e => {

            setPage(e)
            setFlag(!flag)
          } }
          total={ total }
          showTotal={ total => `共 ${total} 条` }
          pageSize={ size }
          current={ page }
          defaultCurrent={ page }
          showSizeChanger={ false }
        />
      </div>

    </>
  )
}

export default BillDetail
