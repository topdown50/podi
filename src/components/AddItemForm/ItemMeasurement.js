import React from 'react'
import InputFloating from '../FormComponents/InputFloating'
import SelectInput from '../FormComponents/SelectInput'
import RadioInput from '../FormComponents/RadioInput'

export default function ItemMeasurement({item,setItem,setDisable}) {
    
    return (
        <div className="container-flud">
            <div className="row px-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setItem({...item, units_per_case: parseInt(e.target.value)})} value={item.units_per_case || ''} text="Units per case" type="number" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setItem({...item, cases_per_pallet: parseInt(e.target.value)})} value={item.cases_per_pallet || ''} text="Cases per pallet" type="number" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setItem({...item, item_weight: parseFloat(e.target.value)})} value={item.item_weight || ''} text="Item weight" type="number" disabled={setDisable}/>
                </div>
            </div>
            <div className="row px-4">
                <div className="col-md p-1">
                    <h6>ZB convert to weight:</h6>
                    <div className='ms-4'>
                        <RadioInput itsCheked={item.zb_convert_weight === 'true'} onChange={(e) => setItem({...item, zb_convert_weight: (e.target.value)})} value={true} text="Yes" id="convertWeight1" name="convertWeight" disabled={setDisable}/>
                        <RadioInput itsCheked={item.zb_convert_weight === 'false'} onChange={(e) => setItem({...item, zb_convert_weight: (e.target.value)})} value={false} text="No" id="convertWeight2" name="convertWeight" disabled={setDisable}/>
                    </div>
                </div>
                <div className="col-md p-1">
                    <SelectInput value={item.unity} onChange={(e) => setItem({...item, unity: e.target.value})} text="Unity" setDisable={setDisable}>
                        <option value="pounds">Pounds (lb)</option>
                        <option value="kilograms">Kilograms (kg)</option>
                        <option value="grams">Grams (g)</option>
                        <option value="ounces">Ounces (oz)</option>
                        <option value="liters">Liters (L)</option>
                        <option value="mililiters">Milliliters (ml)</option>
                        <option value="dozen">Dozen (DOZ)</option>
                    </SelectInput>
                </div>
            </div>
        </div>
    )
}
