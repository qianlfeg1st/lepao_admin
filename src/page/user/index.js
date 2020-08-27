import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Spin, Form, Input } from 'antd'
import { user } from '@/api'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function Join () {

  const [form] = Form.useForm()
  const [listLoading, setListLoading] = useState(false)
  const [userModal, setUserModal] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [listData, setListData] = useState([
    {
      a: 1,
    }
  ])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

  const listColumns = [
    {
      title: '用户编号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '初次授权时间',
      dataIndex: '',
      width: 100,
    },
    {
      title: '步数授权',
      dataIndex: '',
      width: 100,
    },
    {
      title: '最后登录时间',
      dataIndex: '',
      width: 100,
    },
    {
      title: '昵称',
      dataIndex: '',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: '',
      width: 100,
    },
    {
      title: '活跃天数',
      dataIndex: '',
      width: 100,
    },
    {
      title: '收寄地址',
      dataIndex: '',
      width: 100,
    },
    {
      title: '企业',
      dataIndex: '',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <Button type="primary" onClick={ () => getUserDetail(e.companyId) }>编辑</Button>
        )
      }
    },
  ]

  useEffect(() => {

    // load()
  }, [flag])

  const getUserDetail = async companyId => {

    try {

      setUserModal(true)

      const { state, data } = await user.getUserDetail({
        companyId,
      })

      if (!state) return

      form.setFieldsValue({
        ...data,
      })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      // setDetailLoading(false)
    }
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await api.staff.getCompanyList({
        // page,
        // size,
      })

      if (!state) return

      setListData(data.data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const submit = () => {

    console.log('~~~~~~~~')
  }

  return (
    <>

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
        visible={ userModal }
        title="编辑"
        onCancel={ () => ( setUserModal(false), form.resetFields() ) }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          <Button form="addForm" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ () => ( setUserModal(false), form.resetFields() ) }>取消</Button>,
        ]}
      >
        <Spin spinning={ detailLoading }>
          <Form id="form" form={ form } { ...formItemLayout } onFinish={ submit }>
            <Form.Item label="昵称" name="1" rules={[{required: true, message: '请输入昵称'}]}>
              <Input size="large" placeholder="请输入昵称" />
            </Form.Item>

            <Form.Item label="手机号" name="2" rules={[{required: true, message: '请输入手机号'}]}>
              <Input size="large" placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item label="收寄地址" name="3" rules={[{required: true, message: '请输入收寄地址'}]}>
              <Input size="large" placeholder="请输入收寄地址" />
            </Form.Item>

            {/* <Form.Item label="企业" name="4" rules={[{required: true, message: '请输入排名积分奖励'}]}>
              <Input size="large" placeholder="请输入排名积分奖励" />
            </Form.Item> */}
          </Form>
        </Spin>
      </Modal>

    </>
  )
}

export default Join
