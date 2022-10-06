import Vehicle from "./Vehicle"

const Vehicles = ({ vehicles, onDelete, onToggle }) => {

  return (
    <>
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} onDelete = {onDelete} onToggle = {onToggle} />
      ))}
    </>
  )
}

export default Vehicles