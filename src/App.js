import { useState } from 'react'
import Header from './components/Header'
import Vehicles from './components/Vehicles';
import AddVehicle from './components/AddVehicle';

function App() {

  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [vehicles, setVehicles] = useState ([
    {
    id: 1,
    model: "Tesla Model S",
    range: '300 km',
    yearPurchased: 2020,
    available: true,
  },
  {
    id: 2,
    model: "Polestar 2",
    range: '200 km',
    yearPurchased: 2021,
    available: true,
  },
  {
    id: 3,
    model: "Mercedes-Benz EQS",
    range: '230 km',
    yearPurchased: 2022,
    available: false,
  },])

  // Add Vehicle
  const addVehicle = (vehicle) => {
    
    // Create random ID -- Note, these are not unique, need to fix that
    const id = Math.floor(Math.random() * 10000) + 1
    const newVehicle = { id, ...vehicle }
    setVehicles([...vehicles, newVehicle])
  }

  // Delete Vehicle
  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
  }

  // Toggle Availability
  const toggleAvailability = (id) => {
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, available: !vehicle.available } : vehicle)
    )
  }

  return (
    <div className="container">
      <Header title={"FleetView"} onAdd = {() => setShowAddVehicle(!showAddVehicle)} showAdd={showAddVehicle} />
      {/* shorter way of doing a ternary without an else */}
      {showAddVehicle && <AddVehicle onAdd = {addVehicle} />} 
      {vehicles.length > 0 ? <Vehicles vehicles = {vehicles} onDelete = {deleteVehicle} onToggle = {toggleAvailability} /> : 
      "There are no vehicles in your fleet."}
    </div>
  );
}

export default App;
