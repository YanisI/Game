import React from 'react'

const ShowNotification = ({showNotification, errMessage}) => {
  return (
    <div className={showNotification ? "show notification-container" : "notification-container"}>
        {errMessage}
    </div>
  )
}

export default ShowNotification