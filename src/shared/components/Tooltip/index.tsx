import { Tooltip, TooltipProps } from 'antd'
import { FC } from 'react'

import './index.css'

const StyledTooltip: FC<{ title: string } & TooltipProps> = ({
  children,
  title,
  ...rest
}) => {
  return (
    <Tooltip
      placement="top"
      title={title}
      className="tooltip-body"
      overlayInnerStyle={{
        height: '28px',
        lineHeight: '16px',
        borderRadius: '5px',
        background: '#000000',
        fontSize: '12px',
        width: 'max-content',
        minWidth: 'auto',
        minHeight: 'auto',
      }}
      {...rest}
    >
      <span className="tooltip-content">{children}</span>
    </Tooltip>
  )
}

export default StyledTooltip
