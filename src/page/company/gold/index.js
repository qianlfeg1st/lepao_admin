import React, { useState, useEffect } from 'react'
import { Button, Modal, Steps, InputNumber, DatePicker } from 'antd'
import styles from './index.module.scss'

function Gold () {

  return (
    <div className={ styles.page }>

      <div className={ styles.nav }>
        <DatePicker picker="month" size="large" style={{ margin: '0 14px' }} />
        <div className={ `${styles.nav__btn} center` }>查找</div>
      </div>

      <div className={ styles.gold }>
        <div className={ styles.gold__item }>
          <span className={ styles.gold__title }>本月发放积分</span>
          <span className={ styles.gold__num }>552586</span>
        </div>
        <div className={ styles.gold__item }>
          <span className={ styles.gold__title }>本月兑换积分</span>
          <span className={ styles.gold__num }>552586</span>
        </div>
        <div className={ styles.gold__item }>
          <span className={ styles.gold__title }>员工未兑换积分</span>
          <span className={ styles.gold__num }>552586</span>
        </div>
        <div className={ styles.gold__item }>
          <span className={ styles.gold__title }>均未兑换积分</span>
          <span className={ styles.gold__num }>552586</span>
        </div>
      </div>

      <div className={ styles.main }>

        <div className={ styles.main__title }>积分管理</div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>步数 ：积分（兑换比设置）</div>
          <div className={ styles.main__right }>
            <InputNumber size="large" className={ styles.main__input } />
            <span className={ styles.main__label1 }>兑换</span>
            <InputNumber size="large" className={ styles.main__input } />
          </div>
        </div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>员工单日获得积分数上限</div>
          <div className={ styles.main__right }>
            <InputNumber size="large" className={ styles.main__input } />
          </div>
        </div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>达人榜积分奖励（第三/第二/第一）</div>
          <div className={ styles.main__right }>
            <InputNumber size="large" className={ styles.main__input } />
            <InputNumber size="large" className={ styles.main__input } style={{ margin: '0 20px' }} />
            <InputNumber size="large" className={ styles.main__input } />
          </div>
        </div>

        <div className={ styles.main__wrap }>
          <div className={ styles.main__left }>邀请员工积分奖励</div>
          <div className={ styles.main__right }>
            <InputNumber size="large" className={ styles.main__input } />
          </div>
        </div>

        <div className={ `${styles.main__btn} center` }>保存</div>

      </div>

    </div>
  )
}

export default Gold
