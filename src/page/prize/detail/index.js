import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Select, InputNumber } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { prize } from '@/api'

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

  const [isEditModel, setEditModel] = useState(!false)
  const [ form ] = Form.useForm()

  const listColumns = [
    {
      title: '商品编号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: '',
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: '',
      width: 100,
    },
    {
      title: '商品标价',
      dataIndex: '',
      width: 100,
    },
    {
      title: '采购价',
      dataIndex: '',
      width: 100,
    },
    {
      title: '兑换积分',
      dataIndex: '',
      width: 100,
    },
    {
      title: '库存数',
      dataIndex: '',
      width: 100,
    },
    {
      title: '上架时间',
      dataIndex: '',
      width: 100,
    },
    {
      title: '热门推荐',
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

      const { status, data } = await prize.getCompanyList({
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

      <Modal
        visible={ isEditModel }
        title="编辑员工信息"
        onCancel={ onCancel }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          // <Button form="addForm" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ onCancel }>取消</Button>,
        ]}
      >
        <Form id="addForm" form={ form } { ...formItemLayout } onFinish={ submit }>
          <Form.Item label="所属企业" name="companyName">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="所属部门" name="3" rules={[{ required: true, message: '请选择所属部门' }]}>
            <Select placeholder="请选择所属部门" size="large">
              { Object.keys([1, 2, 3]).map(key => <Select.Option key={ key } value={ key }>{ key }</Select.Option>) }
            </Select>
          </Form.Item>

          <Form.Item label="昵称" name="1" rules={[{ required: true, message: '请输入昵称' }]}>
            <Input size="large" placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
            <InputNumber size="large" maxLength="11" placeholder="请输入手机号" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="手机验证时间" name="companyName">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="手机验证状态" name="companyName">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="剩余积分" name="companyName">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="加入时间" name="companyName">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="账号权限" name="2" rules={[{ required: true, message: '请选择账号权限' }]}>
            <Select placeholder="请选择账号权限" size="large">
              { Object.keys([1, 2, 3]).map(key => <Select.Option key={ key } value={ key }>{ key }</Select.Option>) }
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </>
  )
}

export default Join
