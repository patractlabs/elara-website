import { Dispatch, FC, useState, useContext } from 'react'
import { message, Modal, Select } from 'antd'
import { apiCreateProject } from '../../../core/data/api'
import { useTranslation } from 'react-i18next'
import { DashboardContext } from '../../../core/context/dashboard-context'
import { useApi } from '../../../core/hooks/useApi'
import closeImg from './images/close.svg'
import ExpandIcon from './images/expand.svg'
import { subMenuMap, chainIconMap } from '../../../core/types/classes/chain'

const { Option, OptGroup } = Select
const CreateProjectModal: FC<{
  chain?: string
  visible: boolean
  setVisible: Dispatch<boolean>
  closeCallBack?: () => void
}> = ({ visible = false, chain, setVisible, closeCallBack }) => {

  const [selectedTeam, onSelectTeam] = useState<string>('')
  const [selectedChain, onSelectChain] = useState<string>('')
  const [isValidProjectName, setIsValid] = useState<boolean>(true)
  const [projectName, setProjectName] = useState('')
  const { t } = useTranslation()
  const { user } = useApi()
  const { chains, updateMenu } = useContext(DashboardContext)

  const _generateTeamsList = () => {
    let setHelp: Set<unknown> = new Set()
    let list: string[] = []
    for (let type in chains) {
      chains[type].forEach((info) => {
        if (!setHelp.has(info.team)) {
          list.push(info.team)
        }
        setHelp.add(info.team)
      })
    }
    return list
  }

  const _generateTeamOfChain = (chain?:string) => {
    for (let type in chains) {
      for (let i = 0; i < chains[type].length; i++) {
        if (chains[type][i].name === chain) {
          return chains[type][i].team
        }
      }
    }
    return ''
  }

  const _createProject = () => {
    apiCreateProject({
      userId: user.id,
      chain: chain || selectedChain,
      team: _generateTeamOfChain(chain) || selectedTeam,
      name: projectName,
    })
      .then(() => {
        message.success(t('tip.created'))
        updateMenu()
        closeCallBack && closeCallBack()
      })
      .catch((res) => {
        message.error(t(res.msg))
        console.log(res)
      })
    setVisible(false)
  }

  const _onInputChange = (name: string) => {
    setProjectName(name)
    _checkProjectName(name)
  }

  const _checkProjectName = (name: string) => {
    let reg = /[a-zA-Z]{4,32}/
    setIsValid(reg.test(name))
  }

  return (
    <>
      <Modal
        title={
          chain
            ? `${t('Create')} ${chain} ${t('Project')}`
            : t('listPage.Create Project')
        }
        closeIcon={<img src={closeImg} alt="close" />}
        centered
        visible={visible}
        okText={t('modal.create')}
        cancelText={t('modal.cancel')}
        onOk={_createProject}
        onCancel={() => setVisible(false)}
        width={480}
        wrapClassName="create-porject"
      >
        <div className="modal-body-row">
          <div className="modal-body-field modal-body-field-single">
            <span className="title">{t('summary.projectName')}</span>
            <input
              type="text"
              className={`name ${
                !isValidProjectName && !!projectName && 'error'
              }`}
              onChange={(e) => _onInputChange(e.target.value)}
              onBlur={(e) => _checkProjectName(e.target.value)}
            />
          </div>
        </div>
        {!chain && (
          <div className="modal-body-row">
            <div className="modal-body-field">
              <span className="title">{t('summary.Team')}</span>
              <Select
                defaultValue=""
                showSearch
                style={{ width: 200 }}
                optionFilterProp="label"
                suffixIcon={<img src={ExpandIcon} alt="expand" />}
                onChange={(v) => {
                  onSelectTeam(v)
                }}
              >
                {_generateTeamsList().map((team) => (
                  <Option value={team} key={team}>
                    {team}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="modal-body-field">
              <span className="title">{t('summary.Network')}</span>
              <Select
                defaultValue=""
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                suffixIcon={<img src={ExpandIcon} alt="expand" />}
                onChange={(v) => {
                  onSelectChain(v)
                }}
              >
                {Object.keys(chains).map((type) => (
                  <OptGroup
                    label={t(subMenuMap[type as keyof typeof subMenuMap].title)}
                    key={type}
                  >
                    {chains[type].map((proInfo) => (
                      <Option value={proInfo.name} key={proInfo.name}>
                        <div className="cus-option">
                          <img src={chainIconMap[proInfo.name]} alt="icon" />
                          {proInfo.name}
                        </div>
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default CreateProjectModal
