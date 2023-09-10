import Vehicle from "./Vehicle"

const Vehicles = ({ vehicles, onDelete, onEdit, onToggle }) => {

  return (
    <div className="vehicles-container">
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
      ))}
    </div>
  )
}

export default Vehicles