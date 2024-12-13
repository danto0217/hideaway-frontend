import React from 'react'
import { ToastContainer } from 'hideaway-dex-uikit'
import useToast from 'hooks/useToast' // eslint-disable-line

const ToastListener = () => {
  const { toasts, remove } = useToast()

  const handleRemove = (id: string) => remove(id)

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener
