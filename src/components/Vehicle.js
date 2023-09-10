import { FaTimes } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { Link } from "react-router-dom"

const Vehicle = ({ vehicle, onDelete, onEdit }) => {
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
          <Link to={`/edit-vehicle/${vehicle.id}`}><IoIosArrowRoundForward onClick={() => onEdit(vehicle)} /></Link>
        </div>
        <p>Distance Driven: {vehicle.distanceDriven}</p>
        <p className="bold">{vehicle.available ? "Available" : "Unavailable"}</p>
        {/* <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(vehicle.id)} /> */}
      </div>
    </div>
  )
}

export default Vehicle

// this vehicle is nice