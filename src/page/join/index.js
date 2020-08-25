import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Input, InputNumber, Select, Tag, Upload, Breadcrumb } from 'antd'
import api from '@/api'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const { Option } = Select
const tag = ['Tag 1', 'Tag 2', 'Tag 3']
let inputDom = null
let type = ''
let imageUrl = ''

function Join () {

  const formItemLayout = {
    labelCol: { span: 5, offset: 2, },
    wrapperCol: { span: 14, },
    labelAlign: 'left',
  }

  const joinState = {
    PBCompanyJoinStateOpen: '开放',
    PBCompanyJoinStateClose: '不开放',
  }

  const [ form ] = Form.useForm()
  const [isAddCompany, setAddCompany] = useState(false)
  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([
    {
      "empTotal": 10,
      "companyName": "aaa",
      "companyLogo": "aaa",
      "joinState": "PBCompanyJoinStateClose",
      "companyId": 1,
      "empJoinedTotal": 0,
      "deptNames": "sssss/123"
    }
  ])
  // const [page, setPage] = useState(0)
  // const [total, setTotal] = useState(0)
  // const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)
  const [inputVisible, setInputVisible] = useState(false)
  const [department, setDepartment] = useState([])
  const [inputValue, setInputValue] = useState('')

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
      title: '企业状态',
      dataIndex: 'joinState',
      width: 100,
      render: (e) => (
        <>{ joinState[e] }</>
      ),
    },
    {
      title: '企业部门',
      dataIndex: 'deptNames',
      width: 100,
    },
    {
      title: '总员工数',
      dataIndex: 'empTotal',
      width: 100,
    },
    {
      title: '已加入员工数',
      dataIndex: 'empJoinedTotal',
      width: 100,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <Button type="primary" onClick={ () => {

            setAddCompany(true)
            type = 'edit'
          } }>编辑</Button>
        )
      }
    },
  ]

  useEffect(() => {

    // load()
  }, [flag])

  useEffect(() => {

    if (!inputVisible) return

    inputDom.focus()
  }, [inputVisible])

  const load = async () => {

    try {

      setListLoading(true)

      const { status, data } = await api.join.getCompanyList({
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

  const inputChange = e => {

    // console.log('~~~~~~', e.target.value)
    setInputValue(e.target.value)
  }

  const submit = async values => {

    console.log('~~values~~', values)

    try {

      setDialogLoading(true)

      const postURL = editType === 'add' ? equipApi.addEquip : equipApi.updateEquip

      const { status } = await api.join[`${type}Company`]({
        ...values,
        deptNames: department,
      })

      if (status) {

        message.success(`${type === 'add' ? '创建' : '修改'}成功`)

        setAddCompany(false)

        setFlag(!flag)

        form.resetFields()
      }

    } catch (error) {

      console.log(error)
    } finally {

      setDialogLoading(false)
    }
  }

  const inputConfirm = () => {

    setInputVisible(false)

    const departmentArr = [inputValue, ...department]

    setDepartment(departmentArr)

    form.setFieldsValue({
      department: departmentArr,
    })

    setInputValue('')
  }

  const saveInputRef = input => {

    inputDom = input
  }

  const showInput = () => {

    setInputVisible(true)
  }

  const uploadButton = (
    <>
      {/* { true ? <LoadingOutlined /> : <PlusOutlined /> } */}
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </>
  );

  return (
    <>

      {/* 搜索条件 */}
      <div className="searchbar">
        <div className="searchbtn">
          <Button className="btn" icon={ <PlusOutlined /> } type="primary" size="large" onClick={ () => {

            setAddCompany(true)
            type = 'add'
          } }>创建企业</Button>
        </div>
      </div>

      <Breadcrumb separator=">">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>企业入驻</Breadcrumb.Item>
      </Breadcrumb>

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
        visible={ isAddCompany }
        title={ `${type === 'add' ? '创建' : '编辑'}企业` }
        onCancel={ () => ( setAddCompany(false), form.resetFields() ) }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          <Button form="addForm" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ () => ( setAddCompany(false), form.resetFields() ) }>取消</Button>,
        ]}
      >
        <Form id="addForm" form={ form } { ...formItemLayout } onFinish={ submit }>
          <Form.Item label="企业名称" name="companyName" rules={[{required: true, message: '请输入企业名称'}]}>
            <Input size="large" placeholder="请输入企业名称" />
          </Form.Item>

          <Form.Item label="企业LOGO" name="logo" hasFeedback help="Should be combination of numbers & alphabets" validateStatus="error">
            <Upload
              fileList={ [] }
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              // onChange={this.handleChange}
            >
              { imageUrl ? <img src={ imageUrl } alt="avatar" style={{ width: '100%' }} /> : uploadButton }
            </Upload>
          </Form.Item>

          <Form.Item label="企业介绍" name="desc" rules={[{required: true, message: '请输入企业介绍'}]}>
            <Input.TextArea size="large" placeholder="请输入企业介绍" />
          </Form.Item>

          <Form.Item label="企业状态" name="joinState" rules={[{required: true, message: '请选择企业状态'}]}>
            <Select placeholder="请选择企业状态" size="large">
              { Object.keys(joinState).map(key => <Option key={key} value={key}>{joinState[key]}</Option>) }
            </Select>
          </Form.Item>

          <Form.Item label="总员工总数" name="empTotal" rules={[{required: true, message: '请输入总员工总数'}]}>
            <InputNumber size="large" placeholder="请输入总员工总数" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="企业部门" name="department" rules={[{required: true, message: '请添加部门'}]}>
            <>
              { department.map((item, index) => <Tag className={ styles['edit-tag'] } closable key={ index }>{ item }</Tag>) }
              {
                inputVisible
                  ?
                  <Input
                    ref={ saveInputRef }
                    type="text"
                    size="small"
                    className={ styles['tag-input'] }
                    value={ inputValue }
                    onChange={ inputChange }
                    onBlur={ inputConfirm }
                    onPressEnter={ inputConfirm }
                  />
                  :
                  <Tag className={ styles['site-tag-plus'] } onClick={ showInput }>
                    <PlusOutlined />新增部门
                  </Tag>
              }
            </>
          </Form.Item>

          <Form.Item label="联系人姓名" name="2" rules={[{required: true, message: '请输入联系人姓名'}]}>
            <Input size="large" placeholder="请输入联系人姓名" />
          </Form.Item>

          <Form.Item label="联系人手机" name="1" rules={[{required: true, message: '请输入联系人手机'}]}>
            <Input size="large" placeholder="请输入联系人手机" />
          </Form.Item>
        </Form>
      </Modal>

    </>
  )
}

export default Join
