import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { todoApi } from '../api/todoApi'
import Table from '../components/table/Table'
import styles from '../pages/sales.module.css';
import {FiSearch, FiBell} from 'react-icons/fi'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'

const Sales = () => {
  const [invoices, setInvoices] = useState([])
  // add the option to set the sort order and field based on the query params
  const [searchParams, setSearchParams] = useSearchParams();
  const [customerName, setCustomerName] = useState("")
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [invoiceId, setInvoiceId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // now we don't need a state anymore, we could use the browser url as a sort of state
  const sortField = searchParams.get('sort_by') || ''
  const order = searchParams.get('order') || 'asc'

  const { get } = todoApi()

  const getData = async() => {
    const response = await get()

    setInvoices(response.data)
    setFilteredInvoices(response.data)
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

  const searchCustomer = (name)=> {
    setCustomerName(name);
    setFilteredInvoices(invoices.filter(({ customer }) => customer.toLowerCase().includes(name.toLowerCase())))
  }

  const searchId = (invoiceId)=> {
    setInvoiceId(invoiceId)
    setFilteredInvoices(invoices.filter(({id}) => invoiceId.length === 0 || id === invoiceId))
  
      // let filteredId = [];
      
      // if (invoiceId.length === 0) {
      //   setFilteredInvoices(invoices)
      //   return
      // }
      // for (const invoice of invoices) {
      //   if (invoice.id === invoiceId) {
      //     filteredId.push(invoice)
      //   }
      // }  

      // setFilteredInvoices(filteredId)
  }

  
  const sortedInvoices = () => {
    if (sortField === "date" || sortField === "payable_amount") {
      return [...filteredInvoices].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (order === "asc" ? 1 : -1)
        );
      });
    }
    return filteredInvoices;
  }
  
 
  const searchDates = (startDate, endDate) => {
    setStartDate(startDate)
    setEndDate(endDate);
   
    // const startDateTs = new Date(startDate).setHours(0, 0, 0, 0);
    // const endDateTs = new Date(endDate).setHours(23, 59, 59, 999)
    const startDateTs = startOfDay(new Date(startDate));
    const endDateTs = endOfDay(new Date(endDate))

    let filteredDates = invoices.filter(({date}) => startDate && endDate ? ((new Date(date) >= startDateTs) && (endDateTs > new Date(date))) : startDate && !endDate? (new Date(date) >= startDateTs) : (endDateTs > new Date(date)))
    setFilteredInvoices(filteredDates);
  }
  
  useEffect(() => {
    getData()
     // eslint-disable-next-line
  }, [])

  
  // useEffect(() => {
  //   searchCustomer()
  //   setInvoiceId("")
  //   setStartDate("")
  //   setEndDate("")
  //    // eslint-disable-next-line
  // }, [customerName])
  
  // useEffect(() => {
  //   searchId()
  //   setCustomerName("")
  //   setStartDate("")
  //   setEndDate("")
  //    // eslint-disable-next-line
  // }, [invoiceId])
  
  // useEffect(() => {
  //   searchCustomer()
  //   setInvoiceId("")
  //   searchDates(startDate, endDate)
  //    // eslint-disable-next-line
  // }, [startDate, endDate])


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
          <input type="text" name='customer' placeholder='Enter Customer Name' value={customerName} onChange={(event)=> searchCustomer(event.target.value)} />
        </div>
        <div className={styles.invoiceSearch}>
          <label htmlFor="invoice">Invoice ID</label>
          <input type="text" name='invoice' placeholder='Enter Invoice ID' value={invoiceId} onChange={(event)=> searchId(event.target.value)}/>
        </div>
        <div className={styles.startDateSearch}>
          <label htmlFor="startDate">Start Date</label>
          <input type="date" name='startDate' placeholder='Start Date' value={startDate} onChange={(event)=> searchDates(event.target.value, endDate)} max={endDate ? new Date(endDate).toISOString().split("T")[0]: ""}/>
        </div>
        <div className={styles.endDateSearch}>
          <label htmlFor="endDate">End Date</label>
          <input type="date" name='endDate' placeholder='End Date'value={endDate} onChange={(event)=> searchDates(startDate, event.target.value)} min={startDate ? new Date(startDate).toISOString().split("T")[0]: ""}/>
        </div>
      </div>
      
        <Table invoices={sortedInvoices()} handleSortingChange={handleSortingChange}/>

    </div>
  )
}

export default Sales