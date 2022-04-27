import styled from 'styled-components'

export const Label = styled.label`
    display: block;
    width: 100%;
    font-size: var(--fs-300);
    font-weight: 500;
    color: var(--txt2);
    text-transform: capitalize;
    margin-block-end: 1rem;

    > * {
        margin-block-start: 0.25rem;
    }

`;