import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Table, Button, Select, Modal, Pagination, Row, Col, Image, Breadcrumb } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { prize } from '@/api'
import { AdminContext } from '@/components/Admin'

const { Option } = Select

function Prize () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(20)
  const [shelfList, setShelfList] = useState([])
  const [shelfId, setShelfId] = useState('')
  const [goodsIds, setGoodsIds] = useState([])
  const [flag, setFlag] = useState(false)
  const [companyName, setCompanyName] = useState('')

  const { height } = useContext(AdminContext)

  const listColumns = [
    {
      title: '分类',
      dataIndex: 'shelfTitle',
      width: 100,
    },
    {
      title: '缩略图',
      dataIndex: '',
      width: 50,
      render (e) {

        return <Image width={ 36 } src={ e.thumb } />
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 170,
    },
    {
      title: '商品标价',
      dataIndex: 'priceLable',
      width: 100,
    },
    {
      title: '采购价',
      dataIndex: 'companyPriceLabel',
      width: 100,
    },
  ]

  useEffect(() => {

    getShelfList()

    setCompanyName(decodeURIComponent(location.hash.split('?')[1].split('=')[1]))
  }, [])

  useEffect(() => {

    if (!shelfId) return

    load()
  }, [flag])

  const getShelfList = async () => {

    try {

      const { state, data } = await prize.getShelfList()

      if (!state) return

      setShelfList(data.list)
      setShelfId(data.list[0].shelfId)
      setFlag(!flag)
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await prize.getPrizeList({
        companyId,
        firstResult: (page - 1) * size,
        shelfId,
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

  const selPrize = async () => {

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定选为奖品吗？',
      okText: '确定',
      cancelText: '取消',
      onCancel: () => {},
      onOk: async () => {

        try {

          const { state } = await prize.selPrize({
            companyId,
            goodsIds,
          })

          if (!state) return

          setFlag(!flag)

          setGoodsIds([])
        } catch (error) {

          console.error('~~error~~', error)
        }
      }
    })
  }

  return (
    <>

      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to="/prize">公司列表（企业奖品）</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ `/prize/${companyId}?name=${companyName}` }>企业奖品</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>挑选奖品</Breadcrumb.Item>
      </Breadcrumb>

      <div className="searchbar">
        <div className="searchbtn">
          <Select size="large" placeholder="请选择分类" value={ shelfId } onChange={ e => {

            setShelfId(e)
            setFlag(!flag)
          } }>
            { shelfList.map(({ shelfId, title }) => <Option key={ shelfId } value={ shelfId }>{ title }</Option>) }
          </Select>
        </div>

        <div className="searchbtn">

        </div>
      </div>

      <Table
        bordered
        className="fixedWidthTable"
        scroll={{ x: 'calc(100vw - 300px)', y: `calc(100vh - ${height}px)` }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: goodsIds,
          onChange: keys => {

            setGoodsIds(keys)
          },
        }}
        rowKey={ e => e.goodsId }
        loading={ listLoading }
        columns={ listColumns }
        dataSource={ listData }
        pagination={ false }
      />

      <Row className="pagebar">
        <Col span={ 18 }>
          <Button type="primary" disabled={ !goodsIds.length } onClick={ selPrize }>选为奖品</Button>
        </Col>
        <Col span={ 6 }>
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
        </Col>
      </Row>

    </>
  )
}

export default Prize
