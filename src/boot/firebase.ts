import { boot } from 'quasar/wrappers'
import { initializeFirebase } from 'src/composables/firebase/use-firebase'

export default boot(() => {
  initializeFirebase()
})
