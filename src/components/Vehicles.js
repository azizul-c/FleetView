import Vehicle from "./Vehicle"

const Vehicles = ({ vehicles }) => {

  return (
    <>
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle}/>
      ))}
    </>
  )
}

export default Vehicles