import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Home extends Component {
  render() {
    return (
    <div>
        <center>
        
        <div className="artboard phone-1 flex justify-center items-center flex-col gap-5">
        <h1 className='text-center font-semibold text-xl italic'>USER AUTHENTICATIONS</h1>
        <NavLink to={"/login"} className="btn btn-primary w-full"> Login </NavLink>
        <NavLink to={"/register"} className="btn btn-primary w-full"> Register </NavLink>
      </div>
        </center>
    </div>
    )
  }
}

export default Home