import React from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const StyledButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "3em",
        padding: "0 1.5em",
        borderRadius: "5em",
        background: "purple",
        color: "white",
    },
})(Button)

function customBtn() {
    return(
        <StyledButton>Hello World</StyledButton>
    )
}

export default customBtn