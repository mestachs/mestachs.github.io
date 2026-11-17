import { useEffect, useState } from 'react'
import App from './App.jsx'
import Cv from './Cv.jsx'

export default function Router() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash === '#/cv' ? <Cv /> : <App />
}
