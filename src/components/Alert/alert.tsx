import React, { FC, useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import Transition from '../Transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title: string
  description?: string
  closable?: boolean
  type?: AlertType
  onClose?: () => void
}

export const Alert: FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false)
  const { title, description, closable, type, onClose } = props
  const classes = classNames('alert', {
    [`alert-type-${type}`]: type,
  })
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <span className="bold-title">{title}</span>
        {description && <p className="alert-desc">{description}</p>}
        {closable && (
          <span className="alert-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
}

export default Alert
