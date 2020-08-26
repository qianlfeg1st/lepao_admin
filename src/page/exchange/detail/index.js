import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import api from '@/api'
import { auditStatus } from '@/stores'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function Join () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

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
      title: '消耗积分',
      dataIndex: 'gold',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: '商品名',
      dataIndex: 'goodsName',
      width: 100,
    },
    {
      title: '商品编号',
      dataIndex: 'goodsId',
      width: 100,
    },
    {
      title: '企业采购价',
      dataIndex: 'companyGoodsPrice',
      width: 100,
    },
    {
      title: '企业审核',
      dataIndex: 'auditPass',
      width: 100,
      render: (e) => (
        <>{ auditStatus[e] }</>
      ),
    },
    {
      title: '操作',
      width: 200,
      render ({ orderId, auditPass }) {

        return (
          <>
            {
              auditPass === 'UNRECOGNIZED'
                ?
                [
                  <Button key="pass" className="btn" type="primary" onClick={ () => verifyExchange({ orderId, auditState: 'PBOrderAuditStatePass' }) }>通过</Button>,
                  <Button key="unpass" className="btn" type="danger" onClick={ () => verifyExchange({ orderId, auditState: 'PBOrderAuditStateUnPass' }) }>拒绝</Button>,
                  <Button key="back" className="btn" type="primary" onClick={ () => verifyExchange({ orderId, auditState: 'PBOrderAuditStateBack' }) }>回退</Button>,
                ]
                :
                null
            }
          </>
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

      const { state, data } = await api.exchange.getExchangeList({
        companyId,
        query: {
          firstResult: 0,
          month: 0,
          nickName: '',
        },
      })

      if (!state) return

      setListData([
        {
          "auditPass": "UNRECOGNIZED",
          "companyGoodsPrice": "string",
          "createTimeLabel": "string",
          "gold": 0,
          "goodsId": 0,
          "goodsName": "string",
          "name": "string",
          "nickName": "string",
          "orderId": 1,
          "phoneNumber": "string"
        }
      ])
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const verifyExchange = ({ orderId, auditState }) => {

    const content = auditStatus[auditState]

    Modal.confirm({
      title: '提示',
      centered: true,
      content: `确认${content}吗？`,
      onOk: async () => {

        try {

          const { state } = await api.exchange.verifyExchange({
            orderId,
            auditState,
          })

          if (!state) return

          message.success(`${content}操作成功`)

          setFlag(!flag)
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
  }

  const onCancel = () => {

    setEditModel(false)

    form.resetFields()
  }

  const submit = async values => {

    console.log()
  }

  const deleted = e => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      // content: `确定${true ? '加入' : '移除'}【${'钱立峰'}】吗？`,
      content: `确定操作吗？`,
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          setSettingLoading(true)

          const { data } = await stationApi.deleteOil({
            id,
          })

          if (data?.status) {

            message.success('删除成功')
            setIsReloadOil(Math.random())
          }
        } catch (error) {

          console.log(error)
        } finally {

          setSettingLoading(false)
        }
      }
    })
  }

  return (
    <>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 400px)', y: `calc(100vh)` }}
        rowKey={ e => e.orderId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

    </>
  )
}

export default Join
