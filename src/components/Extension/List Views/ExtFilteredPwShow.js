import React from 'react';
import '../extension.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ExtFilteredPwShow(props) {
  const applyPassword = (url,username,password) =>{
    window.parent.postMessage(
      {
          url: url,
          username: username,
          password: password,
          app:"filtered"

      },
      "*"
  );

  }

 const  renderTooltip=(props) => {
    return <Tooltip {...props}>Click to apply</Tooltip>;
  }
  const passwords = props.passwords;
  const domain = props.domain.match.params.domain;
  const displayList= passwords.filter((item)=>{
      if (item.domainAddress.includes(domain)){
          return item
      }
    
  })
  
  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Vaultilo</div>
      </div>
      <div className="ext-content">
        <div className="title">Available Autofill Passwords</div>
        <div className="content-list">
          {displayList.map(item => {
            const { id, domainName, domainAddress,domainUsername,password } = item;
            return (
              <div className="item d-flex justify-content-start" key={id}>
                <div className="item-img">
                  <i className="icon-password" />
                </div>
                <div className="item-detail">
                  <div className="text">{domainName}</div>
                  <div className="sub-text">{domainAddress}</div>
                </div>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 100, hide: 100 }}
                  overlay={(props)=>renderTooltip(props)}
                >
                  <div className="apply-details">
                    <i
                      className="icon-apply-save"
                      onClick={() => applyPassword(domainAddress, domainUsername, password)}
                    />
                  </div>
                </OverlayTrigger>

                <div className="view-details" >
                  <Link
                    to={{
                      pathname: '/extension/password/view',
                      state: {
                        id: id,
                      },
                    }}
                    style={{ textDecoration: 'none'}}
                  >
                    <i className="icon-eye"/>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
