import React, { useState, useEffect, useContext } from 'react'
import { Table, Modal, Button, Form, Input, InputNumber, Select, Tag, Upload, Breadcrumb, message, Spin } from 'antd'
import { join } from '@/api'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { joinState } from '@/stores'
import { AdminContext } from '@/components/Admin'
import { baseURL } from '@/config'

const { Option } = Select
let inputDom = null
let type = ''

function Join () {

  const formItemLayout = {
    labelCol: { span: 5, offset: 2, },
    wrapperCol: { span: 14, },
    labelAlign: 'left',
  }

  const [ form ] = Form.useForm()
  const [addCompanyModal, setAddCompanyModal] = useState(false)
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(true)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [inputVisible, setInputVisible] = useState(false)
  const [department, setDepartment] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [companyId, setCompanyId] = useState(undefined)
  const [fileList, setFileList] = useState([])

  const { height } = useContext(AdminContext)

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
          <Button type="primary" onClick={ () => getCompanyDetail(e.companyId) }>编辑</Button>
        )
      }
    },
  ]

  useEffect(() => {

    load()
  }, [flag])

  useEffect(() => {

    if (!inputVisible) return

    inputDom.focus()
  }, [inputVisible])

  const onChange = e => {

    const list = e.fileList[0]

    // console.log('~~onChange~~', e.fileList)

    setFileList(e.fileList.slice(-1))

    if (list) {

      if (list?.status !== 'done') return

      if (list.xhr?.status === 200) {

        form.setFieldsValue({
          companyLogo: list.response.stringValue,
        })
      } else {

        form.setFieldsValue({
          companyLogo: undefined,
        })

        // 清除缩略图
        setFileList([])
      }
    } else {

      form.setFieldsValue({
        companyLogo: undefined,
      })
    }
  }

  const getCompanyDetail = async companyId => {

    try {

      type = 'edit'
      setDetailLoading(true)
      setAddCompanyModal(true)

      const { state, data } = await join.getCompanyDetail({
        companyId,
      })

      if (!state) return

      setCompanyId(companyId)
      setDepartment(data.deptNames)
      setFileList([{
        uid: '-1',
        name: 'image.jpg',
        url: data.companyLogo,
      }])

      form.setFieldsValue({
        ...data,
        department: data.deptNames,
      })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setDetailLoading(false)
    }
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await join.getCompanyList()

      if (!state) return

      setListData(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const inputChange = e => {

    setInputValue(e.target.value)
  }

  const submit = values => {

    // console.log('~~values~~', values)

    const text = type === 'add' ? '创建' : '修改'

    Modal.confirm({
      title: '提示',
      centered: true,
      content: `确认${text}吗？`,
      onOk: async () => {

        try {

          const { state } = await join.addOrEditCompany({
            ...values,
            department: undefined,
            deptNames: department,
            companyId,
          })

          if (!state) return

          message.success(`${text}成功`)

          setAddCompanyModal(false)

          setFlag(!flag)

          form.resetFields()
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
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

  const closeTag = index => {

    setDepartment(department.filter((_, idx) => idx !== index))
  }

  return (
    <>

      <div className="searchbar">
        <div className="searchbtn">
          <Button className="btn" icon={ <PlusOutlined /> } type="primary" size="large" onClick={ () => {

            form.resetFields()
            setDepartment([])
            setDetailLoading(false)
            setCompanyId(undefined)
            setAddCompanyModal(true)
            setFileList([])

            type = 'add'
          } }>创建企业</Button>
        </div>
      </div>

      {/* <Breadcrumb separator=">">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>企业入驻</Breadcrumb.Item>
      </Breadcrumb> */}

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 300px)', y: `calc(100vh - ${height}px)` }}
        rowKey={ e => e.companyId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

      <Modal
        visible={ addCompanyModal }
        title={ `${type === 'add' ? '创建' : '编辑'}企业` }
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
          <Form id="addForm" form={ form } { ...formItemLayout } onFinish={ submit }>
            <Form.Item label="企业名称" name="companyName" rules={[{required: true, message: '请输入企业名称'}]}>
              <Input size="large" placeholder="请输入企业名称" />
            </Form.Item>

            <Form.Item label="企业LOGO" name="companyLogo" rules={[{required: true, message: '请输上传企业LOGO'}]}>
              <Upload
                fileList={ fileList }
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={ true }
                action={ `${baseURL}aliyun/uploadWithFormType` }
                headers={ {
                  base_access_token: 'eyJhbGciOiJIUzI1NiJ9.CAIQ68HBkswu.UnXtXck1zBIbn5crth-kdcTC1ZCb85z0fc0KI-Pv9gY',
                } }
                onChange={ onChange }
              >
                <PlusOutlined />
                <div className="ant-upload-text">上传</div>
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
                { department.map((item, index) => <Tag className={ styles['edit-tag'] } closable key={ index } onClose={ () => closeTag(index) }>{ item }</Tag>) }
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

            <Form.Item label="联系人姓名" name="contactName" rules={[{required: true, message: '请输入联系人姓名'}]}>
              <Input size="large" placeholder="请输入联系人姓名" />
            </Form.Item>

            <Form.Item label="联系人手机" name="contactPhoneNumber" rules={[{required: true, message: '请输入联系人手机'}]}>
              <Input size="large" placeholder="请输入联系人手机" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

    </>
  )
}

export default Join
