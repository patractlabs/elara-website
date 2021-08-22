import { Tooltip, TooltipProps } from 'antd'
import { FC } from 'react'

const StyledTooltip: FC<{ title: string } & TooltipProps> = ({
  children,
  title,
  ...rest
}) => {
  return (
    <Tooltip
      placement="top"
      title={title}
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
      {children}
    </Tooltip>
  )
}

export default StyledTooltip
