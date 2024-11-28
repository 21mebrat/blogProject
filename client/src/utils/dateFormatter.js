import React from 'react'

const dateFormatter = (StringDate) => {
    const date = new Date(StringDate)

    return date.toLocaleDateString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}

export default dateFormatter
