import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --bck: ${props => props.theme.bck};
        --frg: ${props => props.theme.frg};
        --frg2: ${props => props.theme.frg2};
        --txt: ${props => props.theme.txt};
        --txt2: ${props => props.theme.txt2};
        --acc: ${props => props.theme.acc};
        --acc2: ${props => props.theme.acc2};
    }
` 

export default GlobalStyle