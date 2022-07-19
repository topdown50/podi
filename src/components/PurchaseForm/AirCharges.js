import React from 'react'
import InputAddOns from '../FormComponents/InputAddOns'
import InputFloating from '../FormComponents/InputFloating'
import SelectInput from '../FormComponents/SelectInput'

export default function AirCharges({charges,setCharges,changeCurrency,setChangeCurrency,totals,setTotals}) {

    React.useEffect(() => {
        setCharges({})
    },[])

  return (
    <div className="container-fluid">
        <div className="row ps-4 pb-4 pe-4">
            <div className="col-md p-1 align-self-end">
                <div className="input-space"></div>
                <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyFreight: e.target.value})} value={changeCurrency.baseCurrencyFreight || ''} text="Base Currency Air Freight">
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </SelectInput>

                <h6 className="mt-3">Kg Air Freight Rate</h6>
                <InputAddOns onChange={(e) => setCharges({...charges, freightRate: parseFloat(e.target.value)})} value={charges.freightRate || ''} text="Kg Air Freight Rate" type="number" addOn="$"/>
                
                <div className="input-space"></div>
                <InputFloating onChange={(e) => setCharges({...charges, shipmentWeight: parseFloat(e.target.value)})} value={charges.shipmentWeight || ''} text="Shipment Weight" type="number"/>

                <div className="input-space"></div>
                <SelectInput  onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyTrucking: e.target.value})} value={changeCurrency.baseCurrencyTrucking || ''} text="Base Currency Trucking">
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </SelectInput>

                <h6 className="mt-3">Trucking Cost</h6>
                <InputAddOns onChange={(e) => setCharges({...charges, truckingCost: parseFloat(e.target.value)})} value={charges.truckingCost || ''} text="Trucking Cost" type="number" addOn="$"/>
                
                <div className="input-space"></div>
                    <SelectInput  onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyBanking: e.target.value})} value={changeCurrency.baseCurrencyBanking || ''} text="Base Currency Banking">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                <h6 className="mt-3">Banking Fees</h6>
                <InputAddOns onChange={(e) => setCharges({...charges, bankingFees: parseFloat(e.target.value)})} value={charges.bankingFees || ''} text="Banking Fees" type="number" addOn="$"/>
            </div>
            <div className="col-md p-1 align-self-start">
                <div className="input-space"></div>
                <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyCustoms: e.target.value})} value={changeCurrency.baseCurrencyCustoms || ''} text="Base Currency Customs">
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </SelectInput>

                <h6 className="mt-3">Customs</h6>
                <InputAddOns onChange={(e) => setCharges({...charges, customscharges: parseFloat(e.target.value)})} value={charges.customscharges || ''} text="Customs" type="number" addOn="$"/>

                <div className="input-space"></div>
                <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyUSA: e.target.value})} value={changeCurrency.baseCurrencyUSA || ''} text="Base Currency USA">
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </SelectInput>

                <h6 className="mt-3">Customs USA</h6>
                <InputAddOns onChange={(e) => setCharges({...charges, customsUSA: parseFloat(e.target.value)})} value={charges.customsUSA || ''} text="Customs USA" type="number" addOn="$"/>

                <div className="input-space"></div>
                <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyCommission: e.target.value})} value={changeCurrency.baseCurrencyCommission || ''} text="Base Currency Commission">
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </SelectInput>

                <h6 className="mt-3">Commission</h6>
                <InputAddOns onChange={(e) => setCharges({...charges, commission: parseFloat(e.target.value)})} value={charges.commission || ''} text="Commission" type="number" addOn="$"/>
            </div>
            <div className="col-md p-1 align-self-start">
                <h6 className="mt-3">Total Air Freight Rate</h6>
                <InputAddOns onChange={(e) => setTotals({...totals, total_freightRate: e.target.value})} value={totals.total_freightRate || ''} text="Total Air Freight Rate" type="number" addOn="$" disabled={true}/>
                <h6 className="mt-3">Items/Products Base Currency</h6>
                <InputAddOns onChange={(e) => setTotals({...totals, productsChargesBaseC: e.target.value})} value={totals.productsChargesBaseC || ''} text="Items/Products Base Currency" type="number" addOn="$" disabled={true}/>
                <h6 className="mt-3">Items/Products</h6>
                <InputAddOns onChange={(e) => setTotals({...totals, productstotal: e.target.value})} value={totals.productstotal || ''} text="Items/Products" type="number" addOn="$" disabled={true}/>
                <h6 className="mt-3">Total Banking Fees</h6>
                <InputAddOns onChange={(e) => setTotals({...totals, totalBankingFees: e.target.value})} value={totals.totalBankingFees || ''} text="Total Banking Fees" type="number" addOn="$" disabled={true}/>
                <h6 className="mt-3">Total Charges</h6>
                <InputAddOns onChange={(e) => setTotals({...totals, totalcharges: e.target.value})} value={totals.totalcharges || ''} text="Total Charges" type="number" addOn="$" disabled={true}/>
            </div>
        </div>
        <div className="row ps-3 pe-3 pb-4">
            <div className="col-md">
                <InputFloating onChange={(e) => setTotals({...totals, caseCount: e.target.value})} value={totals.caseCount || ''} text="Total Case Count" type="text" disabled={true}/>
            </div>
        </div>
    </div>
  )
}
