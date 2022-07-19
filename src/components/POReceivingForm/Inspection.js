import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { addDays } from '../../utils/CustomFunctions/customFunctions';
import CheckInput from '../FormComponents/CheckInput';
import InputFloating from '../FormComponents/InputFloating';
import TextArea from '../FormComponents/TextArea';

export default function Inspection({
    inspection,
    setInspection,
    quality,
    setQuality
}) {

    return (
        <div className="container-fluid">
            <div className="row px-4">
                <div className="col-md p-1 align-self-start">
                    <h6 className="mt-3">Inspection Date-Time</h6>
                    <DateTimePicker onChange={(e) => setInspection({...inspection, inspection_date: e.toLocaleString()})} value={new Date(inspection.inspection_date) || ''} wrapperClassName="date-picker" format="dd/MMM/y h:mm a" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year"/>
                    <div className="mt-3"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, carrier_name: e.target.value})} value={inspection.carrier_name || ''} text="Carrier Name" type="text"/>
                    <div className="mt-3"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, driver_name: e.target.value})} value={inspection.driver_name || ''} text="Driver Name" type="text"/>
                    <div className="mt-3"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, trailer_number: e.target.value})} value={inspection.trailer_number || ''} text="Trailer Number" type="number"/>
                    <div className="mt-3"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, initals: e.target.value})} value={inspection.initals || ''} text="Initals" type="text"/>
                </div>
                <div className="col-md p-1 align-self-end">
                    <div className="input-space"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, reefer_temperature: e.target.value})} value={inspection.reefer_temperature || ''} text="Reefer Run Temperature F°" type="number"/>
                    <div className="mt-3"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, truck_temperature: e.target.value})} value={inspection.truck_temperature || ''} text="Truck Temperature F°" type="number"/>
                    <div className="mt-3"></div>
                    <InputFloating onChange={(e) => setInspection({...inspection, product_temperature: e.target.value})} value={inspection.product_temperature || ''} text="Product Temperature F°" type="number"/>
                    <div className="mt-3"></div>
                    <h6>Quality Inspection:</h6>
                    <div className='ms-4'>
                        <CheckInput itsCheked={quality.truck_clean} onChange={() => setQuality({...quality, truck_clean: !quality.truck_clean})} text="Truck is clean" id="truck" value={true}/>
                        <CheckInput itsCheked={quality.free_pest} onChange={() => setQuality({...quality, free_pest: !quality.free_pest})} text="Free of pest infestation,damage, non-food products" id="products" value={false}/>
                        <CheckInput itsCheked={quality.truck_door} onChange={() => setQuality({...quality, truck_door: !quality.truck_door})} text="Truck door is tight-fitting" id="truck-door" value={false}/>
                        <CheckInput itsCheked={quality.driver} onChange={() => setQuality({...quality, driver: !quality.driver})} text="Driver complies with GMPs" id="driver" value={false}/>
                    </div>
                    <div className="mt-3"></div>
                    <TextArea onChange={(e) => setInspection({...inspection, non_conformance: e.target.value})} value={inspection.non_conformance || ''}text="Item Describe Non-Conformance" type="text" style={{height: '150px'}}/>
                </div>
            </div>
        </div>
    )
}
