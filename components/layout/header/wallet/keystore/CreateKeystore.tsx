import PopupModal from '@/components/common/PopupModal'
import { encrypt } from '@/services/keystore/connect'
import { FC, useMemo, useState } from 'react'

interface Props {
  closeKeystoreMenuModal: () => void
  toggleKeystoreMenu: () => void
  toggleConnectKeystoreModal: () => void
}

const CreateKeystore: FC<Props> = ({
  closeKeystoreMenuModal,
  toggleKeystoreMenu,
  toggleConnectKeystoreModal,
}) => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const canCreate = useMemo(() => {
    if (
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    )
      return true
    return false
  }, [confirmPassword, password])

  const create = async () => {
    if (!canCreate) return

    const keystore = await encrypt(password)
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(keystore)
    )}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = 'lends-keystore.txt'
    link.click()
  }

  return (
    <PopupModal
      title={'Create a Keystore'}
      size={'medium'}
      onClose={closeKeystoreMenuModal}
    >
      <div className="flex flex-col gap-4">
        <input
          className="flex items-center p-4 h-14 w-full bg-transparent border hover:border-borderSelected border-borderUnselected rounded-20 focus:outline-none focus:border-borderSelected"
          type="password"
          placeholder="Input Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <input
          className="flex items-center p-4 h-14 w-full bg-transparent border hover:border-borderSelected border-borderUnselected rounded-20 focus:outline-none focus:border-borderSelected"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
      </div>
      <button
        className={`flex items-center justify-center font-bold text-gray3 h-14 rounded-20 bg-smoothgreen ${
          !canCreate && 'opacity-25 cursor-default'
        } transition-opacity duration-300`}
        onClick={create}
      >
        Create
      </button>
      <div className="flex w-full gap-2 justify-center">
        <p>Already got a Keystore?</p>
        <button
          className="text-softgreen underline"
          onClick={toggleConnectKeystoreModal}
        >
          Connect Wallet
        </button>
      </div>
    </PopupModal>
  )
}

export default CreateKeystore
