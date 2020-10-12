import React, { useState, useEffect } from 'react'
import { Empty } from 'antd'
import styles from './index.module.scss'
import { company } from '@/api'

function Index () {

  const [dept, setDept] = useState([])
  const [emp, setEmp] = useState([])

  useEffect(() => {

    getDeptRanking()
    getEmpRanking()
  }, [])

  const getDeptRanking = async () => {

    try {

      const { state, data } = await company.getDeptRanking()

      if (!state) return

      setDept(data)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const getEmpRanking = async () => {

    try {

      const { state, data } = await company.getEmpRanking()

      if (!state) return

      setEmp(data)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  return (
    <div className={ styles.page }>

      <section className={ styles.banner } />

      <section className={ styles.main }>
        <div className={ styles.main__item }>

          <div className={ `${styles.main__wrap} ${styles.main__a}` }>
            <h2 className={ styles.main__title }>步数达人榜 TOP100</h2>
            <div className={ styles.main__srcoll }>
              {
                dept.length
                  ?
                  emp.map(item => {

                    return (
                      <div className={ styles.main__row } key={ item.no }>
                        <div className={ `${styles.main__left} center` }>{ item.no }</div>
                        <div className={ styles.main__center }>
                          <img className={ styles.main__face } src={ item.headicon } />
                          <p className={ styles.main__name }>{ item.nickName }</p>
                        </div>
                        <div className={ `${styles.main__right} center` }>{ item.step }步</div>
                      </div>
                    )
                  })
                  :
                  <Empty />
              }
            </div>
          </div>

          <div className={ `${styles.main__wrap} ${styles.main__b}` }>
            <h2 className={ styles.main__title }>部门团队榜 TOP20</h2>
            <div className={ styles.main__srcoll }>
              {
                dept.length
                  ?
                  dept.map(item => {

                    return (
                      <div className={ styles.main__row } key={ item.deptId }>
                        <div className={ `${styles.main__left} center` }>{ item.no }</div>
                        <div className={ styles.main__box }>
                          <div className={ styles.main__name }>{ item.deptName }</div>
                          <div className={ styles.main__users }>
                            { item.headicons.map((logo, index) => <img key={ index } src={ logo } className={ styles.main__user } />) }
                          </div>
                        </div>
                        <div className={ `${styles.main__right} center` }>{ item.step }步</div>
                      </div>
                    )
                  })
                  :
                  <Empty />
              }
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Index
