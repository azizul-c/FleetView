import { FaTimes } from 'react-icons/fa'

const Vehicle = ({ vehicle, onDelete, onToggle, }) => {
  return (
    <div className = "vehicle" onDoubleClick = {() => onToggle(vehicle.id)}>
        <h3>{vehicle.model} <FaTimes style = {{  color: 'red', cursor: 'pointer'  }} onClick = {() => onDelete(vehicle.id)}/></h3>
        <p>Range: {vehicle.range} | Year Purchased: {vehicle.yearPurchased}</p>
        <p className = "bold">{vehicle.available ? "Available" : "Unavailable"}</p>
    </div>
  )
}

export default Vehicle