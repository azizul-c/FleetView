import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Vehicles from "./components/Vehicles";
import AddVehicle from "./components/AddVehicle";
import ViewVehicle from "./components/ViewVehicle";
import About from "./components/About";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { supabase } from "./lib/supabase";
import { GoogleLogin } from '@react-oauth/google';
import Footer from "./components/Footer";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
};

function AppContent() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleBeingViewed, setVehicleBeingViewed] = useState();
  const { user, signOut, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      getVehicles();
    }
  }, [user]);

  const camelToSnake = (obj) => {
    const newObj = {};
    for (const key in obj) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      newObj[snakeKey] = obj[key];
    }
    return newObj;
  };

  const snakeToCamel = (obj) => {
    const newObj = {};
    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      newObj[camelKey] = obj[key];
    }
    return newObj;
  };

  // Fetch Vehicles from Supabase
  const getVehicles = async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching vehicles:", error.message);
      setVehicles([]);
    } else {
      setVehicles(data.map(snakeToCamel));
    }
  };

  // Fetch Vehicle
  const fetchVehicle = async (id) => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching vehicle:", error.message);
      return null;
    }
    return data.map(snakeToCamel);
  };

  // Add Vehicle
  const addVehicle = async (vehicle) => {
    console.log(vehicle);
    // Trim trailing/leading whitespace from each entry
    Object.entries(vehicle).forEach(([key, value]) => {
      if (key !== "available") {
        vehicle[key] = value.trim();
      }
    });

    // Convert to snake_case for Supabase
    const vehicleForDb = camelToSnake({ ...vehicle, user_id: user.id });

    const { data, error } = await supabase
      .from("vehicles")
      .insert([vehicleForDb])
      .select();
    if (error) {
      console.error("Error adding vehicle:", error.message);
      return;
    }
    setVehicles([data[0], ...vehicles]);
  };

  // Edit Vehicle (just sets the state for viewing)
  const viewVehicle = async (vehicle) => {
    setVehicleBeingViewed(vehicle);
  };

  // Delete Vehicle
  const deleteVehicle = async (id) => {
    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) {
      console.error("Error deleting vehicle:", error.message);
      return;
    }
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  // Toggle Availability
  const toggleAvailability = async (id) => {
    const vehicleToToggle = await fetchVehicle(id);
    if (!vehicleToToggle) return;
    const updatedVehicle = {
      ...vehicleToToggle,
      available: !vehicleToToggle.available,
    };
    const { data, error } = await supabase
      .from("vehicles")
      .update({ available: updatedVehicle.available })
      .eq("id", id)
      .eq("user_id", user.id)
      .select();
    if (error) {
      console.error("Error toggling vehicle availability:", error.message);
      return;
    }
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, available: data[0].available }
          : vehicle
      )
    );
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await signInWithGoogle(credentialResponse.credential);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    <Router>
      {/* Show the landing hero background only on the unauthenticated landing page */}
      {!user && (
        <div
          className="landing-hero-bg"
          style={{
            background: `url('/fleet_image.jpg') center center/cover no-repeat`
          }}
        >
          <div className="frosted-landing-content">
            <div className='desc-and-form'>
              <div className='description'>
                <h3>Your fleet's safety matters.</h3>
                <h4>FleetView makes recall information accessible and hassle-free. Get started today.</h4>
              </div>
              <div className="sign-in-container">
                <div className="sign-in-content">
                  <h3>Sign in to manage your fleet</h3>
                  <p>Access your vehicle information and recall data</p>
                  <div className="google-btn-wrapper">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      width="320"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <Header title={"FleetView"} user={user} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {user ? (
                  <>
                    <div className='desc-and-form'>
                      <div className='description' style={{ marginTop: -10 }}>
                        <h3>{`Hello, ${user.user_metadata?.name || user.email}`}</h3>
                        <h4>Add a new vehicle or view your fleet below.</h4>
                      </div>
                      <div style={{ paddingTop: 80 }}>
                        <AddVehicle onAdd={addVehicle} />
                      </div>
                    </div>
                    <h2>Your fleet</h2>
                    {vehicles.length > 0 ? (
                      <Vehicles
                        vehicles={vehicles}
                        onDelete={deleteVehicle}
                        onView={viewVehicle}
                      />
                    ) : (
                      <p className="no-vehicles-warn">
                        There are no vehicles in your fleet.
                      </p>
                    )}
                  </>
                ) : null}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/view-vehicle/:vehicleId"
            element={
              <ProtectedRoute>
                <ViewVehicle
                  vehicle={vehicleBeingViewed}
                  onDelete={deleteVehicle}
                  onToggle={toggleAvailability}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
