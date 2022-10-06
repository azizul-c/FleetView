const Vehicle = ({ vehicle }) => {
  return (
    <div className="vehicle">
        <h3>{vehicle.model}</h3>
        <p>Range: {vehicle.range} | Year Purchased: {vehicle.yearPurchased}</p>
        <p className="bold">{vehicle.available ? "Available" : "Unavailable"}</p>
    </div>
  )
}

export default Vehicle