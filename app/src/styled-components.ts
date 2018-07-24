/**
 * Wrapper for styled-components
 */

import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components/typings/styled-components.d'

interface ThemeInterface {
  primaryColor: string
  primaryColorInverted: string
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export { css, injectGlobal, keyframes, ThemeProvider }
export default styled
