import React from 'react'
import slide from '../../img/cover-image.png'
import styles from './Figure.module.css'

export const Figure = () => (
    <div className={styles.figure}>
        <img alt="App" src={slide} loading="lazy" />
    </div>
)
