import getConfig from 'next/config'

export const useConfig = () => {
  const { publicRuntimeConfig } = getConfig()

  return publicRuntimeConfig
}
