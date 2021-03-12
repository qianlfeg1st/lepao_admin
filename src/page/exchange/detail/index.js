import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Modal, message, Pagination, Form, Input, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { exchange } from '@/api'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

const auditStatus = {
  PBPayOrderStateWaitAduit: '等待审核',
  PBPayOrderStateWaitSend: '通过',
  PBPayOrderStateReject: '拒绝',
  PBPayOrderStateRejectBackGold: '退回',
}

function Join () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)
  const [detailModel, setDetailModel] = useState(false)
  const [ form ] = Form.useForm()
  const [kdiList, setkdiList] = useState([])

  const listColumns = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      width: 60,
    },
    {
      title: '兑换时间',
      dataIndex: 'createTimeLabel',
      width: 110,
    },
    {
      title: '消耗积分',
      dataIndex: 'gold',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 80,
    },
    {
      title: '商品名',
      dataIndex: 'goodsName',
      width: 100,
    },
    {
      title: '商品编号',
      dataIndex: 'goodsId',
      width: 60,
    },
    {
      title: '企业采购价',
      dataIndex: 'companyGoodsPrice',
      width: 60,
    },
    {
      title: '企业审核',
      dataIndex: 'stateLabel',
      width: 60,
    },
    {
      title: '操作',
      width: 150,
      render ({ orderId, state }) {

        return (
          <>
            {
              state === 'PBPayOrderStateWaitAduit'
                ?
                <>
                  <Button key="pass" className="btn" type="primary" onClick={ () => verifyExchange({ orderId, auditState: 'PBPayOrderStateWaitSend' }) }>通过</Button>
                  <Button key="unpass" className="btn" type="danger" onClick={ () => verifyExchange({ orderId, auditState: 'PBPayOrderStateReject' }) }>拒绝</Button>
                  <Button key="back" className="btn" type="danger" onClick={ () => verifyExchange({ orderId, auditState: 'PBPayOrderStateRejectBackGold' }) }>回退</Button>
                </>
                :
                null
            }
            {
              state === 'PBPayOrderStateWaitSend'
                ?
                <Button key="deliver" className="btn" type="primary" onClick={ () => getOrderDetail(orderId) }>发货</Button>
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


  const submit = values => {

    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认发货吗？',
      onOk: async () => {

        try {

          const { costPrice, kdiNo, orderId, kdi } = values

          const { state } = await exchange.sendOrder({
            costPrice,
            kdiNo,
            orderId,
            kdi: kdiList[kdi],
          })

          if (!state) return

          message.success('发货成功')

          setDetailModel(false)

          setFlag(!flag)

          form.resetFields()
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await exchange.getExchangeList({
        query: {
          firstResult: (page - 1) * size,
          yearMonth: '2021-03',
          nickName: '',
          companyId,
        },
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

  const getOrderDetail = async id => {

    try {

      setDetailModel(true)

      const { state, data } = await exchange.getOrderDetail({
        orderId: id,
      })

      if (!state) return

      const { orderId, sourceLink, goodsName, goodsPriceLabel, goldLabel, addressLabel, goodsStoreCountLabel, orderCreateDateLabel, costPrice } = data.detail

      form.setFieldsValue({
        orderId,
        sourceLink,
        goodsName,
        goodsPriceLabel,
        goldLabel,
        addressLabel,
        goodsStoreCountLabel,
        orderCreateDateLabel,
        costPrice,
      })

      setkdiList(data.kdiSelect)
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

          const { state } = await exchange.verifyExchange({
            orderId,
            state: auditState,
          })

          if (!state) return

          message.success('操作成功')

          setFlag(!flag)
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
  }

  const onCancel = () => {

    setDetailModel(false)

    form.resetFields()
  }

  const deleted = e => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
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
        />
      </div>

      <Modal
        visible={ detailModel }
        title="发货"
        onCancel={ onCancel }
        onOk={ null }
        maskClosable={ false }
        centered
        width="670px"
        footer={[
          <Button form="detail" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ onCancel }>取消</Button>,
        ]}
      >
        <Form id="detail" form={ form } { ...formItemLayout } onFinish={ submit }>

          <Form.Item label="订单编号" name="orderId">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品来源" name="sourceLink">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品名称" name="goodsName">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品价格" name="goodsPriceLabel">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="成本价格" name="costPrice">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="兑换积分" name="goldLabel">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="发货地址" name="addressLabel" rules={[{required: true, message: '请输入发货地址'}]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="物流公司" name="kdi" rules={[{required: true, message: '请选择物流公司'}]}>
            <Select placeholder="请选择物流公司" size="large">
              { kdiList.map(({ name, type }, index) => <Select.Option key={ type } value={ index }>{ name }</Select.Option>) }
            </Select>
          </Form.Item>

          <Form.Item label="物流单号" name="kdiNo" rules={[{required: true, message: '请输入物流单号'}]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="库存" name="goodsStoreCountLabel">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="下单时间" name="orderCreateDateLabel">
            <Input size="large" disabled />
          </Form.Item>

        </Form>
      </Modal>

    </>
  )
}

export default Join
