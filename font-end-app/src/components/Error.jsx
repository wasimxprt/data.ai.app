import React from 'react'

const Error = ({ errorMessage }) => {
    return (
        <div className="alert alert-dismissible alert-danger">
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            <strong>Something went wrong!!</strong> {errorMessage}
        </div>
    )
}

export default Error
