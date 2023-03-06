import styled from "styled-components";

export const Input = styled.input`
    padding: 12px 14px;
    width: 100%;
    border: 1px solid #393939;
    border-radius: 0.5rem;
    outline: none;
    &:focus {
        border: 1px solid #a78bfa;
    }
`;

export const Submit = styled.button`
    padding: 12px;
    width: 100%;
    color: white;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;