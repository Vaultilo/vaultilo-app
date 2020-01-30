import React from 'react';
import IconView from './IconView';
import EthereumView from './EthereumView';
import BitcoinView from './BitcoinView';
import RippleView from './RippleView';
import OthersView from './OthersView';

export default function CryptoDetail(props) {
  const cryptoId = props.location.state.id;
  const credentials = props.credentials;
  const credentialItem = credentials.find(item => item.id === cryptoId);

  const renderCryptoItem = () => {
    if (credentialItem.subType === 'icon') {
      return <IconView item={credentialItem} />;
    }
    if (credentialItem.subType === 'ethereum') {
      return <EthereumView item={credentialItem} />;
    }
    if (credentialItem.subType === 'bitcoin') {
      return <BitcoinView item={credentialItem} />;
    }
    if (credentialItem.subType === 'ripple') {
      return <RippleView item={credentialItem} />;
    }
    if (credentialItem.subType === 'other') {
      return <OthersView item={credentialItem} />;
    }
  };
  return <>{renderCryptoItem()}</>;
}
