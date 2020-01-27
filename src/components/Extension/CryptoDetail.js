import React from "react";
import IconView from "./IconView";
import EthereumView from "./EthereumView"

export default function CryptoDetail(props) {
  const cryptoId = props.location.state.id;
  const credentials = props.credentials;
  const credentialItem = credentials.find( item => item.id === cryptoId);

  const renderCryptoItem = () => {
    if (credentialItem.subType === "icon") {
      return <IconView item={credentialItem} />;
    }
    if (credentialItem.subType === "ethereum") {
      return <EthereumView item={credentialItem} />;
    }
    // if (credentialItem.subType === "bitcoin") {
    //   return <BitcoinView subType={formType} {...props} />;
    // }
  }
  return (
    <>
      {renderCryptoItem()}
    </>
  )
}
