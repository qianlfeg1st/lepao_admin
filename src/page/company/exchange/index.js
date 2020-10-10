import React, { useState, useEffect } from 'react'
import { Radio, Image, Modal, Button, DatePicker, Input } from 'antd'
import styles from './index.module.scss'

function Goods () {

  return (
    <div className={ styles.page }>

      <section className={ styles.goods }>

        <section className={ styles.nav }>
          <div className={ styles.nav__title }>员工兑换订单</div>
          <DatePicker picker="month" size="large" style={{ margin: '0 14px' }} />
          <Input placeholder="请输入姓名" size="large" style={{ width: '140px' }} />
          <div className={ `${styles.nav__btn} center` }>查找</div>
          <div className={ `${styles.nav__export} center` }>导出EXCEL</div>
        </section>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ `${styles.goods__right} ${styles.goods__center}` }>
            <div className={ styles.goods__box }>
              <div className={ styles.goods__status }>已通过</div>
              <div className={ styles.goods__tip }>积分已返还</div>
            </div>
            <div className={ styles.goods__date }>2020-8-30 21:09</div>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ styles.goods__right }>
            <Button type="primary" danger>拒绝</Button>
            <Button type="primary" danger>退回</Button>
            <Button type="primary">通过</Button>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ `${styles.goods__right} ${styles.goods__center}` }>
            <div className={ styles.goods__box }>
              <div className={ styles.goods__status }>已通过</div>
              <div className={ styles.goods__tip }>积分已返还</div>
            </div>
            <div className={ styles.goods__date }>2020-8-30 21:09</div>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ styles.goods__right }>
            <Button type="primary" danger>拒绝</Button>
            <Button type="primary" danger>退回</Button>
            <Button type="primary">通过</Button>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ `${styles.goods__right} ${styles.goods__center}` }>
            <div className={ styles.goods__box }>
              <div className={ styles.goods__status }>已通过</div>
              <div className={ styles.goods__tip }>积分已返还</div>
            </div>
            <div className={ styles.goods__date }>2020-8-30 21:09</div>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ styles.goods__right }>
            <Button type="primary" danger>拒绝</Button>
            <Button type="primary" danger>退回</Button>
            <Button type="primary">通过</Button>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ `${styles.goods__right} ${styles.goods__center}` }>
            <div className={ styles.goods__box }>
              <div className={ styles.goods__status }>已通过</div>
              <div className={ styles.goods__tip }>积分已返还</div>
            </div>
            <div className={ styles.goods__date }>2020-8-30 21:09</div>
          </div>
        </div>

        <div className={ styles.goods__wrap }>
          <div className={ styles.goods__left }>
            <Image className={ styles.goods__img } width={ 108 } height={ 108 } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__info }>
              <div className={ styles.goods__name }>伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15伊岛除湿机家用抽湿机静音卧室除潮地下室小型干燥D15</div>
              <div className={ `${styles.goods__label} center` }>
                <div className={ styles.goods__label1 }>采购价</div>
                <div className={ styles.goods__label2 }>12333</div>
              </div>
            </div>
          </div>
          <div className={ styles.goods__center }>
            <img className={ styles.goods__logo } src="http://file.jianchedashi.com/ViolationPlate/89727C732A477E9CCA131BF11949DF74.jpg" />
            <div className={ styles.goods__data }>
              <div className={ styles.department }>张春华 / 部门B</div>
              <div className={ styles.phone }>13749503950</div>
            </div>
          </div>
          <div className={ styles.goods__right }>
            <Button type="primary" danger>拒绝</Button>
            <Button type="primary" danger>退回</Button>
            <Button type="primary">通过</Button>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Goods
