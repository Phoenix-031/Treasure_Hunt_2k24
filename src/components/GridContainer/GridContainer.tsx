import React from 'react'
import styles from './style.module.scss'

const GridContainer = ({children}: {children : React.ReactNode}) => {
  return (
    <div className={styles.container}>
        {/* <div></div> */}
        {children}
    </div>
  )
}

export default GridContainer