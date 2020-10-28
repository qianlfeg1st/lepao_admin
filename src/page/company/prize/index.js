import React, { useState, useEffect } from 'react'
import { Radio, Image, Empty, Spin, Modal, Pagination } from 'antd'
import styles from './index.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { company } from '@/api'

function Prize () {

  const [current, setCurrent] = useState('getUnusedList')
  const [currentShelf, setCurrentShelf] = useState('')
  const [shelf, setShelf] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [flag, setFlag] = useState(false)

  useEffect(() => {

    getShelf()
  }, [])

  useEffect(() => {

    if (currentShelf.length) getGoodsList()
  }, [current, currentShelf, flag])

  const selectGoods = ({ used, companyGoodsId }) => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: `确定${ used ? '移除' : '选中' }商品吗？`,
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          const { state } = await company.selectGoods({
            used: !used,
            companyGoodsId,
          })

          if (!state) return

          getGoodsList()

          message.success('操作成功')
        } catch (error) {

          console.error('~~error~~', error)
        }
      }
    })
  }

  const getShelf = async () => {

    try {

      const { state, data } = await company.getShelf()

      if (!state) return

      const shelfId = data.list[0].shelfId

      setShelf(data.list)
      setCurrentShelf(shelfId)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const getGoodsList = async ()  => {

    try {

      setLoading(true)

      const { state, data } = await company[current]({
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

  const radioChange = e => {

    setPage(1)
    setCurrentShelf(e.target.value)
  }

  const currentChange = e => {

    setPage(1)
    setCurrent(e.target.value)
  }

  return (
    <div className={ styles.page }>

      <Radio.Group value={ current } buttonStyle="solid" size="large" className={ styles.radio } onChange={ currentChange }>
        <Radio.Button value="getUnusedList">可选奖品</Radio.Button>
        <Radio.Button value="getUsedList">已选奖品清单</Radio.Button>
      </Radio.Group>

      <Radio.Group value={ currentShelf } buttonStyle="solid" size="large" className={ styles.radio } onChange={ radioChange }>
        {
          shelf.map(item => <Radio.Button key={ item.shelfId } value={ item.shelfId }>{ item.title }</Radio.Button>)
        }
      </Radio.Group>

      <Spin spinning={ loading }>
        {
          goods.length
            ?
            goods.map(({ thumb, name, shelfName, price, companyPrice, used, companyGoodsId }) => {

              return (
                <div className={ styles.goods } key={ companyGoodsId }>
                  <div className={ `${styles.goods__left} center` }>
                    <Image className={ styles.goods__img } width={ 186 } height={ 186 } src={ thumb } />
                  </div>
                  <div className={ styles.goods__center }>
                    <p className={ styles.goods__name }>{ name }</p>
                    <p className={ styles.goods__label }>{ shelfName }</p>
                    <div>
                      <p className={ styles.goods__label2 }>标准价 ¥{ price }</p>
                      <p className={ styles.goods__label3 }>采购价 ¥{ companyPrice } </p>
                    </div>
                  </div>
                  <div className={ `${styles.goods__right} center` }>
                    <span className={ `${styles.goods__btn} center` } onClick={ () => selectGoods({ companyGoodsId, used }) }>{ used ? '已选' : '未选' }</span>
                  </div>
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

    </div>
  )
}

export default Prize
