import React, { useState, useEffect } from 'react'
import { Radio, Image, Modal, Button } from 'antd'
import styles from './index.module.scss'

function Goods () {

  const [modal, setModal] = useState(false)

  const handleCancel = () => {

    setModal(false)
  }

  return (
    <div className={ styles.page }>

      <Radio.Group defaultValue="a" buttonStyle="solid" size="large" className={ styles.radio }>
        <Radio.Button value="a">全部</Radio.Button>
        <Radio.Button value="b">儿童玩具</Radio.Button>
        <Radio.Button value="c">儿童玩具</Radio.Button>
        <Radio.Button value="d">儿童玩具</Radio.Button>
      </Radio.Group>

      <div className={ styles.goods }>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` }>编辑</div>
        </div>

        <div className={ styles.goods__wrap }>
          <Image className={ styles.goods__img } width={ 220 } height={ 220 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
          <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮伊岛除湿机家用抽湿机静音静音卧室空气吸湿器除潮</div>
          <div className={ styles.goods__box }>
            <p className={ `${styles.goods__label1} center` }>所需积分 23434</p>
            <p className={ `${styles.goods__label2} center` }>剩余数量  3</p>
          </div>
          <div className={ `${styles.goods__btn} center` } onClick={ () => setModal(true) }>编辑</div>
        </div>

      </div>


    </div>
  )
}

export default Goods
