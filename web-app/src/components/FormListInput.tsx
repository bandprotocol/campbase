import Styled from 'styled-components'

const FormListInput = Styled.div`
  display: flex;
  flex-direction: column;
  > div > *:not(:first-child) {
    margin-top: 20px;
  }
`

export default FormListInput
