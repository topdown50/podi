import React from 'react'
import InputAddOns from '../FormComponents/InputAddOns'
import InputFloating from '../FormComponents/InputFloating'
import SelectInput from '../FormComponents/SelectInput'

export default function LandCharges({
    charges,
    setCharges,
    changeCurrency,
    setChangeCurrency,
    totals,
    setTotals
}) {

    React.useEffect(() => {
        setCharges({})
    },[])

    return (
        <div className="container-fluid">
            <div className="row ps-4 pb-4 pe-4">
                <div className="col-md p-1 align-self-end">
                    <div className="input-space"></div>
                    <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyCharges: e.target.value})} value={changeCurrency.baseCurrencyCharges || ''} text="Base Currency Transport">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                    <h6 className="mt-3">Transport</h6>
                    <InputAddOns onChange={(e) => setCharges({...charges, transportcharges: parseFloat(e.target.value)})} value={charges.transportcharges || ''} text="Transport" type="number" addOn="$"/>

                    <div className="input-space"></div>
                    <SelectInput  onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyBanking: e.target.value})} value={changeCurrency.baseCurrencyBanking || ''} text="Base Currency Banking">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                    <h6 className="mt-3">Banking Fees</h6>
                    <InputAddOns onChange={(e) => setCharges({...charges, bankingFees: parseFloat(e.target.value)})} value={charges.bankingFees || ''} text="Banking Fees" type="number" addOn="$"/>
                </div>
                <div className="col-md p-1 align-self-end">
                    <div className="input-space"></div>
                    <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyCustoms: e.target.value})} value={changeCurrency.baseCurrencyCustoms || ''} text="Base Currency Customs">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                    <h6 className="mt-3">Customs</h6>
                    <InputAddOns onChange={(e) => setCharges({...charges, customscharges: parseFloat(e.target.value)})} value={charges.customscharges || ''} text="Customs" type="number" addOn="$"/>

                    <div className="input-space"></div>
                    <SelectInput onChange={(e) => setChangeCurrency({...changeCurrency, baseCurrencyCommission: e.target.value})} value={changeCurrency.baseCurrencyCommission || ''} text="Base Currency Commission">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                    <h6 className="mt-3">Commission</h6>
                    <InputAddOns onChange={(e) => setCharges({...charges, commission: parseFloat(e.target.value)})} value={charges.commission || ''} text="Commission" type="number" addOn="$"/>
                </div>
                <div className="col-md p-1 align-self-end">
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
