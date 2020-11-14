import React, { useState, useEffect, useContext } from 'react'
import { Table, Button, Modal, Spin, Form, Input, Pagination, Image, InputNumber, Select, Upload } from 'antd'
import { goods } from '@/api'
import { AdminContext } from '@/components/Admin'
import { baseURL } from '@/config'
import { PlusOutlined } from '@ant-design/icons'

const formItemLayout = {
  labelCol: { span: 5, offset: 2, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

const { Option } = Select

function Join () {

  const [form] = Form.useForm()
  const [listLoading, setListLoading] = useState(false)
  const [companyModal, setCompanyModal] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

  const [goodsModal, setGoodsModal] = useState(false)
  const [shelfSelect, setShelfSelect] = useState([])
  const [fileList, setFileList] = useState([])

  const { height } = useContext(AdminContext)

  const listColumns = [
    {
      title: '商品ID',
      dataIndex: 'goodsId',
      width: 70,
    },
    {
      title: '分类',
      dataIndex: 'shelfTitle',
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 210,
    },
    {
      title: '商品封面',
      width: 80,
      render (e) {

        return <Image width={ 36 } src={ e.thumb } />
      }
    },
    {
      title: '进货价',
      dataIndex: 'originPriceLabel',
      width: 80,
    },
    {
      title: '企业采购价',
      dataIndex: 'priceLabel',
      width: 100,
    },
    {
      title: '库存',
      dataIndex: 'storeCountLabel',
      width: 80,
    },
    {
      title: '推荐兑换积分',
      dataIndex: 'gold',
      width: 100,
    },
    {
      title: '操作',
      width: 220,
      render (e) {

        return (
          <>
            <Button className="btn" type="primary" onClick={ () => getGoodsDetail(e.goodsId) }>编辑</Button>
            <Button className="btn" type="primary" onClick={ () => getCompanyDetail(e.companyId) }>上架</Button>
            <Button className="btn" type="danger" onClick={ () => getCompanyDetail(e.companyId) }>下架</Button>
          </>
        )
      }
    },
  ]

  useEffect(() => {

    getGoodsList()
  }, [flag])

  const onChange = e => {

    const list = e.fileList[0]

    setFileList(e.fileList.slice(-1))

    if (list) {

      if (list?.status !== 'done') return

      if (list.xhr?.status === 200) {

        form.setFieldsValue({
          thumb: list.response.stringValue,
        })
      } else {

        form.setFieldsValue({
          thumb: undefined,
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

  const getGoodsList = async () => {

    try {

      setListLoading(true)

      const { state, data } = await goods.getGoodsList({
        pageable: {
          firstResult: (page - 1) * size,
          resultSize: 20,
        },
      })

      if (!state) return

      setListData(data.list)
      setTotal(+data.pageable.resultCount)
      setSize(+data.pageable.resultSize)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  const getGoodsDetail = async goodsId => {

    try {

      setGoodsModal(true)
      setDetailLoading(true)

      const { state, data } = await goods.getGoodsDetail({
        goodsId,
      })

      if (!state) return

      const { name, originPrice, price, gold, storeCount, sourceLink, shelfSelect } = data

      setShelfSelect(shelfSelect)
      setFileList([{
        uid: '-1',
        name: 'image.jpg',
        url: data.thumb,
      }])

      form.setFieldsValue({
        name,
        originPrice,
        price,
        gold,
        storeCount,
        sourceLink,
      })
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setDetailLoading(false)
    }
  }

  const submit = values => {

    console.log('~~values~~', values)

    // const text = type === 'add' ? '创建' : '修改'

    // Modal.confirm({
    //   title: '提示',
    //   centered: true,
    //   content: `确认${text}吗？`,
    //   onOk: async () => {

    //     try {

    //       const { state } = await goods.addOrEditGoods({
    //         ...values,
    //         department: undefined,
    //         deptNames: department,
    //         companyId,
    //       })

    //       if (!state) return

    //       message.success(`${text}成功`)

    //       setAddCompanyModal(false)

    //       setFlag(!flag)

    //       form.resetFields()
    //     } catch (error) {

    //       console.error('~~error~~', error)
    //     }
    //   },
    // })
  }

  return (
    <>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 300px)', y: `calc(100vh - ${height}px)` }}
        rowKey={ e => e.goodsId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

      <div className="pagebar">
        <Pagination
          onChange={ e => {

            setPage(e)
            setFlag(!flag)
          } }
          total={ total }
          showTotal={ total => `共 ${total} 条` }
          pageSize={ size }
          current={ page }
          defaultCurrent={ page }
          showSizeChanger={ false }
        />
      </div>

      <Modal
        visible={ goodsModal }
        title="编辑"
        onCancel={ () => ( setGoodsModal(false), form.resetFields() ) }
        onOk={ null }
        maskClosable={ false }
        centered
        width="40vw"
        footer={[
          <Button form="addForm" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ () => ( setGoodsModal(false), form.resetFields() ) }>取消</Button>,
        ]}
      >
        <Spin spinning={ detailLoading }>
          <Form id="form" form={ form } { ...formItemLayout } onFinish={ submit }>

            <Form.Item label="商品缩略图" name="thumb" rules={[{required: true, message: '请输上传商品缩略图'}]}>
              <Upload
                fileList={ fileList }
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={ true }
                action={ `${baseURL}aliyun/uploadWithFormType` }
                headers={ {
                  base_access_token: sessionStorage.getItem('accessToken'),
                } }
                onChange={ onChange }
              >
                <PlusOutlined />
                <div className="ant-upload-text">上传</div>
              </Upload>
            </Form.Item>

            <Form.Item label="商品名称" name="name" rules={[{required: true, message: '请输入商品名称'}]}>
              <Input size="large" placeholder="请输入商品名称" />
            </Form.Item>

            <Form.Item label="商品分类" name="shelfId" rules={[{required: true, message: '请选择商品分类'}]}>
              <Select placeholder="请选择商品分类" size="large">
                { shelfSelect.map(item => <Option key={ item.shelfId } value={ item.shelfId }>{ item.shelfTitle }</Option>) }
              </Select>
            </Form.Item>

            <Form.Item label="进货价" name="originPrice" rules={[{ required: true, message: '请输入进货价' }]}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="请输入进货价" />
            </Form.Item>

            <Form.Item label="企业采购价" name="price" rules={[{ required: true, message: '请输入企业采购价' }]}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="请输入企业采购价" />
            </Form.Item>

            <Form.Item label="推荐兑换积分" name="gold" rules={[{ required: true, message: '请输入推荐兑换积分' }]}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="请输入推荐兑换积分" />
            </Form.Item>

            <Form.Item label="库存数" name="storeCount" rules={[{ required: true, message: '请输入库存数' }]}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="请输入库存数" />
            </Form.Item>

            <Form.Item label="来源备注" name="sourceLink" rules={[{required: true, message: '请输入来源备注'}]}>
              <Input size="large" placeholder="请输入来源备注" />
            </Form.Item>

          </Form>
        </Spin>
      </Modal>

    </>
  )
}

export default Join
