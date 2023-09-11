import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Vehicles from "./components/Vehicles";
import AddVehicle from "./components/AddVehicle";
import EditVehicle from "./components/EditVehicle";
import About from "./components/About";

function App() {
  const [showAddVehicle, setShowAddVehicle] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleBeingEdited, setVehicleBeingEdited] = useState();

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesFromServer = await fetchVehicles();
      setVehicles(vehiclesFromServer);
    };

    getVehicles();
  }, []);

  // useEffect(() => {}, [vehicleBeingEdited]);

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

  // Edit Vehicle
  const editVehicle = async (vehicle) => {
    setVehicleBeingEdited(vehicle);
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
        <Header
          title={"FleetView"}
          onAdd={() => setShowAddVehicle(!showAddVehicle)}
          showAdd={showAddVehicle}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddVehicle && <AddVehicle onAdd={addVehicle} />}
                <h2>Your fleet</h2>
                {vehicles.length > 0 ? (
                  <>
                    <Vehicles
                      vehicles={vehicles}
                      onDelete={deleteVehicle}
                      onEdit={editVehicle}
                    />
                  </>
                ) : (
                  "There are no vehicles in your fleet."
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/edit-vehicle/:vehicleId"
            element={
              <EditVehicle
                vehicle={vehicleBeingEdited}
                onDelete={deleteVehicle}
                onToggle={toggleAvailability}
              />
            }
          ></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
