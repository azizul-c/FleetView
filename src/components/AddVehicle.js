const AddVehicle = () => {
  return (
    <form className="add-form">
        <div className="form-control">
            <label>Vehicle</label>
            <input type='text' placeholder='Vehicle make and model' />
        </div>
        <div className="form-control">
            <label>Range</label>
            <input type='text' placeholder='Range in kilometres' />
        </div>
        <div className="form-control">
            <label>Year Purchased</label>
            <input type='text' placeholder='Add year of purchase' />
        </div>

        <input type='submit' value='Save Vehicle' className="btn btn-block"/>
    </form>
  )
}

export default AddVehicle