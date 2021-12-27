import React from 'react'

import AppBar from '../components/AppBar'

function Layout(props) {
    return (
        <div>
            < AppBar />
            { props.children }
        </div>
    )
}

export default Layout
