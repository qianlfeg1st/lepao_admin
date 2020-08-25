import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import api from '@/api'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function Join () {

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

  const listColumns = [
    {
      title: '订单编号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '兑换时间',
      dataIndex: '',
      width: 100,
    },
    {
      title: '消耗积分',
      dataIndex: '',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: '',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '商品名',
      dataIndex: '',
      width: 100,
    },
    {
      title: '商品编号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '企业采购价',
      dataIndex: '',
      width: 100,
    },
    {
      title: '企业审核',
      dataIndex: '',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary">编辑</Button>
            <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除</Button>
            <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除并禁入</Button>
          </>
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
