import React from 'react'
import DateTimePicker from 'react-datetime-picker'

export default function ShippingInfo({
    inspection,
    setInspection,
}) {
    return (
        <div className="container-fluid">
            <div className="row px-4">
                <div className="col-md p-1 align-self-start">
                    <h6 className="mt-3">Ship Date</h6>
                    <DateTimePicker onChange={(e) => setInspection({...inspection, ship_date: e.toLocaleString()})} value={new Date(inspection.ship_date) || ''} wrapperClassName="date-picker" format="dd/MMM/y h:mm a" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year"/>
                </div>
                <div className="col-md p-1 align-self-start">
                    
                </div>
            </div>
        </div>
    )
}
