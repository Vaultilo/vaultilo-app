import React, { useState } from "react";
import "./extension.css";
import { Link } from 'react-router-dom';

export default function ExPwShow(props) {
  const passwords =
    props.passwords === null ? [] : JSON.parse(props.passwords);
  console.log(passwords)
  return (
      <div className="container">
      <div classname="ui segment">
          <div className="row">
                <div > <Link to="/extension/view">
                    <span className="nav-back"><i className="fa fa-angle-left"></i></span>

                    <span>Vaultilo</span>
                </Link></div>


          </div>


    <div className="ui list">
        {passwords.map(passwords =>{
            const {domainName,password,domainAddress,domainUsername}=passwords
            return(
                <div class="item"  >
                    <img class="ui tiny image" src="https://image.freepik.com/free-vector/triangle-letter-ag-free-logo-design_8035-1.jpg" />
                    <div class="content">
                     <a class='header'>{domainName}</a>
                        <div class="description">{domainUsername}</div>

                </div>
                <div class="ui fitted divider"></div>
                </div>
            )
        })}
        
        
    </div>
    </div>
      </div>
  );
}

