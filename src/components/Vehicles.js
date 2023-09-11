import Vehicle from "./Vehicle"

const Vehicles = ({ vehicles, onDelete, onView, onToggle }) => {

  return (
    <div className="vehicles-container">
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} onDelete={onDelete} onView={onView} onToggle={onToggle} />
      ))}
    </div>
  )
}

export default Vehicles