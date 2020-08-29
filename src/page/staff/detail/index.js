import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Modal, Form, Input, Select, InputNumber, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { staff } from '@/api'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function StaffDetail () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(true)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [deptNameSelect, setDeptNameSelect] = useState([])
  const [roleSelect, setRoleSelect] = useState([])

  const [editModel, setEditModel] = useState(false)
  const [ form ] = Form.useForm()

  const listColumns = [
    {
      title: '编号',
      dataIndex: 'empId',
      width: 60,
    },
    {
      title: '加入时间',
      dataIndex: 'joinTime',
      width: 120,
    },
    {
      title: '所属部门',
      dataIndex: '',
      width: 100,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: '授权验证手机时间',
      dataIndex: '',
      width: 120,
    },
    {
      title: '验证状态',
      dataIndex: 'joined',
      width: 100,
      render: (e) => (
        <>{ e ? '已验证' : '未验证' }</>
      ),
    },
    {
      title: '禁用状态',
      dataIndex: 'locked',
      width: 100,
      render: (e) => (
        <>{ e ? '已禁用' : '未禁用' }</>
      ),
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      width: 100,
    },
    {
      title: '剩余积分',
      dataIndex: 'score',
      width: 100,
    },
    {
      title: '操作',
      width: 220,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary" onClick={ () => {

              getStaffDetail(e.empId)
            } }>编辑</Button>
            {
              e.locked
                ?
                <Button className="btn" type="primary" onClick={ () => deleted(e) }>撤销</Button>
                :
                <>
                  <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除</Button>
                  <Button className="btn" type="danger" onClick={ () => deleted(e) }>移除并禁入</Button>
                </>
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

    console.log('~~values~~', values)

    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认编辑吗？',
      onOk: async () => {

        try {

          const { state } = await staff.editStaffDetail({
            ...values,
          })

          if (!state) return

          // message.success(`${content}成功`)

          // setAddCompanyModal(false)

          // setFlag(!flag)

          // form.resetFields()
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await staff.getStaffList({
        firstResult: 0,
        companyId,
      })

      if (!state) return

      setListData(data.items)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const getStaffDetail = async empId => {

    try {

      setEditModel(true)

      const { state, data } = await staff.getStaffDetail({
        empId,
      })

      if (!state) return

      setDeptNameSelect(data.deptNameSelect)
      setRoleSelect(data.roleSelect)

      form.setFieldsValue({
        ...data,
      })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setDetailLoading(false)
    }
  }

  const onCancel = () => {

    setEditModel(false)

    form.resetFields()
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
        rowKey={ e => e.empId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

      <Modal
        visible={ editModel }
        title="编辑员工信息"
        onCancel={ onCancel }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          <Button form="edit" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ onCancel }>取消</Button>,
        ]}
      >
        <Spin spinning={ detailLoading }>
          <Form id="edit" form={ form } { ...formItemLayout } onFinish={ submit }>
            <Form.Item label="所属企业" name="companyName">
              <Input size="large" disabled />
            </Form.Item>

            <Form.Item label="昵称" name="nickName" rules={[{ required: true, message: '请输入昵称' }]}>
              <Input size="large" />
            </Form.Item>

            <Form.Item label="剩余积分" name="score" rules={[{ required: true, message: '请输入剩余积分' }]}>
              <InputNumber size="large" style={{ width: '100%' }} maxLength="11" />
            </Form.Item>

            <Form.Item label="手机号" name="phoneNumber" rules={[{ required: true, message: '请输入手机号' }]}>
              <InputNumber size="large" style={{ width: '100%' }} maxLength="11" />
            </Form.Item>

            <Form.Item label="所属部门" name="deptName" rules={[{required: true, message: '请选择所属部门'}]}>
              <Select placeholder="请选择所属部门" size="large">
                { deptNameSelect.map(key => <Select.Option key={ key } value={ key }>{ key }</Select.Option>) }
              </Select>
            </Form.Item>

            <Form.Item label="角色" name="roleId" rules={[{required: true, message: '请选择角色'}]}>
              <Select placeholder="请选择角色" size="large">
                { roleSelect.map(({ roleId, name }) => <Select.Option key={ roleId } value={ roleId }>{ name }</Select.Option>) }
              </Select>
            </Form.Item>

          </Form>
        </Spin>

      </Modal>

    </>
  )
}

export default StaffDetail
