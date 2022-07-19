import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import { addDays } from '../../utils/CustomFunctions/customFunctions';
import InputFloating from '../FormComponents/InputFloating'
import SelectInput from '../FormComponents/SelectInput';

export default function ChargesExchange({
    rates,
    setRates,
    changeCurrency,
    setChangeCurrency
}) {

  return (
    <div className="container-fluid">
        <div className="row g-2 pe-4 ps-4 pb-4">
            <div className="col-md align-self-end">
                <InputFloating onChange={(e) => setRates({...rates, exchange_rate_charges: e.target.value})} value={rates.exchange_rate_charges || ''} text="Exchange Rate (Charges)" type="text" disabled={true}/>
            </div>
            <div className="col-md">
                <h6>Exchange Rate Date</h6>
                <DatePicker onChange={(value) => setRates({...rates, exchange_rate_date: value.toISOString().slice(0, 10)})} value={addDays(rates.exchange_rate_date,1) || ''} wrapperClassName="date-picker" format="dd/MMM/y" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year" disabled={true}/>
            </div>
            <div className="col-md align-self-end">
                <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, convert_to_charges: e.target.value})} value={changeCurrency.convert_to_charges || ''} text="Convert to Currency (Charges)">
                    <option value='cad'>CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </SelectInput>
            </div>
        </div>
    </div>
  )
}
