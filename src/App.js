import { useState, useEffect } from "react";
import Header from "./components/Header";
import Vehicles from "./components/Vehicles";
import AddVehicle from "./components/AddVehicle";

function App() {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesFromServer = await fetchVehicles();
      setVehicles(vehiclesFromServer);
    };

    getVehicles();
  }, []);

  // Fetch Vehicles from Mock Backend
  const fetchVehicles = async () => {
    const response = await fetch("http://localhost:5000/vehicles");
    const data = await response.json();

    return data;
  };

  // Fetch Vehicle
  const fetchVehicle = async (id) => {
    const response = await fetch(`http://localhost:5000/vehicles/${id}`);
    const data = await response.json();

    return data;
  };

  // Add Vehicle
  const addVehicle = async (vehicle) => {
    console.log(vehicle);
    console.log(JSON.stringify(vehicle));

    const res = await fetch(`http://localhost:5000/vehicles`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });

    const data = await res.json();
    console.log(data);
    setVehicles([...vehicles, data]);

    // The following code is used when *not* using JSON-server as the backend
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newVehicle = { id, ...vehicle }
    // setVehicles([...vehicles, newVehicle])
  };

  // Delete Vehicle
  const deleteVehicle = async (id) => {
    await fetch(`http://localhost:5000/vehicles/${id}`, {
      method: "DELETE",
    });
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  // Toggle Availability
  const toggleAvailability = async (id) => {
    const vehicleToToggle = await fetchVehicle(id);
    const updatedVehicle = {
      ...vehicleToToggle,
      available: !vehicleToToggle.available,
    };

    const res = await fetch(`http://localhost:5000/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedVehicle),
    });

    const data = await res.json();

    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, available: data.available } : vehicle
      )
    );
  };

  return (
    <div className="container">
      <Header
        title={"FleetView"}
        onAdd={() => setShowAddVehicle(!showAddVehicle)}
        showAdd={showAddVehicle}
      />
      {/* shorter way of doing a ternary without an else */}
      {showAddVehicle && <AddVehicle onAdd={addVehicle} />}
      {vehicles.length > 0 ? (
        <Vehicles
          vehicles={vehicles}
          onDelete={deleteVehicle}
          onToggle={toggleAvailability}
        />
      ) : (
        "There are no vehicles in your fleet."
      )}
    </div>
  );
}

export default App;
