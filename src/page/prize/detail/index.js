import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Table, Button, Modal, Form, Image, InputNumber, DatePicker, Input, message, Col, Row } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { prize } from '@/api'
import styles from './index.module.scss'
import moment from 'moment'
import { AdminContext } from '@/components/Admin'
import formatDate from '@/utils/formatDate'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function PrizeDetail () {

  const { push } = useHistory()
  const { companyId } = useParams()

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [ form ] = Form.useForm()
  const [editModel, setEditModel] = useState(false)
  const [goodsId, setGoodsId] = useState('')

  const [companyName, setCompanyName] = useState('')

  const { height } = useContext(AdminContext)

  const listColumns = [
    {
      title: '编号',
      dataIndex: 'companyGoodsId',
      width: 40,
    },
    {
      title: '分类',
      dataIndex: 'shelfTitle',
      width: 60,
    },
    {
      title: '缩略图',
      dataIndex: '',
      width: 45,
      render (e) {

        return <Image width={ 36 } src={ e.thumb } />
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 130,
    },
    {
      title: '商品标价',
      dataIndex: 'priceLabel',
      width: 50,
    },
    {
      title: '采购价',
      dataIndex: 'companyPriceLabel',
      width: 50,
    },
    {
      title: '兑换积分',
      dataIndex: 'gold',
      width: 60,
    },
    {
      title: '库存',
      dataIndex: 'storeCount',
      width: 50,
    },
    {
      title: '上架时间',
      dataIndex: 'updownTime',
      width: 120,
    },
    {
      title: '操作',
      width: 120,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary" onClick={ () => getGoodsDetail(e) }>编辑</Button>
            <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除</Button>
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

  const getGoodsDetail = e => {

    setEditModel(true)

    const { name, shelfTitle, priceLabel, companyPriceLabel, gold, storeCount, companyGoodsId } = e

    form.setFieldsValue({
      name,
      shelfTitle,
      priceLabel,
      companyPriceLabel,
      gold,
      storeCount,
      updownTime: [moment(1600411009340), moment(1601452009340)],
    })

    setGoodsId(companyGoodsId)
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await prize.getCompanyPrizeList({
        firstResult: (page - 1) * size,
        companyId,
      })

      if (!state) return

      setListData(data.items)
      setTotal(+data.pageable.resultCount)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const onCancel = () => {

    setEditModel(false)

    form.resetFields()
  }

  const submit = async values => {

    console.log('~submit~', values)
    console.log('~goodsId~', goodsId)

    const { storeCount, gold, updownTime, companyPriceLabel } = values
    const data = listData.find((item => item.companyGoodsId === goodsId))

    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认编辑吗？',
      onOk: async () => {

        try {

          const { state } = await prize.editPrizeDetail({
            items: [
              {
                ...data,
                storeCount,
                gold,
                companyPrice: companyPriceLabel,
                recommend: data.recommendLablel === '是',
                downTime: formatDate(updownTime[1].valueOf()),
                upTime: formatDate(updownTime[0].valueOf()),
                companyId: undefined,
                companyPriceLabel: undefined,
                name: undefined,
                priceLabel: undefined,
                recommendLablel: undefined,
                shelfTitle: undefined,
                thumb: undefined,
                updownTime: undefined,
                companyUsed: undefined,
              }
            ]
          })

          if (!state) return

          message.success('编辑成功')

          setEditModel(false)

          setFlag(!flag)

          form.resetFields()
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
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

      <Row className="pagebar">
        <Col span={ 18 }>
          <div className={ styles.title }>{ companyName }奖品列表({ total })</div>
        </Col>
        <Col span={ 6 }>
          <Button type="primary" onClick={ () => push(`/prize/choose/${companyId}`) }>挑选商品</Button>
        </Col>
      </Row>

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

      <Modal
        visible={ editModel }
        title="编辑奖品"
        onCancel={ onCancel }
        onOk={ null }
        maskClosable={ false }
        centered
        width="670px"
        footer={[
          <Button form="edit" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ onCancel }>取消</Button>,
        ]}
      >
        <Form id="edit" form={ form } { ...formItemLayout } onFinish={ submit }>

          <Form.Item label="商品名称" name="name">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品名称" name="name">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品分类" name="shelfTitle">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品标价" name="priceLabel">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="采购价" name="companyPriceLabel">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="兑换积分" name="gold" rules={[{ required: true, message: '请输入兑换积分' }]}>
            <InputNumber size="large" style={{ width: '100%' }} maxLength="7" />
          </Form.Item>

          <Form.Item label="库存数量" name="storeCount" rules={[{ required: true, message: '请输入库存数量' }]}>
            <InputNumber size="large" style={{ width: '100%' }} maxLength="4" />
          </Form.Item>

          <Form.Item label="上架时间" name="updownTime" rules={[{ required: true, message: '请选择上架时间' }]}>
            <RangePicker
              size="large"
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

        </Form>
      </Modal>

    </>
  )
}

export default PrizeDetail
