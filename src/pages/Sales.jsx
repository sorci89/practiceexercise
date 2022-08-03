import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import { todoApi } from '../api/todoApi'
import Table from '../components/Table'
import {FiSearch, FiBell} from 'react-icons/fi'

const Sales = () => {
  const [invoices, setInvoices] = useState([])
  // add the option to set the sort order and field based on the query params
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortField, setSortField] = useState(searchParams.get('sort_by') || '');
  const [order, setOrder] = useState(searchParams.get('order') || 'asc');

  const { get } = todoApi()

  const getData = async() => {
    const response = await get()
    setInvoices(response.data)
  }

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    
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
    <div className='salesContainer'>
      <div className='topHeader'>
        <div className='searchContainer'>
        <FiSearch />
        <input type="text" placeholder='Search'/>
        </div>
        <div className='frame3'>
          <div className='iconBell'>
            <FiBell />
            <div className='ellipse'></div>
          </div>
          <div className='profileAvatar'></div>
        </div> 
        {/* <div className='searchBar'>
        </div> */}
      </div>
      <div className='salesInformationText'>Sales information</div>
      <div className='frame5'>
        <div className='customerSearch'>
          <label htmlFor="customer">Customer</label>
          <input type="text" name='customer' placeholder='Enter Customer Name'/>
        </div>
        <div className='invoiceSearch'>
          <label htmlFor="invoice">Invoice ID</label>
          <input type="text" name='invoice' placeholder='Enter Invoice ID'/>
        </div>
        <div className='startDateSearch'>
          <label htmlFor="startDate">Start Date</label>
          <input type="text" name='startDate' placeholder='Start Date'/>
        </div>
        <div className='endDateSearch'>
          <label htmlFor="endDate">End Date</label>
          <input type="text" name='endDate' placeholder='End Date'/>
        </div>
      </div>
      
        <Table invoices={sortedInvoices()} handleSortingChange={handleSortingChange}/>

    </div>
  )
}

export default Sales