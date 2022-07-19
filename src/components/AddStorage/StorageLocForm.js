import React from 'react'
import StorageLocFormMain from './StorageLocFormMain'

export default function StorageLocForm({title,storageLoc,setStorageLoc,resetForm,saveStorageLoc,button_title,setDisable}) {
    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>{title}</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <StorageLocFormMain storageLoc={storageLoc} setStorageLoc={setStorageLoc}/>
            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={saveStorageLoc} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>
        </div>
    )
}
