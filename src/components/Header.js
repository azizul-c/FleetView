import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add Vehicle'} onClick = {onAdd} />
    </header>
  )
}

// Not using these, but helpful for referencing later
Header.defaultProps = {
    title: 'FleetView',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// You can do in-line CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black', // it's camelCase
// }

export default Header

