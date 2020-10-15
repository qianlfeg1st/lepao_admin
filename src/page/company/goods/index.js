import React, { useState, useEffect } from 'react'
import { Radio, Image, Modal, Button, Spin, Empty, Pagination } from 'antd'
import styles from './index.module.scss'
import { company } from '@/api'

function Goods () {

  const [modal, setModal] = useState(false)
  const [shelf, setShelf] = useState([])
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentShelf, setCurrentShelf] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [flag, setFlag] = useState(false)

  useEffect(() => {

    getShelf()
  }, [])

  useEffect(() => {

    if (shelf.length) getCurrentGoods()
  }, [currentShelf, flag])

  const getCurrentGoods = async () => {

    try {

      setLoading(true)

      const { state, data } = await company.getCurrentGoods({
        firstResult: (page - 1) * size,
        shelfId: currentShelf,
      })

      if (!state) return

      setGoods(data.items)
      setTotal(+data.pageable.resultCount)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setLoading(false)
    }
  }

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

  const handleCancel = () => {

    setModal(false)
  }

  const radioChange = e => {

    setCurrentShelf(e.target.value)
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
                      <div className={ `${styles.goods__btn} center` } onClick={ () => setModal(true) }>打开小程序兑换</div>
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
        closable={ false }
        visible={ modal }
        onCancel={ handleCancel }
        footer={[
          <Button key="cancel" type="default" size="default" onClick={ handleCancel }>关闭</Button>,
        ]}
        width="380px"
      >
        <div className={ styles.code }>
          <img className={ styles.code__img } src={ require(`../../../assets/images/111.png`) } />
          <p className={ styles.code__tip }>打开微信小程序，兑换奖品</p>
        </div>
      </Modal>

    </div>
  )
}

export default Goods
