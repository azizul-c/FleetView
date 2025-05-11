import React, { useEffect, useState } from 'react'
import { MdCheck, MdOutlineCarCrash, MdDelete } from 'react-icons/md'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { PiPath, PiWarningCircle } from 'react-icons/pi'
import { BsCardText } from 'react-icons/bs'
import { TbBulb } from 'react-icons/tb'
import { Link, useNavigate } from "react-router-dom"
import Recall from './Recall'

const ViewVehicle = ({ vehicle, onDelete, onToggle }) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [recalls, setRecalls] = useState();
    const [isVehicleAvailable, setIsVehicleAvailable] = useState(vehicle.available);

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

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await onDelete(vehicle.id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="view-vehicle-container">
            <div className='view-vehicle-header-static'>
                <h2>View vehicle</h2>
                <Link to="/" className='go-back'>
                    <IoIosArrowRoundBack /> Return to fleet
                </Link>
            </div>
            <div className='view-vehicle-content'>
                <div className='view-vehicle_vehicle-info'>
                    <div className='view-vehicle_vehicle-header'>
                        <div className='view-vehicle_logo-and-title'>
                            <div className='view-vehicle_vehicle-make-logo-container'>
                                <img src={`https://logo.clearbit.com/${vehicle.make}.com`} alt="Vehicle make logo" />
                            </div>
                            <div className='view-vehicle_vehicle-title'>
                                <h3 className="view-vehicle_vehicle-make-and-model">{vehicle.make} {vehicle.model} </h3>
                                <h3 className='view-vehicle_vehicle-year'>{vehicle.yearManufactured}</h3>
                            </div>
                        </div>
                        <button className='view-vehicle_delete' onClick={handleDelete}><MdDelete /></button>
                    </div>
                    <div className='view-vehicle_vehicle-specs'>
                        <div className='view-vehicle_info-section'>
                            <h4>General Information</h4>
                            <div className='all-metrics'>
                                <div className={isVehicleAvailable ? "available metric-container" : "unavailable metric-container"} onClick={() => {
                                    setIsVehicleAvailable(!isVehicleAvailable)
                                    onToggle(vehicle.id)
                                }}>
                                    <h5>Current Status</h5>
                                    <div className='icon-and-metric'>
                                        {isVehicleAvailable ? <MdCheck /> : <MdOutlineCarCrash />}
                                        <p>{isVehicleAvailable ? "Available" : "Unavailable"}</p>
                                    </div>
                                </div>
                                <div className='metric-container'>
                                    <h5>License Plate</h5>
                                    <div className='icon-and-metric'>
                                        <BsCardText /><p>{vehicle.licensePlate}</p>
                                    </div>
                                </div>
                                <div className='metric-container'>
                                    <h5>Distance Driven</h5>
                                    <div className='icon-and-metric'>
                                        <PiPath /><p>{vehicle.distanceDriven}</p>
                                    </div>
                                </div>
                            </div>
                            <p className='status-tip'><TbBulb /> Tip: Toggle the Current Status of the vehicle by clicking on it.</p>
                        </div>
                        <div className='view-vehicle_info-section'>
                            <h4>Recall Information</h4>
                            {isDataLoading ? (
                                <p className='recalls-no-info'>Loading...</p>
                            ) : recalls && recalls.results && recalls.Count > 0 ? (
                                <>
                                    <h6><PiWarningCircle /> {recalls.Count} recalls retrieved from the National Highway Traffic Safety Administration.</h6>
                                    {recalls.results.map((recall, index) => (
                                        <Recall key={index} recall={recall} />
                                    ))}
                                </>
                            ) : (recalls.Count === 0 ? (
                                <p className='recalls-no-info'>There are no recalls for this vehicle at this time.</p>
                            ) : (
                                <p className='recalls-no-info'>Unable to retrieve recall information.</p>
                            )

                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewVehicle