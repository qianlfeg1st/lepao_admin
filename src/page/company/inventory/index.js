import React, { useState, useEffect } from 'react'
import { Radio, Image, Modal, Button, Spin, Empty, Form, Input, InputNumber, DatePicker, message, Pagination } from 'antd'
import styles from './index.module.scss'
import { company } from '@/api'
import moment from 'moment'
import formatDate from '@/utils/formatDate'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 15, offset: 1, },
  wrapperCol: { span: 14, },
  labelAlign: 'left',
}

function Inventory () {

  const [ form ] = Form.useForm()
  const [modal, setModal] = useState(false)
  const [shelf, setShelf] = useState([])
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentShelf, setCurrentShelf] = useState([])
  const [companyGoodsId, setCompanyGoodsId] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

  useEffect(() => {

    getShelf()
  }, [])

  useEffect(() => {

    if (shelf.length) getGoodsStore()
  }, [currentShelf, flag])

  const getShelf = async () => {

    try {

      const { state, data } = await company.getShelf()

      if (!state) return

      setShelf(data.list)
      setCurrentShelf(data.list[0].shelfId)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const getGoodsStore = async () => {

    try {

      setLoading(true)

      const { state, data } = await company.getGoodsStore({
        firstResult: (page - 1) * size,
        shelfId: currentShelf,
      })

      if (!state) return

      setGoods(data.items)
      setTotal(+data.pageable.resultCount)
      setSize(+data.pageable.resultSize)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  const handleCancel = () => {

    setModal(false)

    setCompanyGoodsId('')

    form.resetFields()
  }

  const radioChange = e => {

    setPage(1)
    setCurrentShelf(e.target.value)
  }

  const showModal = e => {

    const { name, storeCount, gold, downTime, upTime, recommend, companyGoodsId } = e

    form.setFieldsValue({
      name,
      storeCount,
      gold,
      recommend: Number(recommend),
      upDownTime: [moment(new Date(downTime)), moment(new Date(upTime))],
    })

    setCompanyGoodsId(companyGoodsId)

    setModal(true)
  }

  const submit = e => {

    Modal.confirm({
      title: '提示',
      centered: true,
      content: '确认编辑吗？',
      onOk: async () => {

        try {

          const { state } = await company.editGoodsStore({
            ...e,
            companyGoodsId,
            downTime: formatDate(e.upDownTime[0].valueOf()),
            upTime: formatDate(e.upDownTime[1].valueOf()),
            upDownTime: undefined,
            name: undefined,
            recommend: !!e.recommend,
          })

          if (!state) return

          getGoodsStore()

          message.success('编辑成功')

          handleCancel()
        } catch (error) {

          console.error('~~error~~', error)
        }
      },
    })
  }

  return (
    <div className={ styles.page }>

      <Radio.Group value={ currentShelf } buttonStyle="solid" size="large" className={ styles.radio } onChange={ radioChange }>
        {
          shelf.map(item => <Radio.Button key={ item.shelfId } value={ item.shelfId }>{ item.title }</Radio.Button>)
        }
      </Radio.Group>

      <Spin size="large" spinning={ loading }>
        {
          goods.length
            ?
            <div className={ styles.goods }>
              {
                goods.map(item => {

                  return (
                    <div className={ styles.goods__wrap } key={ item.companyGoodsId }>
                      <Image className={ styles.goods__img } width={ 220 } height={ 220 } src={ item.thumb } />
                      <div className={ styles.goods__name }>{ item.name }</div>
                      <div className={ styles.goods__box }>
                        <p className={ `${styles.goods__label1} center` }>所需积分 { item.gold }</p>
                        <p className={ `${styles.goods__label2} center` }>剩余数量  { item.storeCount }</p>
                      </div>
                      <div className={ `${styles.goods__btn} center` } onClick={ () => showModal(item) }>编辑</div>
                    </div>
                  )
                })
              }
            </div>
            :
            <Empty />
        }

      </Spin>

      <div className={ `pagebar ${styles.pagebar}` }>
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
        />
      </div>

      <Modal
        visible={ modal }
        title="编辑"
        onCancel={ handleCancel }
        onOk={ null }
        maskClosable={ false }
        centered
        width="670px"
        footer={[
          <Button form="edit" key="save" type="primary" htmlType="submit" size="default">确定</Button>,
          <Button key="cancel" type="default" size="default" onClick={ handleCancel }>关闭</Button>,
        ]}
      >
        <Form id="edit" form={ form } { ...formItemLayout } onFinish={ submit }>

          <Form.Item label="商品名称" name="name">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item label="商品兑换的积分" name="gold" rules={[{ required: true, message: '请输入兑换积分' }]}>
            <InputNumber size="large" style={{ width: '100%' }} maxLength="7" />
          </Form.Item>

          <Form.Item label="商品库存数量" name="storeCount" rules={[{ required: true, message: '请输入库存数量' }]}>
            <InputNumber size="large" style={{ width: '100%' }} maxLength="4" />
          </Form.Item>

          <Form.Item label="上架时间" name="upDownTime" rules={[{ required: true, message: '请选择上架时间' }]}>
            <RangePicker
              style={{ width: '100%' }}
              size="large"
              format="YYYY/MM/DD"
            />
          </Form.Item>

          <Form.Item label="设为企业推荐奖品" name="recommend" rules={[{ required: true, message: '请选择' }]}>
            <Radio.Group>
              <Radio value={ 1 }>是</Radio>
              <Radio value={ 0 }>否</Radio>
            </Radio.Group>
          </Form.Item>

        </Form>
      </Modal>

    </div>
  )
}

export default Inventory
