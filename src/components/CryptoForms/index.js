import React, { useState } from 'react';
import Select from 'react-select';
import Icon from './Icon.js';
import Ethereum from './Ethereum.js';
import Bitcoin from './Bitcoin.js';
import Ripple from './Ripple';
import OtherWallets from './OtherWallets.js';
import './index.css';

export default function Form(props) {
  const { selectedItem } = props;
  const subType = selectedItem ? selectedItem.subType : props.subType;
  const options = [
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'icon', label: 'Icon' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'ripple', label: 'Ripple' },
    { value: 'other', label: 'Other Wallets' },
  ];
  const defaultOption = options.find(option => option.value === subType);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);
  const handleSelectChange = selectedOption => {
    setSelectedOption(selectedOption);
  };
  const renderForm = () => {
    let formComponent;
    switch (selectedOption.value) {
      case 'icon':
        formComponent = <Icon {...props} subType={selectedOption.value} />;
        break;
      case 'ethereum':
        formComponent = <Ethereum {...props} subType={selectedOption.value} />;
        break;
      case 'bitcoin':
        formComponent = <Bitcoin {...props} subType={selectedOption.value} />;
        break;
      case 'ripple':
        formComponent = <Ripple {...props} subType={selectedOption.value} />;
        break;

      case 'other':
        formComponent = <OtherWallets {...props} subType={selectedOption.value} />;
        break;
      default:
        formComponent = null;
    }
    return formComponent;
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '100px',
      paddingLeft: '14px',
      paddingRight: '14px',
    }),
  };

  return (
    <form className="form-container">
      <div className="form-group row">
        <label htmlFor="walletType" className="col-12 custom-label">
          Wallet Type
        </label>
        <div className="col-12">
          <Select
            styles={customStyles}
            className="custom-select-input"
            value={selectedOption}
            options={options}
            isSearchable={true}
            onChange={handleSelectChange}
          />
        </div>
      </div>
      {selectedOption ? renderForm() : null}
    </form>
  );
}
