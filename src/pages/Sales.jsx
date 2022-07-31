import React, { useEffect, useState } from 'react'
import { todoApi } from '../api/todoApi'
import Table from '../components/Table'

const Sales = () => {
  const [invoices, setInvoices] = useState([])

  const { get } = todoApi()

  const getData = async() => {
    const response = await get()
    setInvoices(response.data)
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div>
        <input type="text" />
        <h1>Sales information</h1>
        <label htmlFor="customer"></label>
        <input type="text" name='customer' placeholder='Enter Customer Name'/>
        <label htmlFor="invoice"></label>
        <input type="text" name='invoice' placeholder='Enter Invoice ID'/>
        <label htmlFor="startDate"></label>
        <input type="text" name='startDate' placeholder='Start Date'/>
        <label htmlFor="endDate"></label>
        <input type="text" name='endDate' placeholder='End Date'/>
        <Table invoices={invoices} setInvoices={setInvoices}/>

    </div>
  )
}

export default Sales