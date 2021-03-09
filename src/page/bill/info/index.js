import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal, Form, Image, InputNumber, DatePicker, Input, message, Col, Row, Pagination, Breadcrumb, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { bill } from '@/api'
import styles from './index.module.scss'
import moment from 'moment'
import { baseURL } from '@/config'
import urlParams from '@/utils/urlParams'
import formatDate from '@/utils/formatDate'

function BillDetail () {

  const { push } = useHistory()
  const { billId } = useParams()

  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [type, setType] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [detail, setDetail] = useState('')
  const [endDateStr, setEndDateStr] = useState(formatDate(+new Date()))
  const [realMoneyTotal, setRealMoneyTotal] = useState(0)

  const listColumns = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      width: 100,
    },
    {
      title: '兑换时间',
      dataIndex: 'createTimeLabel',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'dept',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      width: 100,
    },
    {
      title: '价格',
      dataIndex: 'priceLabel',
      width: 100,
    },
  ]

  useEffect(() => {

    const url = urlParams(location.hash)

    setCompanyName(url.name)
    setCompanyId(url.companyId)
    setType(url.type)

    url.type === 'detail' ? getBillDetail() : getBillPrep(url.companyId)
  }, [flag])

  // 账单详情
  const getBillDetail = async () => {

    try {

      setLoading(true)

      const { state, data } = await bill.getBillDetail({
        billId,
      })

      if (!state) return

      setListData(data.orders)
      setRealMoneyTotal(data.realMoneyTotal / 100)
      setDetail({
        ...data,
        orders: undefined,
      })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  // 准备结算
  const getBillPrep = async companyId => {

    try {

      setLoading(true)

      const { state, data } = await bill.getBillPrep({
        companyId,
        endDateStr,
      })

      if (!state) return

      setListData(data.orders)
      setRealMoneyTotal(data.realMoneyTotal / 100)
      setDetail({
        ...data,
        orders: undefined,
      })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  // 结算
  const postBill = async () => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定结算吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          setLoading(true)

          const { state } = await bill[Number(detail.billId) > 0 ? 'updateBill' : 'postBill']({
            billId,
            companyId,
            endDateLabel: endDateStr,
            realMoneyTotal: realMoneyTotal * 100,
          })

          if (!state) return

          setFlag(!flag)

          message.success('操作成功')
        } catch (error) {

          console.error('~~error~~', error)
        } finally {

          setLoading(false)
        }
      }
    })
  }

  const reset = () => {

    setEndDateStr(formatDate(+new Date()))

    setFlag(!flag)
  }

  return (
    <>

      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to="/bill">公司列表（企业账单）</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ `/bill/${companyId}?name=${companyName}` }>企业账单</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>账单{ type === 'detail' ? '详情' : '结算' }</Breadcrumb.Item>
      </Breadcrumb>

      {
        type === 'bill'
          ?
          <div className="searchbar">
            <div className="searchitems">

              <div className="searchitem">
                <p>账单截止日期：</p>
                <DatePicker value={ moment(endDateStr) } disabledDate={ current => current && current > moment().endOf('day') } onChange={ (_, dateString) => {

                  setEndDateStr(dateString)
                  setFlag(!flag)
                } } />
              </div>

              <div className="searchitem">
                <Button type="primary" size="large">
                  <a href={ `${baseURL}company_bill/export_settlement_bill?base_access_token=${sessionStorage.getItem('accessToken')}&companyId=${companyId}&endDateStr=${endDateStr}` } target="_blank" rel="noopener noreferrer">导出已结算订单</a>
                </Button>
              </div>

              <div className="searchitem">
                <Button type="primary" size="large">
                  <a href={ `${baseURL}company_bill/export_un_settlement_bill?base_access_token=${sessionStorage.getItem('accessToken')}&companyId=${companyId}&endDateStr=${endDateStr}` } target="_blank" rel="noopener noreferrer">导出未结算订单</a>
                </Button>
              </div>

            </div>
          </div>
          :
          null
      }

      <Spin size="large" spinning={ loading }>

        <section className={ styles.wrapper }>
          <Row className={ styles.box }>
            <Col span={12}>账单日期：{ detail.dateRangeLabel }</Col>
            <Col span={12}>经手人：{ detail.nickName }</Col>
          </Row>
          <Row className={ styles.box }>
            <Col span={12}>订单数量：{ detail.orderNum }</Col>
            <Col span={12}>结算日期：{ detail.createTimeLabel }</Col>
          </Row>
          <Row className={ styles.box }>
            <Col span={12}>应付金额：{ detail.moneyTotalLabel }</Col>
            <Col span={12} />
          </Row>
          <div className={ styles.box2 }>
            <span className={ styles.bolder }>实付金额：</span>
            <InputNumber
              value={ realMoneyTotal }
              formatter={ value => `￥${value}`}
              size="large"
              style={{ width: '160px' }}
              onChange={ e => setRealMoneyTotal(e) }
            />
          </div>
        </section>

        <p className={ styles.title }>账单详情</p>

        <Table
          bordered
          className={ `fixedWidthTable ${styles.table}` }
          // scroll={{ y: `calc(100vh - 600px)` }}
          rowKey={ e => e.orderId }
          columns={ listColumns }
          dataSource={ listData }
          pagination={ false }
        />

        <div className={ styles.footer }>
          <Button size="large" style={{ margin: '0 20px 0 0' }} onClick={ reset }>重置</Button>
          <Button type="primary" size="large" onClick={ postBill }>确定</Button>
        </div>
      </Spin>

    </>
  )
}

export default BillDetail
