import React from 'react'

const Sales = () => {
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

    </div>
  )
}

export default Sales