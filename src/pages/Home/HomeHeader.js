import React from 'react'

export default function HomeHeader() {
  return (
    <div className="container-fluid p-4 m-4 border">
        <button type="button" className="btn btn-danger btn-lg me-3 px-4">TSI Tropicals</button>
        <button type="button" className="btn btn-primary btn-lg me-3 px-4">Items</button>
        <button type="button" className="btn btn-primary btn-lg me-3 px-4">Purchasing</button>
        <button type="button" className="btn btn-primary btn-lg me-3 px-4">Sales</button>
        <button type="button" className="btn btn-primary btn-lg me-3 px-4">Shipping</button>
    </div>
  )
}
