import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Vehicles from "./components/Vehicles";
import AddVehicle from "./components/AddVehicle";
import ViewVehicle from "./components/ViewVehicle";
import About from "./components/About";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleBeingViewed, setVehicleBeingViewed] = useState();

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
    // Trim trailing/leading whitespace from each entry
    Object.entries(vehicle).forEach(([key, value]) => {
      if (key !== "available") {
        vehicle[key] = value.trim();
      }
    });

    console.log(vehicle);
    const res = await fetch(`http://localhost:5000/vehicles`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });

    const data = await res.json();
    setVehicles([...vehicles, data]);

    // The following code is used when *not* using JSON-server as the backend
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newVehicle = { id, ...vehicle }
    // setVehicles([...vehicles, newVehicle])
  };

  // Edit Vehicle
  const viewVehicle = async (vehicle) => {
    setVehicleBeingViewed(vehicle);
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
    <Router>
      <div className="container">
        <Header title={"FleetView"} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddVehicle onAdd={addVehicle} />
                <h2>Your fleet</h2>
                {vehicles.length > 0 ? (
                  <>
                    <Vehicles
                      vehicles={vehicles}
                      onDelete={deleteVehicle}
                      onView={viewVehicle}
                    />
                  </>
                ) : (
                  <p className="no-vehicles-warn">
                    There are no vehicles in your fleet.
                  </p>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/view-vehicle/:vehicleId"
            element={
              <ViewVehicle
                vehicle={vehicleBeingViewed}
                onDelete={deleteVehicle}
                onToggle={toggleAvailability}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
