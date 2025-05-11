import { useState } from 'react'

const AddVehicle = ({ onAdd }) => {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [distanceDriven, setDistanceDriven] = useState('')
  const [yearManufactured, setYearManufactured] = useState('')
  let available = true

  const onSubmit = (e) => {
    e.preventDefault()

    if (!make) {
      alert('Please enter the make of the vehicle.')
      return
    }

    if (!model) {
      alert('Please enter the model of the vehicle.')
      return
    }

    if (!licensePlate) {
      alert('Please enter the vehicle\'s license plate.')
      return
    }

    if (!distanceDriven) {
      alert('Please enter the vehicle\'s distance driven.')
      return
    }

    if (!yearManufactured) {
      alert('Please enter the year the vehicle was manufactured.')
      return
    }

    onAdd({ make, model, distanceDriven, licensePlate, yearManufactured, available })

    // Reset the form
    setMake('')
    setModel('')
    setLicensePlate('')
    setDistanceDriven('')
    setYearManufactured('')
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className='make-and-model-form-control'>
        <div className="form-control">
          <label>Make</label>
          <input type='text' placeholder='e.g. "Tesla"' value={make}
            onChange={(e) => setMake(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Model</label>
          <input type='text' placeholder='e.g. "Model S"' value={model}
            onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Year Manufactured</label>
          <input type='text' placeholder='e.g. "2022"' value={yearManufactured}
            onChange={(e) => setYearManufactured(e.target.value)} />
        </div>
      </div>
      <div className='plate-and-distance-form-control'>
        <div className="form-control">
          <label>License Plate</label>
          <input type='text' placeholder='e.g. "ETAC 212"' value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Distance Driven</label>
          <input type='text' placeholder='e.g. "100,000 km"' value={distanceDriven}
            onChange={(e) => setDistanceDriven(e.target.value)} />
        </div>
      </div>
      <input type='submit' value='Add Vehicle' className="add-vehicle-btn btn" />
    </form>
  )
}

export default AddVehicle