import { useState } from 'react'

const AddVehicle = ({ onAdd }) => {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [distanceDriven, setDistanceDriven] = useState('')
  const [yearManufactured, setYearManufactured] = useState('')
  const [lastUpdated, setLastUpdated] = useState()
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

    if (!distanceDriven) {
      alert('Please enter the vehicle\'s range.')
      return
    }

    if (!yearManufactured) {
      alert('Please enter the year the vehicle was manufactured.')
      return
    }

    setLastUpdated(new Date())
    onAdd({ make, model, distanceDriven, yearManufactured, available, lastUpdated })

    // Reset the form
    setMake('')
    setModel('')
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
      </div>
      <div className="form-control">
        <label>Distance Driven</label>
        <input type='text' placeholder='e.g. "100,000 km"' value={distanceDriven}
          onChange={(e) => setDistanceDriven(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Year Manufactured</label>
        <input type='text' placeholder='e.g. "2022"' value={yearManufactured}
          onChange={(e) => setYearManufactured(e.target.value)} />
      </div>

      <input type='submit' value='Add Vehicle' className="btn btn-block" />
    </form>
  )
}

export default AddVehicle