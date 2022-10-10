import { useState } from 'react'

const AddVehicle = ({ onAdd }) => {
  const [model, setModel] = useState('')
  const [range, setRange] = useState('')
  const [yearPurchased, setYearPurchased] = useState('')
  let available = true

  const onSubmit = (e) => {
    e.preventDefault()

    if (!model) {
      alert ('Please enter the make and model of the vehicle.')
      return
    }

    if (!range) {
      alert ('Please enter the vehicle\'s range.')
      return
    }

    if (!yearPurchased) {
      alert ('Please enter the year the vehicle was purchased.')
      return
    }

    onAdd({ model, range, yearPurchased, available })

    setModel('')
    setRange('')
    setYearPurchased('')
  }

  return (
    <form className="add-form" onSubmit = {onSubmit}>
        <div className="form-control">
            <label>Make and Model</label>
            <input type='text' placeholder='e.g. "Tesla Model Y"' value={model} 
            onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Range</label>
            <input type='text' placeholder='e.g. "300km"' value={range} 
            onChange={(e) => setRange(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Year Purchased</label>
            <input type='text' placeholder='e.g. "2022"' value={yearPurchased} 
            onChange={(e) => setYearPurchased(e.target.value)} />
        </div>

        <input type='submit' value='Add Vehicle' className="btn btn-block"/>
    </form>
  )
}

export default AddVehicle