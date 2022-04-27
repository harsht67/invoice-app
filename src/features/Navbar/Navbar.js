// styles
import './Navbar.scss'

// icons
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function Navbar({theme, ...props}) {

    const toggleTheme = () => {
        props.toggleTheme()
    }

    return (
        <article className='navbar'>

            <div className='navbar__pacman'>

                <div className='pacman__icon'></div>
            
            </div>

            <section className='navbar__theme'>

                {theme=='dark'
                    ? <LightModeIcon
                        className="icon"
                        onClick={toggleTheme}
                    />
                    : <DarkModeIcon
                        className="icon"
                        onClick={toggleTheme}
                    />
                }


            </section>

            <section className='navbar__profile'>

                <AccountCircleIcon/>

            </section>
        
        </article>
    )
}

export default Navbar