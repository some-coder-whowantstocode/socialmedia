import React from 'react'
function Header() {
    return {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('sstoken')
    }
}

export default Header
