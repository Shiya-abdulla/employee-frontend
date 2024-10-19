import { useState } from 'react'
import './App.css'
import Employee from './components/Employee'
import Get from './components/Get'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Employee/>
    <Get/>
    <ToastContainer />
    </>
  )
}

export default App
