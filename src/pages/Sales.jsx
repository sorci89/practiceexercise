import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { todoApi } from '../api/todoApi'
import Table from '../components/table/Table'
import styles from '../pages/sales.module.css';
import {FiSearch, FiBell} from 'react-icons/fi'

const Sales = () => {
  const [invoices, setInvoices] = useState([])
  // add the option to set the sort order and field based on the query params
  const [searchParams, setSearchParams] = useSearchParams();

  // now we don't need a state anymore, we could use the browser url as a sort of state
  const sortField = searchParams.get('sort_by') || ''
  const order = searchParams.get('order') || 'asc'

  const { get } = todoApi()

  const getData = async() => {
    const response = await get()
    setInvoices(response.data)
  }

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    
    setSearchParams({
      // we can use shorthand here
      // https://ui.dev/shorthand-properties
      order: sortOrder,
      sort_by: accessor,
    })
  };

  useEffect(() => {
    getData()
  }, [])

  const sortedInvoices = () => {
    if (sortField === "date" || sortField === "payable_amount") {
      return [...invoices].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (order === "asc" ? 1 : -1)
        );
      });
    }
    return invoices;
  }

  return (
    <div className={styles.salesContainer}>
      <div className={styles.topHeader}>
        <div className={styles.GlobalSearchFieldContainer}>
        <FiSearch />
        <input type="text" placeholder='Search'/>
        </div>
        <div className={styles.iconProfileContainer}>
          <div className={styles.iconBell}>
            <FiBell />
            <div className={styles.ellipse}></div>
          </div>
          <div className={styles.profileAvatar}></div>
        </div> 
        {/* <div className='searchBar'>
        </div> */}
      </div>
      <div className={styles.salesInformationText}>Sales information</div>
      <div className={styles.salesSearchFields}>
        <div className={styles.customerSearch}>
          <label htmlFor="customer">Customer</label>
          <input type="text" name='customer' placeholder='Enter Customer Name'/>
        </div>
        <div className={styles.invoiceSearch}>
          <label htmlFor="invoice">Invoice ID</label>
          <input type="text" name='invoice' placeholder='Enter Invoice ID'/>
        </div>
        <div className={styles.startDateSearch}>
          <label htmlFor="startDate">Start Date</label>
          <input type="text" name='startDate' placeholder='Start Date'/>
        </div>
        <div className={styles.endDateSearch}>
          <label htmlFor="endDate">End Date</label>
          <input type="text" name='endDate' placeholder='End Date'/>
        </div>
      </div>
      
        <Table invoices={sortedInvoices()} handleSortingChange={handleSortingChange}/>

    </div>
  )
}

export default Sales