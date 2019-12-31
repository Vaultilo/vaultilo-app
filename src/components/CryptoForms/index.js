import React, { useState } from "react";
import Select from "react-select"; 
import Icon from './Icon.js';
import Ethereum from './Ethereum.js';
import OtherWallets from './OtherWallets.js'

export default function Form(props) {
  const {selectedItem} = props;
  const subType = selectedItem ? selectedItem.subType : props.subType;
  const options = [
    { value: "icon", label: "Icon" },
    { value: "ethereum", label: "Ethereum" },
    { value: "other"  , label:"Other Wallets"}
  ];
  const defaultOption = options.find(option => option.value === subType);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }
  const renderForm = () => {
    let formComponent;
    switch (selectedOption.value) {
      case 'icon':
        formComponent = <Icon {...props} subType={selectedOption.value} />;
        break;
      case 'ethereum':
        formComponent = <Ethereum {...props} subType={selectedOption.value}/>;
        break;
      case 'other':
        formComponent = <OtherWallets {...props} subType ={selectedOption.value}/>;
        break;
      default:
        formComponent = null;
    }
    return formComponent;
  }
  return (
    <form>
      <div className="form-group row">
        <label htmlFor="walletType" className="col-sm-4 col-form-label">
          Wallet Type
        </label>
        <div className="col-8">
          <Select
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
