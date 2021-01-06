import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal, Form, Image, InputNumber, DatePicker, Input, message, Col, Row, Pagination, Breadcrumb } from 'antd'
import { bill } from '@/api'
import styles from './index.module.scss'
import moment from 'moment'
import { AdminContext } from '@/components/Admin'
import urlParams from '@/utils/urlParams'

function BillDetail () {

  const { push } = useHistory()
  const { billId } = useParams()

  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [flag, setFlag] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [companyName, setCompanyName] = useState('')
  const [type, setType] = useState('')
  const [companyId, setCompanyId] = useState('')

  const { height } = useContext(AdminContext)

  useEffect(() => {

    const url = urlParams(location.hash)

    setCompanyName(url.name)
    setCompanyId(url.companyId)
    setType(url.type)
  }, [])

  useEffect(() => {

    load()
  }, [flag])

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await bill.getBillDetail({
        billId,
      })

      if (!state) return

      setListData(data.items)
      setTotal(+data.pageable.resultCount)
      setSize(+data.pageable.resultSize)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  return (
    <>

      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to="/bill">公司列表（企业账单）</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ `/bill/${companyId}?name=${companyName}` }>企业账单</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>账单{ type === 'detail' ? '详情' : '结算' }</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="pagebar">

      </Row>

    </>
  )
}

export default BillDetail
