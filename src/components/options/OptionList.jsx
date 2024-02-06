import React from 'react'
import Option from './Option'
export default function OptionList({ param }) {
    const SelectIt = () => {
        console.log('test')
    }
    return(
        <>
            <Option onClick={SelectIt} option="neolith"/>
            <Option onClick={SelectIt} option="dekton"/>
        </>
    )
}
