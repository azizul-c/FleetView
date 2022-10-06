import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {

  const onClick = () => {
    console.log ('Click')
  }

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color='green' text='Add Vehicle' onClick = {onClick} />
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

