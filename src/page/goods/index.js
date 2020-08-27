import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Spin, Form, Input } from 'antd'
import { point } from '@/api'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function Join () {

  const [form] = Form.useForm()
  const [listLoading, setListLoading] = useState(false)
  const [companyModal, setCompanyModal] = useState(false)
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
      title: '企业编号',
      dataIndex: 'companyId',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 100,
    },
    {
      title: '已发放积分',
      dataIndex: '',
      width: 100,
    },
    {
      title: '已兑换积分',
      dataIndex: '',
      width: 100,
    },
    {
      title: '人均积分持有数',
      dataIndex: '',
      width: 100,
    },
    {
      title: '步数积分比',
      dataIndex: '',
      width: 100,
    },
    {
      title: '单日积分上限',
      dataIndex: '',
      width: 100,
    },
    {
      title: '周积分奖励',
      dataIndex: '',
      width: 100,
    },
    {
      title: '排名积分奖励',
      dataIndex: '',
      width: 100,
    },
    {
      title: '邀请积分奖励',
      dataIndex: '',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <Button type="primary" onClick={ () => getCompanyDetail(e.companyId) }>编辑</Button>
        )
      }
    },
  ]

  useEffect(() => {

    // load()
  }, [flag])

  const getCompanyDetail = async companyId => {

    try {

      setCompanyModal(true)

      const { state, data } = await point.getCompanyDetail({
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

      const { state, data } = await point.getCompanyList({
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
        visible={ companyModal }
        title="编辑"
        onCancel={ () => ( setAddCompanyModal(false), form.resetFields() ) }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          <Button form="addForm" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ () => ( setAddCompanyModal(false), form.resetFields() ) }>取消</Button>,
        ]}
      >
        <Spin spinning={ detailLoading }>
          <Form id="form" form={ form } { ...formItemLayout } onFinish={ submit }>
            <Form.Item label="步数积分比" name="1" rules={[{required: true, message: '请输入步数积分比'}]}>
              <Input size="large" placeholder="请输入步数积分比" />
            </Form.Item>

            <Form.Item label="单日积分上限" name="2" rules={[{required: true, message: '请输入单日积分上限'}]}>
              <Input size="large" placeholder="请输入单日积分上限" />
            </Form.Item>

            <Form.Item label="周积分奖励" name="3" rules={[{required: true, message: '请输入周积分奖励'}]}>
              <Input size="large" placeholder="请输入周积分奖励" />
            </Form.Item>

            <Form.Item label="排名积分奖励" name="4" rules={[{required: true, message: '请输入排名积分奖励'}]}>
              <Input size="large" placeholder="请输入排名积分奖励" />
            </Form.Item>

            <Form.Item label="邀请积分奖励" name="5" rules={[{required: true, message: '请输入邀请积分奖励'}]}>
              <Input size="large" placeholder="请输入邀请积分奖励" />
            </Form.Item>

          </Form>
        </Spin>
      </Modal>

    </>
  )
}

export default Join
