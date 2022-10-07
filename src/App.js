import { useState } from 'react'
import Header from './components/Header'
import Vehicles from './components/Vehicles';

function App() {

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

  // Delete Vehicle
  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
  }

  // Toggle Availability
  const toggleAvailability = (id) => {
    console.log (id);
  }

  return (
    <div className="container">
      <Header title={"FleetView"} />
      {vehicles.length > 0 ? <Vehicles vehicles = {vehicles} onDelete = {deleteVehicle} onToggle = {toggleAvailability} /> : 
      "There are no vehicles in your fleet."}
    </div>
  );
}

export default App;
