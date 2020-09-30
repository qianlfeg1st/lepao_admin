import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Transfer } from 'antd'
import { prize } from '@/api'
import { AdminContext } from '@/components/Admin'

function Prize () {

  const { companyId } = useParams()
  const [listLoading, setListLoading] = useState(false)
  const [listData, setListData] = useState([])

  const { height } = useContext(AdminContext)

  const listColumns = [
    {
      title: '企业编号',
      dataIndex: 'companyId',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      width: 200,
    },
    {
      title: '已选商品',
      dataIndex: 'recommendGoodsTotal',
      width: 100,
    },
    {
      title: '推荐的热门商品',
      dataIndex: 'goodsTotal',
      width: 100,
    },
  ]

  useEffect(() => {

    load()
    // getShelfList()
  }, [])

  const getShelfList = async () => {

    try {

      const { state, data } = await prize.getShelfList()

      if (!state) return
    } catch (error) {

      console.error('~~error~~', error)
    }
  }

  const load = async () => {

    try {

      setListLoading(true)

      const { state, data } = await prize.getPrizeList({
        companyId,
        firstResult: 0,
        shelfId: 1,
      })

      if (!state) return

      setListData(data)
    } catch (error) {

      console.error('~~error~~', error)
    } finally {

      setListLoading(false)
    }
  }

  return (
    <>

      <Transfer showSelectAll={false}>
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const columns = direction === 'left' ? leftColumns : rightColumns;

          const rowSelection = {
            getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll (selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter(item => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);
            },
            onSelect ({ key }, selected) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : null }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return;
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
          );
        }}
      </Transfer>

    </>
  )
}

export default Prize
