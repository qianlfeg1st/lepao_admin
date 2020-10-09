import React, { useState, useEffect } from 'react'
import { Radio, Table, Image } from 'antd'
import styles from './index.module.scss'

function Prize () {

  const columns = [
    {
      dataIndex: 'img',
      width: 100,
      render (e) {

        return <Image width={ 186 } height={ 186 } src={ e } />
      }
    },
    {
      width: 500,
      render (e) {

        // console.log('~~~~', e)
        return (
          <>
            <h1 className={ `` }>伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15</h1>
          </>
        )
      }
    },
    {
      width: 100,
    },
  ]

  const data = [
    {
      id: '1',
      a: '钱立峰',
      b: '15858155190',
      c: '审核通过',
      img: 'http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg'
    },
    {
      id: '2',
      a: '钱立峰',
      b: '15858155190',
      c: '审核通过',
      img: 'http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg'
    },
  ]

  return (
    <div className={ styles.page }>

      <Radio.Group defaultValue="a" buttonStyle="solid" size="large" className={ styles.radio }>
        <Radio.Button value="a">可选奖品</Radio.Button>
        <Radio.Button value="b">已选奖品清单（28）</Radio.Button>
      </Radio.Group>

      <Radio.Group defaultValue="a" buttonStyle="solid" size="large" className={ styles.radio }>
        <Radio.Button value="a">全部</Radio.Button>
        <Radio.Button value="b">儿童玩具</Radio.Button>
        <Radio.Button value="c">儿童玩具</Radio.Button>
        <Radio.Button value="d">儿童玩具</Radio.Button>
      </Radio.Group>

      <div className={ styles.goods }>
        <div className={ `${styles.goods__left} center` }>
          <Image className={ styles.goods__img } width={ 186 } height={ 186 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
        </div>
        <div className={ styles.goods__center }>
          <p className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15</p>
          <p className={ styles.goods__label }>家居生活</p>
          <div>
            <p className={ styles.goods__label2 }>标准价 ¥123</p>
            <p className={ styles.goods__label3 }>采购价 ¥100</p>
          </div>
        </div>
        <div className={ `${styles.goods__right} center` }>
          <span className={ `${styles.goods__btn} center` }>已选</span>
        </div>
      </div>

      <div className={ styles.goods }>
        <div className={ `${styles.goods__left} center` }>
          <Image className={ styles.goods__img } width={ 186 } height={ 186 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
        </div>
        <div className={ styles.goods__center }>
          <p className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15</p>
          <p className={ styles.goods__label }>家居生活</p>
          <div>
            <p className={ styles.goods__label2 }>标准价 ¥123</p>
            <p className={ styles.goods__label3 }>采购价 ¥100</p>
          </div>
        </div>
        <div className={ `${styles.goods__right} center` }>
          <span className={ `${styles.goods__btn} center` }>已选</span>
        </div>
      </div>

      <div className={ styles.goods }>
        <div className={ `${styles.goods__left} center` }>
          <Image className={ styles.goods__img } width={ 186 } height={ 186 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
        </div>
        <div className={ styles.goods__center }>
          <p className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15</p>
          <p className={ styles.goods__label }>家居生活</p>
          <div>
            <p className={ styles.goods__label2 }>标准价 ¥123</p>
            <p className={ styles.goods__label3 }>采购价 ¥100</p>
          </div>
        </div>
        <div className={ `${styles.goods__right} center` }>
          <span className={ `${styles.goods__btn} center` }>已选</span>
        </div>
      </div>

      <div className={ styles.goods }>
        <div className={ `${styles.goods__left} center` }>
          <Image className={ styles.goods__img } width={ 186 } height={ 186 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
        </div>
        <div className={ styles.goods__center }>
          <p className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室空气吸湿器除潮地下室小型干燥D15</p>
          <p className={ styles.goods__label }>家居生活</p>
          <div>
            <p className={ styles.goods__label2 }>标准价 ¥123</p>
            <p className={ styles.goods__label3 }>采购价 ¥100</p>
          </div>
        </div>
        <div className={ `${styles.goods__right} center` }>
          <span className={ `${styles.goods__btn} center` }>未选</span>
        </div>
      </div>

    </div>
  )
}

export default Prize
