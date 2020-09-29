import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Modal, Form, Image } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { prize } from '@/api'
import styles from './index.module.scss'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function PrizeDetail () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [ form ] = Form.useForm()

  const [companyName, setCompanyName] = useState('')

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
      width: 50,
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
      width: 50,
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
            <Button className="btn" type="primary">编辑</Button>
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

      <div className={ styles.title }>{ companyName }奖品列表({ total })</div>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 400px)', y: `calc(100vh)` }}
        rowKey={ e => e.companyGoodsId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

    </>
  )
}

export default PrizeDetail
