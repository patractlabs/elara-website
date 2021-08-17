import { FC, useState, useEffect } from 'react'
import { Select } from 'antd'
import More from './images/more.svg'

import './index.css'

const Pagination: FC<{
  total: number
  onChange: (page: number, pageSize: number) => void
  //   onShowSizeChange: (current: number, size: number) => void
  defaultCurrent?: number
  defaultPagesize?: number
}> = (props) => {
  const { total, defaultCurrent = 1, defaultPagesize = 10, onChange } = props
  const [currentPage, setCurrentPage] = useState(defaultCurrent)
  const [pageSize, setPageSize] = useState(defaultPagesize)
  let firstPageNum = 1
  let lastPageNum = Math.ceil(total / pageSize)

  useEffect(() => {
    lastPageNum = Math.ceil(total / pageSize)
  }, [pageSize, total])

  const onSetCurrentPage = (i: number) => {
    setCurrentPage(i)
    onChange(i, pageSize)
  }

    const renderPageIndicator = () => {
    let start = firstPageNum
    let end = lastPageNum
    if (currentPage - 2 >= firstPageNum) {
        start = currentPage - 2
        }
        end = start + 4
        
    if (end > lastPageNum) {
        end = lastPageNum
    }
    
    console.log('start:', start, 'end:' , end);
        
    let list = []
    for (let i = start; i <= end; i++) {
      list.push(i)
    }

    return (
      <>
        {currentPage - 2 > firstPageNum && (
          <span
            className="page-item"
            onClick={() => onSetCurrentPage(firstPageNum)}
          >
            {firstPageNum}
          </span>
        )}
        {currentPage - 3 > firstPageNum && (
          <span className="page-item ellipsis">...</span>
        )}
        {list.map((i) => (
          <span
            key={i}
            onClick={() => {
              onSetCurrentPage(i)
            }}
            className={`page-item ${currentPage === i && 'page-active'}`}
          >
            {i}
          </span>
        ))}
        {end + 1 < lastPageNum && <span className="page-item ellipsis">...</span>}
        {end < lastPageNum && (
          <span
            className="page-item"
            onClick={() => onSetCurrentPage(lastPageNum)}
          >
            {lastPageNum}
          </span>
        )}
      </>
    )
  }
  return (
    <div className="elara-pagination">
      <div className="page-size">
        <span>show</span>
        <Select
          className="pagination-select"
          defaultValue={pageSize}
          onChange={(val) => {
              setPageSize(val)
              const maxPage = Math.ceil(total / val)
              if (maxPage < currentPage) {
                  setCurrentPage(maxPage)
                  onChange(maxPage, val)
              } else {
                  onChange(currentPage,val)
              }
              
          }}
          suffixIcon={<img src={More} alt="more" />}
        >
          {[10, 20, 50, 100].map((num) => (
            <Select.Option value={num} key={num}>
              {num}
            </Select.Option>
          ))}
        </Select>
        <span>Records (Total {total})</span>
      </div>
      <div className="page-indicator">
        <span
          onClick={() => {
            if (currentPage === firstPageNum) {
              return
            }
            onSetCurrentPage(currentPage - 1 > 1 ? currentPage - 1 : 1)
          }}
          className={`prev page-item ${
            currentPage === firstPageNum && 'disabled'
          }`}
        ></span>
        {renderPageIndicator()}
        <span
          onClick={() => {
            setCurrentPage(
              currentPage + 1 < lastPageNum ? currentPage + 1 : lastPageNum
            )
            if (currentPage === lastPageNum) {
              return
            }
          }}
          className={`next page-item ${
            currentPage === lastPageNum && 'disabled'
          }`}
        ></span>
      </div>
    </div>
  )
}

export default Pagination
