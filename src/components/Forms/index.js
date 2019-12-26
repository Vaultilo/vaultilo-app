import React, { useRef, useEffect, useState } from "react";
import Select from "react-select";
import Icon from './Icon.js';
import Ethereum from './Ethereum.js';

export default function Form(props) {
  const {type} = props;
  const options = [
    { value: "icon", label: "Icon" },
    { value: "ethereum", label: "Ethereum" }
  ];
  const defaultOption = options.find(option => option.value === type);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }
  const renderForm = () => {
    let formComponent;
    switch (selectedOption.value) {
      case 'icon':
        formComponent = <Icon {...props} type={selectedOption.value} />;
        break;
      case 'ethereum':
        formComponent = <Ethereum {...props} type={selectedOption.value}/>;
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
