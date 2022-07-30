import React, { useEffect, useState } from 'react'
import { todoApi } from '../api/todoApi'

const Sales = () => {
  const [invoices, setInvoices] = useState([])

  const { get } = todoApi()

  const getData = async() => {
    const response = await get()
    console.log(response.data)
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
        <table>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Payable Amount</th>
            <th>Paid Amount</th>
            <th>Due</th>
          </tr>
          {invoices.map(data => <tr><td>{data.id}</td><td>{data.date}</td><td>{data.customer}</td><td>{data.payable_amount}</td><td>{data.paid_amount}</td><td>{data.payable_amount - data.paid_amount}</td></tr>)}
        </table>

    </div>
  )
}

export default Sales