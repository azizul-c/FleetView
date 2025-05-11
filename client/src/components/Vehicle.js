import { IoIosArrowRoundForward } from 'react-icons/io'
import { Link } from "react-router-dom"

const Vehicle = ({ vehicle, onView }) => {
  return (
    <div className='vehicle'>
      <div className='vehicle-make-logo-container'>
        <img src={`https://logo.clearbit.com/${vehicle.make}.com`} alt="Vehicle make logo" />
      </div>
      <div className='vehicle-text'>
        <div className='vehicle-title-and-edit-button'>
          <div className='vehicle-title'>
            <h3 className='make-and-model'>{vehicle.make} {vehicle.model} </h3>
            <h3 className='vehicle-year'>{vehicle.yearManufactured}</h3>
          </div>
          <Link to={`/view-vehicle/${vehicle.id}`}><IoIosArrowRoundForward onClick={() => onView(vehicle)} /></Link>
        </div>
        <p>License Plate: {vehicle.licensePlate}</p>
        <p className="bold">{vehicle.available ? "Available" : "Unavailable"}</p>
      </div>
    </div>
  )
}

export default Vehicle