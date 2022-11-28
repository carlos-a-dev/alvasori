import { getApp } from 'src/composables/firebase/use-firebase'
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config'

export * from 'firebase/remote-config'
export { isAppInitialized } from 'src/composables/firebase/use-firebase'

const remoteConfigList = new Map<string, RemoteConfig>()

export function getRc (appName = '[DEFAULT]'): RemoteConfig {
  const remoteConfig = remoteConfigList.get(appName) ?? getRemoteConfig(getApp(appName))

  if (!remoteConfigList.has(appName)) {
    if (process.env.DEV) { // Update more frequently in dev mode
      remoteConfig.settings.minimumFetchIntervalMillis = (1000 * 60 * 5) // 5 minutes
    }

    remoteConfigList.set(appName, remoteConfig)
  }

  return remoteConfig
}
