import React from 'react'
import InputFloating from '../FormComponents/InputFloating'

export default function WarehouseMain({warehouse,setWarehouse,setDisable}) {
  return (
    <div className="container-fluid">
        <div className="row p-4">
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setWarehouse({...warehouse, warehouse_name: e.target.value})} value={warehouse.warehouse_name || ''} text="Warehouse Name" type="text" disabled={setDisable}/>
            </div>
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setWarehouse({...warehouse, phone: e.target.value})} value={warehouse.phone || ''} text="Phone" type="tel" disabled={setDisable}/>
            </div>
        </div>
    </div>
  )
}
