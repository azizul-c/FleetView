import React, { useEffect, useState } from 'react'
import { MdCheck, MdOutlineCarCrash } from 'react-icons/md'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { PiPath, PiWarning } from 'react-icons/pi'
import { Link } from "react-router-dom"

const EditVehicle = ({ vehicle }) => {
    const [editVehicle, setEditVehicle] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [recalls, setRecalls] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getRecallInformation(vehicle);
                setRecalls(data);
                setIsDataLoading(false);
            } catch (error) {
                console.error('Error fetching recall information:', error);
            }
        }

        fetchData();
    }, [vehicle]);

    const getRecallInformation = async (vehicle) => {
        const response = await fetch(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${vehicle.make}&model=${vehicle.model}&modelYear=${vehicle.yearManufactured}`);
        const data = await response.json();
        return data;
    }

    return (
        <>
            <header className='view-vehicle-header'>
                <h2>{editVehicle ? "Edit vehicle" : "View vehicle"}</h2>
                {/* <button className='save-button btn'><MdCheck /> Save changes</button> */}
                <Link to="/"><button className='go-back btn'><IoIosArrowRoundBack /> Return to fleet</button></Link>
            </header>
            <div className='view-vehicle_vehicle-info'>
                <div className='view-vehicle_vehicle-logo-and-title'>
                    <div className='view-vehicle_vehicle-make-logo-container'>
                        <img src={`https://logo.clearbit.com/${vehicle.make}.com`} alt="Vehicle make logo" />
                    </div>
                    <div className='view-vehicle_vehicle-title'>
                        <h3 className="view-vehicle_vehicle-make-and-model">{vehicle.make} {vehicle.model} </h3>
                        <h3 className='view-vehicle_vehicle-year'>{vehicle.yearManufactured}</h3>
                    </div>
                </div>
                <div className='view-vehicle_vehicle-specs'>
                    <div className='view-vehicle_info-section'>
                        <h4>General Information</h4>
                        <div className='all-metrics'>
                            <div className={vehicle.available ? "available metric-container" : "unavailable metric-container"}>
                                <h5>Current Status</h5>
                                <div className='icon-and-metric'>
                                    {vehicle.available ? <MdCheck /> : <MdOutlineCarCrash />}
                                    <p>{vehicle.available ? "Available" : "Unavailable"}</p>
                                </div>
                            </div>
                            <div className='metric-container'>
                                <h5>Distance Driven</h5>
                                <div className='icon-and-metric'>
                                    <PiPath /><p>{vehicle.distanceDriven}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='view-vehicle_info-section'>
                        <h4>Recall Information</h4>
                        {isDataLoading ? (
                            <p>Loading...</p>
                        ) : recalls && recalls.results ? (
                            recalls.results.map((recall, index) => (
                                <p key={index}>{recall.Component}</p>
                            ))
                        ) : (
                            <p>No recall information available</p>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditVehicle