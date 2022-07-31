import React from 'react'
import {FiSettings} from "react-icons/fi"
import {BiWallet, BiEnvelope, BiHelpCircle} from "react-icons/bi"
import {AiOutlineMedicineBox} from 'react-icons/ai'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {BsClipboardCheck} from 'react-icons/bs'

const Sidebar = () => {
  return (
    <div className='sideBar'>
        <div className='active'></div>
        <div className='logo'>Sales.</div>
        <div className='sideBarContainer'>
          <div className='dashBoardIcon1'></div>
          <div className='dashBoardIcon2'></div>
          <div className='dashBoardIcon3'></div>
          <div className='dashBoardIcon4'></div>
          <div className='dashBoardText'>Dashboard</div>
          <BsClipboardCheck className='labTestIcon' />
          <div className='labTestText'>Lab Test</div>
          <FaRegCalendarAlt className='appointmentIcon' />
          <div className='appointmentText'>Appointment</div>
          <AiOutlineMedicineBox className='medicineIcon'/>
          <div className='medicineOrderText'>Medicine Order</div>
          <BiEnvelope className='messageIcon'/>
          <div className='messageText'>Message</div>
          <BiWallet className='paymentIcon'/>
          <div className='paymentText'>Payment</div>
          <FiSettings className='settingIcon' />
          <div className='settingsText'>Settings</div>
          <BiHelpCircle className='helpIcon'/>
          <div className='helpText'>Help</div>
        </div>
    </div>
  )
}

export default Sidebar