import React, { useState, useRef, useEffect, useImperativeHandle } from 'react'
import Tooltip from '../../../shared/components/Tooltip'
import TooltipIcon from '../../../assets/tooltip.svg'
import EditIcon from '../../../assets/edit-icon.svg'
import ConfirmIcon from '../../../assets/confirm-icon.svg'

export type IRefReturnType = { readonly value: string }

interface ISettingField {
  label: string
  defaultValue: string
  placeholder?: string
  tooltip?: string
  type?: 'number'
  handleConfirm: () => Promise<any>
}

const SettingField: React.ForwardRefRenderFunction<unknown, ISettingField> = (
  props,
  ref
) => {
  const { label, defaultValue, tooltip, type, placeholder, handleConfirm } =
    props
  const [editable, setEditable] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [value, setValue] = useState(defaultValue)
  const canSubmit = useRef(true)
  const intRef = useRef<HTMLInputElement>(null!)
  useImperativeHandle<unknown, IRefReturnType>(ref, () => ({ value: value }), [
    value,
  ])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const onHandleConfirm = () => {
    if (!canSubmit.current) return
    canSubmit.current = false
    handleConfirm()
      .then((errMsg) => {
        if (!errMsg) {
          setEditable(false)
        }
        setErrorMsg(errMsg)
      })
      .finally(() => {
        canSubmit.current = true
      })
  }

  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="form-item">
        <input
          type="text"
          className={`${editable ? 'editable' : ''} ${
            errorMsg && value ? 'error' : ''
          }`}
          placeholder={placeholder}
          value={value}
          readOnly={!editable}
          ref={intRef}
          onChange={(e) => {
            if (type === 'number' && isNaN(Number(e.target.value))) {
              return
            } else {
              setErrorMsg('')
              setValue(e.target.value)
            }
          }}
          onBlur={() => {
            setValue(defaultValue)
            setEditable(false)
          }}
        />
        {errorMsg && <div className="error-text">{errorMsg}</div>}
        <div className="icon-group">
          {tooltip && (
            <Tooltip title={tooltip}>
              <img src={TooltipIcon} alt="info" />
            </Tooltip>
          )}
          {editable && !errorMsg && (
            <img
              src={ConfirmIcon}
              className="icon"
              alt="ok"
              onMouseDown={(e) => {
                e.stopPropagation()
                onHandleConfirm()
              }}
            />
          )}
          {!editable && (
            <img
              src={EditIcon}
              className="icon"
              alt="edit"
              onClick={(e) => {
                e.stopPropagation()
                intRef.current?.focus()
                setEditable(true)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(SettingField)
