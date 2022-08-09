import React from 'react'
import styles from '../sidebar/sidebar.module.css';
import {FiSettings} from "react-icons/fi"
import {BiWallet, BiEnvelope, BiHelpCircle} from "react-icons/bi"
import {AiOutlineMedicineBox} from 'react-icons/ai'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {BsClipboardCheck} from 'react-icons/bs'

const Sidebar = () => {
  return (
    <div className={styles.sideBar}>
        <div className={styles.logo}>Sales.</div>
        <div className={styles.sideBarContainer}>
        <div className={styles.active}></div>
        <div className={styles.dashBoardIconContainer}>
          <div className={styles.dashBoardIcon1}></div>
          <div className={styles.dashBoardIcon2}></div>
          <div className={styles.dashBoardIcon3}></div>
          <div className={styles.dashBoardIcon4}></div>
        </div>
          <div className={styles.dashBoardText}>Dashboard</div>
          <BsClipboardCheck className={styles.labTestIcon} />
          <div className={styles.labTestText}>Lab Test</div>
          <FaRegCalendarAlt className={styles.appointmentIcon} />
          <div className={styles.appointmentText}>Appointment</div>
          <AiOutlineMedicineBox className={styles.medicineIcon}/>
          <div className={styles.medicineOrderText}>Medicine Order</div>
          <BiEnvelope className={styles.messageIcon}/>
          <div className={styles.messageText}>Message</div>
          <BiWallet className={styles.paymentIcon}/>
          <div className={styles.paymentText}>Payment</div>
          <FiSettings className={styles.settingIcon} />
          <div className={styles.settingsText}>Settings</div>
          <BiHelpCircle className={styles.helpIcon}/>
          <div className={styles.helpText}>Help</div>
        </div>
    </div>
  )
}

export default Sidebar