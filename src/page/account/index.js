import React, { useState, useEffect, useContext } from 'react'
import { Table, Pagination, Input, Button, Modal, Form, message, DatePicker, Select } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import api from '@/api'
import formatTime from '@/utils/formatTime'
import moment from 'moment'
import { AdminContext } from '../Admin'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
  labelAlign: 'left',
}

const { RangePicker } = DatePicker
const { Option } = Select

// 筛选初始项
const initFilters = {
  account: undefined,
  startTime: undefined,
  endTime: undefined,
  isSuper: undefined,
}

const accountTypes = {
  0: '普通管理员',
  1: '超级管理员',
}

export default function Account () {

  const [ form ] = Form.useForm()

  const [
    filters,
    setFilters
  ] = useState(initFilters)

  const [
    submitFilters,
    setSubmitFilters
  ] = useState(initFilters)

  const [
    listLoading,
    setListLoading
  ] = useState(false)

  const [
    listData,
    setListData
  ] = useState([])

  const [
    page,
    setPage
  ] = useState(0)


  const [
    total,
    setTotal
  ] = useState(0)

  const [
    size,
    setSize
  ] = useState(20)

  // 模态框
  const [isShowModal, setModalVisible] = useState(false)
  const [editType, setEditType] = useState()
  const [flag, setFlag] = useState(false) // 标记新增或编辑后 加载列表
  const [dialogLoading, setDialogLoading] = useState(false)
  const [height, dispatch] = useContext(AdminContext)

  useEffect(() => {

    (async () => {

      try {

        setListLoading(true)

        const { status, data } = await api.account.getAccountList({
          page,
          size,
          ...filters,
        })

        if (!status) return

        setListData(data.data)
        setTotal(data.total)

        dispatch({ type: 'change' })
      } catch (error) {

        console.log(error)
      } finally {

        setListLoading(false)
      }
    })()
  }, [page, size, flag, submitFilters])

  const listColumns = [
    {
      title: '用户名',
      dataIndex: 'account',
      width: 100,
    },
    {
      title: '超级管理员',
      dataIndex: 'is_super',
      width: 100,
      render (data) {

        return (
          <>{ accountTypes[data] }</>
        )
      }
    },
    {
      title: ' 手机',
      dataIndex: 'mobile',
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'add_time',
      width: 100,
      render (data) {

        return (
          <>{ formatTime(data) }</>
        )
      }
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operationBtn',
    //   width: 100,
    //   render (text, record) {
    //     return(
    //       <Button shape="round" type="primary" onClick={ () => ( form.setFieldsValue(record), setEditType('update'), setModalVisible(true) ) }>详情</Button>
    //     )
    //   }
    // },
  ]

  // 保存 或 更新
  const handleSave = async values => {

    try {

      setDialogLoading(true)

      const { status } = await api.account.addOrUpdateAccount({
        ...values,
        editType, // api路径
      })

      if (status) {

        message.success(`${editType === 'add' ? '新增' : '更新'}成功`)
        setModalVisible(false)
        setFlag(!flag)

        form.resetFields()
      }
    } catch (error) {

      console.log(error)
    } finally {

      setDialogLoading(false)
    }

  }

  const add = async values => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定新增账号吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          setDialogLoading(true)

          const { status } = await api.account.add({
            ...values,
          })

          if (status === 200) {

            message.success('新增账号成功')

            setModalVisible(false)
            setFlag(!flag)

            form.resetFields()
          }
        } catch (error) {

          console.log(error)
        } finally {

          setDialogLoading(false)
        }
      }
    })
  }

  return (

    <>
      {/* 搜索条件 */}
      <div className="searchbar">

        <div className="searchitems">

          <div className="searchitem">
            <p>用户名：</p>
            <Input placeholder="请输入用户名" allowClear={ true } value={ filters.account } onChange={ ({ target: { value } }) => setFilters({ ...filters, account: value }) } />
          </div>

          <div className="searchitem">
            <p>类型：</p>
            <Select placeholder="请选择类型" allowClear={ true } value={ filters.isSuper } style={{ width: 194 }} onChange={ value => setFilters({ ...filters, isSuper: value }) }>
              <Option value="">全部</Option>
              { Object.keys(accountTypes).map(key => <Option key={ key } value={ +key }> { accountTypes[key] } </Option>) }
            </Select>
          </div>

          <div className="searchitem">
            <p>手机号：</p>
            <Input placeholder="请输入手机号" allowClear={ true } value={ filters.mobile } onChange={ ({ target: { value } }) => setFilters({ ...filters, mobile: value }) } />
          </div>

          <div className="searchitem">
            <p>邮箱：</p>
            <Input placeholder="请输入邮箱" allowClear={ true } value={ filters.email } onChange={ ({ target: { value } }) => setFilters({ ...filters, email: value }) } />
          </div>

          <div className="searchitem">
            <p>创建时间：</p>
            <RangePicker
              allowClear={ false }
              placeholder={['开始时间', '结束时间']}
              value={ filters.startTime ? [moment(filters.startTime), moment(filters.endTime)] : undefined  }
              onChange={ e => setFilters({...filters, startTime: +new Date(moment(e[0])._d), endTime: +new Date(moment(e[1])._d), }) }
            />
          </div>

        </div>

        <div className="searchbtn">
          <Button shape="round" className="btn" icon={ <PlusOutlined /> } type="primary" size="large" onClick={ () => ( setModalVisible(true), setEditType('add') ) }>新增</Button>
          <Button shape="round" className="btn" icon={ <SearchOutlined /> } type="primary" size="large" onClick={ () => setSubmitFilters(filters) }>查询</Button>
          <Button shape="round" className="btn" icon={ <DeleteOutlined /> } size="large" onClick={ () => (setPage(0), setSize(20), setFilters(initFilters), setSubmitFilters(initFilters)) }>重置</Button>
        </div>

      </div>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 400px)', y: `calc(100vh - ${height}px)` }}
        rowKey={ data => data._id }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

      <div className="pagebar">
        <Pagination
          onChange={ e => setPage(e - 1) }
          total={ total }
          showTotal={ total => `共 ${total} 条` }
          showSizeChanger={ true }
          onShowSizeChange={ (_, currentSize) => (setPage(0), setSize(currentSize)) }
          pageSize={ size }
          current={ page + 1 }
          defaultCurrent={ page + 1 }
        />
      </div>

      {/* 模态框 */}
      <Modal
        visible={ isShowModal }
        title={ editType=== 'add' ? '新增账号' : '账号详情' }
        onCancel={ () => (setModalVisible(false), form.resetFields()) }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={
          <>
            <Button shape="round" className="btn" key="cancel" type="default" size="default" onClick={ () => (setModalVisible(false), form.resetFields()) }>取消</Button>
            <Button shape="round" form="addForm" className="btn" key="save" type="primary" size="default" htmlType="submit" loading={ dialogLoading }>确定</Button>
          </>
        }
      >
        <div>
          <Form id="addForm" { ...formItemLayout } form={ form } onFinish={ add }>

            <Form.Item labelCol={{span: 4, offset: 2}} label="账号" name="account" rules={[{required: true, message: '请输入账号'}]}>
              <Input disabled={ editType === 'update' } size="large" placeholder="请输入账号" />
            </Form.Item>

            <Form.Item labelCol={{span: 4, offset: 2}} label="手机号" name="mobile" rules={[{required: true, message: '请输入手机号'}]}>
              <Input size="large" placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item labelCol={{span: 4, offset: 2}} label="邮箱" name="email" rules={[{required: true, message: '请输入邮箱'}]}>
              <Input size="large" placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item labelCol={{span: 4, offset: 2}} label={ editType === 'add' ? '登录密码' : '新密码' } name="password" rules={[{required: true, message: '请输入登录密码'}]}>
              <Input size="large" type="password" placeholder="请输入登录密码" />
            </Form.Item>

          </Form>
        </div>
      </Modal>
    </>
  )
}
