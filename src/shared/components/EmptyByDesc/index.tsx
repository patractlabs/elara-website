import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import LogoSvg from '../../../assets/logo.svg'

import './index.css'

const EmptyByDesc: FC<{ CreateBtn: ReactNode }> = (props) => {
  const { CreateBtn } = props
  const { t } = useTranslation()
  return (
    <>
      <div className="empty-desc-container">
        <img src={LogoSvg} alt="" />
        <p className="para">{t('tip.EmptyConclusion')}</p>
      </div>
      <div className="empty-usage-container">
        <h2>{t('tip.EmptyUsageTitle')}</h2>
        <ul>
          <li className="para">{t('tip.EmptyParagraph1')}</li>
          <li className="para">{CreateBtn}</li>
          <li className="para">{t('tip.EmptyParagraph2')}</li>
          <li className="para">{t('tip.EmptyParagraph3')}</li>
          <li className="para">{t('tip.EmptyParagraph4')}</li>
          <li className="para">{t('tip.EmptyParagraph5')}</li>
        </ul>
      </div>
    </>
  )
}

export default EmptyByDesc
