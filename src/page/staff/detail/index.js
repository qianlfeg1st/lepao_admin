import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Modal, Form, Input, Select, InputNumber, Spin, message, Pagination, Row, Col, Radio } from 'antd'
import { staff } from '@/api'
import { AdminContext } from '@/components/Admin'
import styles from './index.module.scss'
import { QrcodeOutlined } from '@ant-design/icons'
import { baseURL } from '@/config'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

const radioOptions = [
  { label: '全部员工', value: 'PBCompanyEmpQueryAll' },
  { label: '管理员', value: 'PBCompanyEmpQueryManager' },
  { label: '禁止名单', value: 'offin'},
]

function StaffDetail () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(true)
  const [listData, setListData] = useState([])
  const [offinData, setOffinData] = useState([])
  const [flag, setFlag] = useState(false)
  const [deptNameSelect, setDeptNameSelect] = useState([])
  const [roleSelect, setRoleSelect] = useState([])
  const [empId, setEmpId] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [companyName, setCompanyName] = useState('')
  const [radioValue, setRadioValue] = useState('PBCompanyEmpQueryAll')

  const [editModel, setEditModel] = useState(false)
  const [qrcodeModel, setQrcodeModel] = useState(false)
  const [ form ] = Form.useForm()

  const { height } = useContext(AdminContext)

  const listColumns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 120,
    },
    {
      title: '所属部门',
      dataIndex: 'dept',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: '加入时间',
      dataIndex: 'joinTime',
      width: 120,
    },
    {
      title: '验证状态',
      dataIndex: 'joined',
      width: 80,
      render: (e) => (
        <>{ e ? '已验证' : '未验证' }</>
      ),
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      width: 70,
    },
    {
      title: '剩余积分',
      dataIndex: 'gold',
      width: 90,
    },
    {
      title: '操作',
      width: 200,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary" onClick={ () => {

              getStaffDetail(e.empId)
            } }>编辑</Button>
            {
              <>
                <Button className="btn" type="danger" onClick={ () => deleted({ empId: e.empId, remove: true }) }>移除</Button>
                <Button className="btn" type="danger" onClick={ () => offin({ empId: e.empId }) }>禁入</Button>
              </>
            }
          </>
        )
      }
    },
  ]

  const offinColumns = [
    {
      title: '用户ID',
      dataIndex: 'empOffinId',
      width: 100,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: '加入时间',
      dataIndex: 'joinTime',
      width: 120,
    },
    {
      title: '验证状态',
      dataIndex: 'phoneValidState',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary" onClick={ () => recover(e.empOffinId) }>移出</Button>
          </>
        )
      }
    },
  ]

  useEffect(() => {

    setCompanyName(decodeURIComponent(location.hash.split('?')[1].split('=')[1]))
  }, [])

  useEffect(() => {

    if (radioValue === 'offin') {

      loadOffinList()
    } else {

      load()
    }
  }, [radioValue, flag])

  const recover = empOffinId => {

    Modal.confirm({
      title: '提示',
      centered: true,
      content: `确定移出吗？`,
      onOk: async () => {

        try {

          const { state } = await staff.recover({
            empOffinId,
          })

          if (!state) return

          message.success('操作成功')

          setFlag(!flag)
        } catch (error) {

          console.log(error)
        } finally {

          // setSettingLoading(false)
        }
      }
    })
  }

  const submit = values => {

    // console.log('~~values~~', values)

    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认编辑吗？',
      onOk: async () => {

        try {

          const { state } = await staff.editStaffDetail({
            ...values,
            empId,
          })

          if (!state) return

          message.success('编辑成功')

          setEditModel(false)

          setFlag(!flag)

          form.resetFields()
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
  }

  const loadOffinList = async () => {

    try {

      setListLoading(true)

      const { state, data } = await staff.getStaffOffinList({
        firstResult: (page - 1) * size,
        companyId,
      })

      if (!state) return

      setOffinData(data.items)
      setTotal(+data.pageable.resultCount)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await staff.getStaffList({
        firstResult: (page - 1) * size,
        companyId,
        query: radioValue,
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

  const getStaffDetail = async empId => {

    try {

      setEditModel(true)

      const { state, data } = await staff.getStaffDetail({
        empId,
      })

      if (!state) return

      setDeptNameSelect(data.deptNameSelect)
      setRoleSelect(data.roleSelect)
      setEmpId(data.empId)

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

  const cancelQrcode = () => {

    setQrcodeModel(false)
  }

  const deleted = ({ empId, remove }) => {

    Modal.confirm({
      title: '提示',
      centered: true,
      content: `确定移除吗？`,
      onOk: async () => {

        try {

          const { state } = await staff.addOrremoveMember({
            empId,
            remove,
          })

          if (!state) return

          message.success('操作成功')

          setFlag(!flag)
        } catch (error) {

          console.log(error)
        }
      }
    })
  }

  const offin = ({ empId, remove }) => {

    Modal.confirm({
      title: '提示',
      centered: true,
      content: `确定禁入吗？`,
      onOk: async () => {

        try {

          const { state } = await staff.offin({
            empId,
          })

          if (!state) return

          setFlag(!flag)

          message.success('操作成功')
        } catch (error) {

          console.log(error)
        } finally {

          // setSettingLoading(false)
        }
      }
    })
  }

  const onChangeRadio = e => {

    // console.log('onChangeRadio', e)

    setRadioValue(e.target.value)
  }

  return (
    <>

      <div className={ styles.title }>{ companyName }员工列表({ total })</div>

      <div className="searchbar">

        <Row>
          <Col span={ 12 }>
            <Radio.Group
              options={ radioOptions }
              onChange={ onChangeRadio }
              value={ radioValue }
              optionType="button"
              buttonStyle="solid"
            />
          </Col>
          <Col span={ 12 } className={ styles.qrcode }>
            {
              radioValue !== 'offin'
                ?
                <>
                  <p className={ styles.text }>点击放大右侧二维码，添加{ radioValue === 'PBCompanyEmpQueryManager' ? '管理员' : '企业员工' }</p>
                  <QrcodeOutlined onClick={ () => setQrcodeModel(true) } />
                </>
                :
                null
            }

          </Col>
        </Row>

      </div>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 300px)', y: `calc(100vh - ${height}px)` }}
        rowKey={ e => e.empId }
        loading={ listLoading }
        columns={  radioValue === 'offin' ? offinColumns : listColumns }
        dataSource={ radioValue === 'offin' ? offinData : listData }
        pagination={ false }
      />

      <div className="pagebar">
        <Pagination
          onChange={ e => setPage(e - 1) }
          total={ total }
          showTotal={ total => `共 ${total} 条` }
          pageSize={ size }
          current={ page + 1 }
          defaultCurrent={ page + 1 }
        />
      </div>

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

            <Form.Item label="剩余积分" name="gold" rules={[{ required: true, message: '请输入剩余积分' }]}>
              <InputNumber size="large" style={{ width: '100%' }} maxLength="10" />
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

      <Modal
        visible={ qrcodeModel }
        title={ companyName }
        onCancel={ cancelQrcode }
        onOk={ null }
        maskClosable={ false }
        centered
        width="450px"
        footer={[
          // <Button form="edit" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ cancelQrcode }>取消</Button>,
        ]}
      >
        <img className={ styles.img } src={ `${baseURL}company_emp/invite_join_companyemp?companyId=${companyId}&isManager=${radioValue === 'PBCompanyEmpQueryManager'}&base_access_token=eyJhbGciOiJIUzI1NiJ9.CAIQ68HBkswu.UnXtXck1zBIbn5crth-kdcTC1ZCb85z0fc0KI-Pv9gY` } />
        <p className={ styles.scan }>微信扫一扫，加为{ radioValue === 'PBCompanyEmpQueryManager' ? '管理员' : '企业员工' }</p>
      </Modal>

    </>
  )
}

export default StaffDetail
