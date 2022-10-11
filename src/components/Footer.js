import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  return (
    <footer>
      {location.pathname === '/' && (
        <>
          <p>Created by Azizul Chowdhury</p>
          <Link to="/about">About</Link>
        </>
      )}

    </footer>
  )
}

export default Footer