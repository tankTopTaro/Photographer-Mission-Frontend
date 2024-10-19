import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const SpinnerComponent = () => {
  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-2" style={{zIndex: 9999}}>
        <TailSpin
            visible={true}
            height="30"
            width="30"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
        />
    </div>
  )
}

export default SpinnerComponent
