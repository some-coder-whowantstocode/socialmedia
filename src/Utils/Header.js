import React from 'react'
export const Header=()=> {
    return {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('sstoken')
    }
}

