'use client'

import { FieldDescription, FieldError, FieldLabel, fieldBaseClass, useField } from '@payloadcms/ui'
import type { NumberFieldClientComponent } from 'payload'
import React, { useCallback } from 'react'

export const ImageScaleField: NumberFieldClientComponent = (props) => {
  const {
    field: {
      admin: { className, description } = {},
      label,
      max = 200,
      min = 25,
      required,
    },
    path: pathFromProps,
  } = props

  const step = 5

  const { path, setValue, showError, value } = useField<number>({
    potentiallyStalePath: pathFromProps,
  })

  const currentValue = typeof value === 'number' ? value : 100

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value))
    },
    [setValue],
  )

  return (
    <div className={[fieldBaseClass, className].filter(Boolean).join(' ')}>
      <FieldLabel label={label} path={path} required={required} />
      <div className={`${fieldBaseClass}__wrap`}>
        <FieldError path={path} showError={showError} />
        <div style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
          <input
            id={`field-${path.replace(/\./g, '__')}`}
            max={max}
            min={min}
            name={path}
            onChange={handleChange}
            step={step}
            style={{ flex: 1 }}
            type="range"
            value={currentValue}
          />
          <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '4ch', textAlign: 'right' }}>
            {currentValue}%
          </span>
        </div>
      </div>
      <FieldDescription description={description} path={path} />
    </div>
  )
}
