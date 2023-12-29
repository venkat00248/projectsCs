import React from 'react'
import './Footer.scss'
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setEntity } from "./../../../redux/actions/actions";
export const Footer = () => {
  const entity = useSelector((state: any) => state.entityReducer.entity);

  const date = new Date().getFullYear()
  const time = new Date().toLocaleTimeString()
  return (
    <div className='Footer'>{date} { entity=== "cloud4c" && <span>Cloud4C</span>}{ entity=== "ctrlS" && <span>ctrlS</span>} All Rights Reserved. V2.0

    IP : 10.10.120.104 ,   Server Time : {time}</div>
  )
}
