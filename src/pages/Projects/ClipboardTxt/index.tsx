import { FC, useState } from 'react'
import Tooltip from '../../../shared/components/Tooltip'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'

const ClipboardTxt: FC<{ label: string; txt: string }> = (props) => {
  const { txt, label } = props
  const [tooltipTxt, setTooltipTxt] = useState<'tip.copy' | 'tip.copied'>(
    'tip.copy'
  )
  const { t } = useTranslation()
  return (
    <div className="api-info">
      <div className="title">{label}</div>
      <div
        className="value"
        onClick={() => {
          copy(txt)
          setTooltipTxt('tip.copied')
        }}
        onMouseOut={() => {
          setTimeout(() => {
            setTooltipTxt('tip.copy')
          }, 200)
        }}
      >
        <Tooltip title={t(tooltipTxt)}>
          {txt}
        </Tooltip>
      </div>
    </div>
  )
}

export default ClipboardTxt
