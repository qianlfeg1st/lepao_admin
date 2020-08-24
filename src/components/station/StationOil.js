import React, { useMemo, useState, useEffect } from 'react'
import { Table, Button, Modal, Row, Col, Input, Form, Spin, message } from 'antd'
import * as stationApi  from './../../api/station/index'
import { settingListColumns } from './../../page/station/columns'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const formItemLayout = {
  labelCol: { span: 3, offset: 2 },
  wrapperCol: { span: 16 },
  labelAlign: 'left',
}

// 油品数据
let oilRecord = null

export const StationOil =  (props) =>  {

  const { settingLoading, setSettingLoading, setIsShowOilModal, isShowSettingModal, setIsShowSettingModal, oilListData, QRcodeData, handleUplodImg, setQRcodeData, oilEditType, setOilEditType, isShowOilModal, gasStationId, setOilListData } = props?.data

  const [oilForm] = Form.useForm()
  const [oilLoading, setOilLoading] = useState(false)
  const [reloadOil, setIsReloadOil] = useState(0)

  useEffect(() => {

    try {

      if (!gasStationId) return

      (async () => {

        const { data } = await stationApi.getOilList({
          gasStationId,
        })

        if (data?.status) {

          setOilListData([...data.data])
        }
      })()

    } catch (error) {

      console.log(error)
    }
  }, [reloadOil])


  // 保存油型
  const handleSaveOil = async formValues => {

    try {

      const { oilNumber, gunNumber } = formValues;

      // 中文逗号转英文逗号，去除所有空格，去除开头逗号，去除末尾逗号
      let filterRes = gunNumber.replace(/，/g, ',').replace(/\s+/g, '').replace(/^,+/, "").replace(/,+$/, "")

      // 判重
      let resArr = filterRes.split(',')
      const resSetArr = [... new Set(resArr)]

      if (resSetArr.length < resArr.length) return message.error('存在重复油枪号或存在多个空值，请检查')

      // 空油枪
      if (resSetArr.includes('')) return message.error('油枪号存在空值，请检查')

      // 整数正则(含0)
      const regExp = /^[0-9]\d*$/

      const errRes = resSetArr.filter(item => !(regExp.test(item)))

      console.log(resSetArr, errRes)

      if (errRes.length > 0) return message.error('油枪号必须为整数，请检查')

      setOilLoading(true)

      if (oilEditType === 'add') {

        const { data } = await stationApi.addOil({
          gasStationId,
          oilNumber,
          gunNumber: filterRes
        })

        if(data?.status) {

          message.success('新增成功')
          oilForm.resetFields()
          setIsShowOilModal(false)
          setIsReloadOil(Math.random())
        }
      } else if (oilEditType === 'edit'){

        const { data } = await stationApi.updateOil({
          gasStationId,
          oilNumber,
          id: oilRecord.id,
          gunNumber: filterRes
        })

        if(data?.status) {

          message.success('更新成功')
          oilForm.resetFields()
          setIsShowOilModal(false)
          setIsReloadOil(Math.random())
        }
      }

    }catch(error) {

      console.log(error)
    } finally {

      setOilLoading(false)
    }

  }

  // 新增油型
  const handleAddOil = () => {

    setOilEditType('add')
    setIsShowOilModal(true)
  }

  // 查看油型
  const handleViewOilDetail = record => {

    oilForm.setFieldsValue(record)
    // 油型数据
    oilRecord = record

    setOilEditType('edit')
    setIsShowOilModal(true)
  }

  // 删除油型
  const handleDeleteOilNumber = id => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定删除该油型吗？',
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

  // 删除二维码
  const handleDelteQRcode = () => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定删除二维码图片吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          setSettingLoading(true)

          const { data } = await stationApi.deleteQRcode({
            id: QRcodeData?.id
          })

          if (data?.status) {

            message.success('删除成功')
            setQRcodeData({})
          }
        } catch (error) {

          console.log(error)
        } finally {

          setSettingLoading(false)
        }
      }
    })
  }

  const oilListColumns = useMemo(() => settingListColumns({handleViewOilDetail, handleDeleteOilNumber, handleAddOil}), [isShowSettingModal])

  return (
    <>
      <Modal
        title="设置"
        width="70vw"
        visible={ isShowSettingModal }
        footer={[
          <Button shape="round" className="btn" key="cancel" type="default" size="default" onClick={ () => setIsShowSettingModal(false) }>取消</Button>
        ]}
        okButtonProps={ false }
        onOk={ null }
        onCancel={ () => setIsShowSettingModal(false) }
        maskClosable={ false }
      >
        <Spin spinning={ settingLoading }>
          <div className={ styles.modalWrap }>
            <div className="flexHCenterVbetween">
              <span>油品信息</span>
              <Button shape="round" loading={ settingLoading } className="btn" key="save" type="primary" size="default" onClick={ () => (setIsShowOilModal(true), setOilEditType('add')) }>新增</Button>
            </div>
            <Table
              className="mt10"
              columns={ oilListColumns }
              dataSource={ oilListData }
              rowKey={ (text, record) => text + record?.id }
              pagination={ false }
            />

            <p className="mt10">二维码设置</p>
            <Row className="mt10">
              <Col span={ 2 } className={ styles.qrTitle }>二维码图片</Col>
              <Col span={ 3 }>
                {
                  (QRcodeData?.id) ? (
                    <>
                      <div className={ styles.imageWrap }>
                        <a target="_blank" title="点击查看大图" rel="noopener noreferrer" href={ stationApi.getImageBaseUrl + QRcodeData.id }>
                          <img alt="二维码加载失败" src={ stationApi.getImageBaseUrl + QRcodeData.id } />
                        </a>
                      </div>

                      <Button shape="round" size="default" type="primary" danger className={ styles.deleteBtn } onClick={ handleDelteQRcode }>删除</Button>
                    </>
                  ):(
                    <div className={ styles.plusInputWrap }>
                      <Input type="file" size="large" accept="image/*" title="请上传二维码图片" className={ styles.uploadInput } onChange={ event => handleUplodImg(event, 'QRCODE', QRcodeData, setQRcodeData) } />
                    </div>
                  )
                }
              </Col>
            </Row>
            <p className={ styles.tipText }>上传二维码图片，大屏订单列表区域外显扫码注册会员</p>
          </div>
        </Spin>
      </Modal>

      {/* 添加油型 */}
      <Modal
        title={ `${oilEditType === 'add' ? '新增油品' : '油品信息'}` }
        width="35vw"
        visible={ isShowOilModal }
        footer={[
          <Button shape="round" className="btn" key="cancel" type="default" size="default" onClick={ () => (setIsShowOilModal(false), oilForm.resetFields()) }>取消</Button>,
          <Button shape="round" loading={ settingLoading } form="oilForm" htmlType="submit" className="btn" key="save" type="primary" size="default">确定</Button>
        ]}
        okButtonProps={ false }
        onOk={ null }
        onCancel={ () => (setIsShowOilModal(false), oilForm.resetFields()) }
        maskClosable={ false }
      >
        <Spin spinning={ oilLoading }>
          <Form id="oilForm" form={ oilForm } { ...formItemLayout } onFinish={ handleSaveOil }>

            <Form.Item label="油型" name="oilNumber" rules={[{required: true, message: '请输入油型'}]}>
              <Input maxLength={ 32 } disabled={ oilEditType === 'edit' } type="number" addonAfter="#" size="large" placeholder="请输入油型" />
            </Form.Item>

            <Form.Item label="油枪" name="gunNumber" rules={[{required: true, message: '请输入油枪'}]}>
              <Input size="large" placeholder="格式为：0,1,12" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  )

}