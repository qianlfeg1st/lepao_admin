import React, { useState, useEffect } from 'react'
// import { Table, Button, Modal, Spin, Form, Input } from 'antd'
import styles from './index.module.scss'

function Index () {

  return (
    <div className={ styles.page }>

      <section className={ styles.banner } />

      <section className={ styles.main }>
        <div className={ styles.main__item }>
          <div className={ styles.main__wrap }>
            <h2 className={ styles.main__title }>步数达人榜 TOP100</h2>
            <div className={ styles.main__srcoll }>

              <div className={ styles.main__row }>
                <div className={ `${styles.main__left} center` }>1</div>
                <div className={ styles.main__center }>
                  <img className={ styles.main__face } src={ require(`../../../assets/images/logo.png`) } />
                  <p className={ styles.main__name }>蹦跶巴拉蹦跶巴拉</p>
                </div>
                <div className={ `${styles.main__right} center` }>20094步</div>
              </div>

            </div>
          </div>
          <div className={ styles.main__wrap }>
            <h2 className={ styles.main__title }>部门团队榜 TOP20</h2>
            <div className={ styles.main__srcoll }>

              <div className={ styles.main__row }>
                <div className={ `${styles.main__left} center` }>1</div>
                <div className={ styles.main__box }>
                  <div className={ styles.main__name }>华东华数一部</div>
                  <div className={ styles.main__users }>
                    <img className={ styles.main__user } src={ require(`../../../assets/images/logo.png`) } />
                    <img className={ styles.main__user } src={ require(`../../../assets/images/logo.png`) } />
                    <img className={ styles.main__user } src={ require(`../../../assets/images/logo.png`) } />
                  </div>
                </div>
                <div className={ `${styles.main__right} center` }>20094步</div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Index
