import React from 'react';
import styled from 'styled-components';

export const ProgressBar : React.FC<{progress : number}> = ({progress}) => {
    return <Bar>
        <Progress progress={progress}/>
    </Bar>
}

const Bar = styled.div`
    display: flex;
    flex-direction: row;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`

const Progress = styled.div<{readonly progress : number}>`
    width: ${({progress}) => progress}%;
    display: ${({progress}) => progress === 0 ? 'none' : 'block'};
    height: 1px;
    background-color: grey;
    transition: width 4s ease-in-out;
`