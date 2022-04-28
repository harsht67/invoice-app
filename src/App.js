// styles
import './App.scss'

// components
import Navbar from './features/Navbar/Navbar'
import Home from './features/Home/Home'
import InvoicePage from './features/InvoicePage/InvoicePage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import { useState } from 'react'
import themes from './themes'

function App() {

  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    theme == 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <div className="app">

      <Router>

        <GlobalStyle theme={themes[theme]} />

        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Routes>

          <Route path='/' element={<Home/>} />

          <Route path='/invoice/:id' element={<InvoicePage/>} />

        </Routes>

      </Router>

    </div>
  )
}

export default App
