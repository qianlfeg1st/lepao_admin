import React, { useState, useEffect } from 'react'
import { Image, Modal, Button, DatePicker, Input, Spin, Empty, Pagination } from 'antd'
import styles from './index.module.scss'
import { company } from '@/api'
import moment from 'moment'
import formatMonth from '@/utils/formatMonth'

function Exchange () {

  const [loading, setLoading] = useState(true)
  const [nickName, setNickName] = useState(undefined)
  const [yearMonth, setYearMonth] = useState(undefined)
  const [order, setOrder] = useState([])
  const [flag, setFlag] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)

  useEffect(() => {

    getExchangeList()
  }, [flag])

  const getExchangeList = async () => {

    try {

      setLoading(true)

      const { state, data } = await company.getExchangeList({
        firstResult: 0,
        nickName,
        yearMonth,
      })

      if (!state) return

      setOrder(data.items)
      setTotal(+data.pageable.resultCount)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

  const settingCompanyorder = ({ orderId, type }) => {

    Modal.confirm({
      title: '提示',
      content: '确认操作吗？',
      centered: true,
      onOk: async () => {

        try {

          const { state } = await company.settingCompanyorder({
            orderId,
            state: type,
          })

          if (!state) return

          message.success('操作成功')

          setFlag(!flag)
        } catch (error) {

          console.error('~~error~~', error)
        }
      }
    })
  }

  const monthChange = e => {

    if (!e) return

    setYearMonth(formatMonth(e._d))
  }

  return (
    <div className={ styles.page }>

      <section className={ styles.goods }>

        <section className={ styles.nav }>
          <div className={ styles.nav__title }>员工兑换订单</div>
          <DatePicker picker="month" size="large" style={{ margin: '0 14px' }} value={ yearMonth ? moment(new Date(yearMonth)) : '' } onChange={ monthChange } />
          <Input placeholder="请输入姓名" size="large" style={{ width: '140px' }} onChange={ e => setNickName(e.target.value) } />
          <div className={ `${styles.nav__btn} center` } onClick={ () => setFlag(!flag) }>查找</div>
          <div className={ `${styles.nav__export} center` }>导出EXCEL</div>
        </section>

        <Spin spinning={ loading }>
          {
            order.length
              ?
              order.map(({ orderId, thumb, goodsName, companyGoodsPrice, nickName, dept, phoneNumber, stateLabel, createTimeLabel }) => {

                return (
                  <div className={ styles.goods__wrap } key={ orderId }>
                    <div className={ styles.goods__left }>
                      <Image className={ styles.goods__img } width={ 108 } height={ 108 } src={ thumb } />
                      <div className={ styles.goods__info }>
                        <div className={ styles.goods__name }>{ goodsName }</div>
                        <div className={ `${styles.goods__label} center` }>
                          <div className={ styles.goods__label1 }>采购价</div>
                          <div className={ styles.goods__label2 }>{ companyGoodsPrice }</div>
                        </div>
                      </div>
                    </div>
                    <div className={ styles.goods__center }>
                      <img className={ styles.goods__logo } src={ thumb } />
                      <div className={ styles.goods__data }>
                        <div className={ styles.department }>{ nickName } / { dept }</div>
                        <div className={ styles.phone }>{ phoneNumber }</div>
                      </div>
                    </div>
                    {
                      stateLabel
                        ?
                        <div className={ styles.goods__right }>
                          <Button type="primary" danger onClick={ () => settingCompanyorder({ orderId, createTimeLabel }) }>拒绝</Button>
                          <Button type="primary" danger onClick={ () => settingCompanyorder({ orderId, createTimeLabel }) }>退回</Button>
                          <Button type="primary" onClick={ () => settingCompanyorder({ orderId, createTimeLabel }) }>通过</Button>
                        </div>
                        :
                        <div className={ `${styles.goods__right} ${styles.goods__center}` }>
                          <div className={ styles.goods__box }>
                            <div className={ styles.goods__status }>已通过</div>
                            <div className={ styles.goods__tip }>{ stateLabel }</div>
                          </div>
                          <div className={ styles.goods__date }>{ createTimeLabel }</div>
                        </div>
                    }
                  </div>
                )
              })
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

      </section>

    </div>
  )
}

export default Exchange
