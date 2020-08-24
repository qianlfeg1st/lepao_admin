import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Input, InputNumber, Select, Tag } from 'antd'
import api from '@/api'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const { Option } = Select
const tag = ['Tag 1', 'Tag 2', 'Tag 3']

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
  const [isAddCompany, setAddCompany] = useState(true)
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
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)
  const [inputVisible, setInputVisible] = useState(false)

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
  ]

  useEffect(() => {

    // load()
  }, [page, size, flag])

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

  const handleSave = async values => {

    console.log('~~values~~', values)

    // try {

    //   setDialogLoading(true)

    //   const postURL = editType === 'add' ? equipApi.addEquip : equipApi.updateEquip

    //   const { status } = await postURL({
    //     ...values,
    //     lanUrl: `https://${values.lanUrl}.zjshell.com`,
    //   })

    //   if (status) {

    //     message.success(`${editType === 'add' ? '新增' : '修改'}成功`)
    //     setModalVisible(false)
    //     setFlag(!flag)

    //     form.resetFields()
    //   }

    // } catch (error) {

    //   console.log(error)
    // } finally {

    //   setDialogLoading(false)
    // }
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
        visible={ isAddCompany }
        title={ '新增公司' }
        onCancel={ () => ( setAddCompany(false), form.resetFields() ) }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          <Button shape="round" form="addForm" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button shape="round" key="cancel" type="default" size="default" onClick={ () => ( setAddCompany(false), form.resetFields() ) }>取消</Button>,
        ]}
      >
        <Form id="addForm" form={ form } { ...formItemLayout } onFinish={ handleSave }>
          <Form.Item label="企业名称" name="companyName" rules={[{required: true, message: '请输入企业名称'}]}>
            <Input size="large" placeholder="请输入企业名称" />
          </Form.Item>

          <Form.Item label="员工总数" name="empTotal" rules={[{required: true, message: '请输入员工总数'}]}>
            <InputNumber size="large" placeholder="请输入员工总数" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="企业部门" name="companyName">
            <Tag closable>
              Tag 2
            </Tag>
            <Tag closable>
              Prevent Default
            </Tag>
            {
              inputVisible && (
                <Input
                  // ref={this.saveInputRef}
                  type="text"
                  size="small"
                  className={ styles['tag-input'] }
                  // value={inputValue}
                  // onChange={this.handleInputChange}
                  // onBlur={this.handleInputConfirm}
                  // onPressEnter={this.handleInputConfirm}
                />
              )}
            {
              !inputVisible && (
                <Tag className={ styles['site-tag-plus'] } onClick={ () => setInputVisible(true) }>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
          </Form.Item>

          <Form.Item label="活动介绍" name="desc" rules={[{required: true, message: '请输入活动介绍'}]}>
            <Input.TextArea size="large" placeholder="请输入活动介绍" />
          </Form.Item>

          <Form.Item label="活动状态" name="joinState" rules={[{required: true, message: '请选择活动状态'}]}>
            <Select placeholder="请选择活动状态" size="large">
              { Object.keys(joinState).map(key => <Option key={key} value={key}>{joinState[key]}</Option>) }
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </>
  )
}

export default Join
