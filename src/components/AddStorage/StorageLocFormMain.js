import React from 'react'
import useWarehouse from '../../hooks/useWarehouse'
import SelectInput from '../FormComponents/SelectInput'
import Select from 'react-select'
import InputFloating from '../FormComponents/InputFloating'

export default function StorageLocFormMain({storageLoc,setStorageLoc,setDisable}) {

    const [warehouses] = useWarehouse([])

    return (
        <div className="container-flud">
            <div className="row px-4">
                <div className="col-md p-1">
                    <h6>Warehouse</h6>
                    <Select options={warehouses} onChange={(e) => setStorageLoc({...storageLoc, warehouseID: e.value})} value={warehouses.filter(ware => ware.value === storageLoc.warehouseID)} placeholder="Warehouse"/>
                </div>
                <div className="col-md p-1 align-self-end">
                    <SelectInput value={storageLoc.storage_type} onChange={(e) => setStorageLoc({...storageLoc, storage_type: e.target.value})} text="Storage Type">
                        <option value="cooler">Cooler</option>
                        <option value="freezer">Freezer</option>
                    </SelectInput>
                </div>
                <div className="col-md p-1 align-self-end">
                    <InputFloating onChange={(e) => setStorageLoc({...storageLoc, storage_name: e.target.value})} value={storageLoc.storage_name || ''} text="Storage Name" type="text" disabled={setDisable}/>
                </div>
            </div>
            <div className="row px-4 pb-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setStorageLoc({...storageLoc, rack: parseInt(e.target.value)})} value={storageLoc.rack || ''} text="Rack" type="number" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setStorageLoc({...storageLoc, row: parseInt(e.target.value)})} value={storageLoc.row || ''} text="Row" type="number" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setStorageLoc({...storageLoc, position: parseInt(e.target.value)})} value={storageLoc.position || ''} text="Position" type="number" disabled={setDisable}/>
                </div>
            </div>
        </div>
    )
}
