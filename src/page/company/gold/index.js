import React, { useState, useEffect } from 'react'
import { InputNumber, DatePicker, Spin, message, Modal } from 'antd'
import styles from './index.module.scss'
import { company } from '@/api'
import cloneDeep from 'lodash.clonedeep'
import formatMonth from '@/utils/formatMonth'
import moment from 'moment'

function Gold () {

  const [gold, setGold] = useState({})
  const [yearMonth, setYearMonth] = useState(formatMonth(+new Date()))
  const [goldLoading, setGoldLoading] = useState(true)
  const [settingLoading, setSettingLoading] = useState(false)
  const [setting, setSetting] = useState({
    "convertRate": {
      "gold": 0,
      "step": 0
    },
    "dayGoldLimit": 0,
    "inviteReward": 0,
    "rankingAwardGold": [
      1000,
      500,
      100,
    ]
  })

  useEffect(() => {

    getGoldInfo()
    getGoldSetting()
  }, [])

  const getGoldInfo = async () => {

    try {

      setGoldLoading(true)

      const { state, data } = await company.getGoldInfo({
        yearMonth,
      })

      if (!state) return

      setGold(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setGoldLoading(false)
    }
  }

  const getGoldSetting = async () => {

    try {

      setSettingLoading(true)

      const { state, data } = await company.getGoldSetting()

      if (!state) return
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setSettingLoading(false)
    }
  }

  const editGoldSetting = async () => {

    try {

      setSettingLoading(true)

      const { state } = await company.editGoldSetting({
        ...setting,
      })

      if (!state) return

      getGoldSetting()

      message.success('修改成功')
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setSettingLoading(false)
    }
  }

  const submit = () => {

    console.log('~submit~', setting)

    Modal.confirm({
      title: '提示',
      content: '确定修改吗？',
      centered: true,
      onOk: () => {

        editGoldSetting()
      }
    })
  }

  const stepChange = step => {

    setSetting({
      ...setting,
      convertRate: {
        ...setting.convertRate,
        step,
      }
    })
  }

  const goldChange = gold => {

    setSetting({
      ...setting,
      convertRate: {
        ...setting.convertRate,
        gold,
      }
    })
  }

  const dayGoldLimitChange = dayGoldLimit => {

    setSetting({
      ...setting,
      dayGoldLimit,
    })
  }

  const inviteRewardChange = inviteReward => {

    setSetting({
      ...setting,
      inviteReward,
    })
  }

  const rankingAwardGoldChange = (e, index) => {

    const clone = cloneDeep(setting)

    clone.rankingAwardGold[index] = e

    setSetting(clone)
  }

  const monthChange = e => {

    setYearMonth(formatMonth(e._d))
  }

  return (
    <div className={ styles.page }>

      <div className={ styles.nav }>
        <DatePicker picker="month" size="large" onChange={ monthChange } value={ moment(new Date(yearMonth)) } style={{ margin: '0 14px' }} />
        <div className={ `${styles.nav__btn} center` } onClick={ getGoldInfo }>查找</div>
      </div>

      <Spin spinning={ goldLoading }>
        <div className={ styles.gold }>
          <div className={ styles.gold__item }>
            <span className={ styles.gold__title }>本月发放积分</span>
            <span className={ styles.gold__num }>{ gold.provideGold }</span>
          </div>
          <div className={ styles.gold__item }>
            <span className={ styles.gold__title }>本月兑换积分</span>
            <span className={ styles.gold__num }>{ gold.convertGold } </span>
          </div>
          <div className={ styles.gold__item }>
            <span className={ styles.gold__title }>员工未兑换积分</span>
            <span className={ styles.gold__num }>{ gold.empAvgUnConvertGold }</span>
          </div>
          <div className={ styles.gold__item }>
            <span className={ styles.gold__title }>均未兑换积分</span>
            <span className={ styles.gold__num }>{ gold.empUnConvertGold }</span>
          </div>
        </div>
      </Spin>

      <div className={ styles.main }>

        <div className={ styles.main__title }>积分管理</div>

        <Spin spinning={ settingLoading }>
          <div className={ styles.main__wrap }>
            <div className={ styles.main__left }>步数 ：积分（兑换比设置）</div>
            <div className={ styles.main__right }>
              <InputNumber value={ setting.convertRate.step } onChange={ stepChange } size="large" className={ styles.main__input } />
              <span className={ styles.main__label1 }>兑换</span>
              <InputNumber value={ setting.convertRate.gold } onChange={ goldChange } size="large" className={ styles.main__input } />
            </div>
          </div>

          <div className={ styles.main__wrap }>
            <div className={ styles.main__left }>员工单日获得积分数上限</div>
            <div className={ styles.main__right }>
              <InputNumber value={ setting.dayGoldLimit } onChange={ dayGoldLimitChange } size="large" className={ styles.main__input } />
            </div>
          </div>

          <div className={ styles.main__wrap }>
            <div className={ styles.main__left }>达人榜积分奖励（第三/第二/第一）</div>
            <div className={ styles.main__right }>
              <InputNumber value={ setting.rankingAwardGold[0] } onChange={ e => rankingAwardGoldChange(e, 0) } size="large" className={ styles.main__input } />
              <InputNumber value={ setting.rankingAwardGold[1] } onChange={ e => rankingAwardGoldChange(e, 1) } size="large" className={ styles.main__input } style={{ margin: '0 20px' }} />
              <InputNumber value={ setting.rankingAwardGold[2] } onChange={ e => rankingAwardGoldChange(e, 2) } size="large" className={ styles.main__input } />
            </div>
          </div>

          <div className={ styles.main__wrap }>
            <div className={ styles.main__left }>邀请员工积分奖励</div>
            <div className={ styles.main__right }>
              <InputNumber value={ setting.inviteReward } onChange={ inviteRewardChange } size="large" className={ styles.main__input } />
            </div>
          </div>
        </Spin>

        <div className={ `${styles.main__btn} center` } onClick={ submit }>保存</div>

      </div>

    </div>
  )
}

export default Gold
