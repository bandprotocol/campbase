import * as React from 'react'
import Styled from '~/styled-components'
import ColorButton from '~/components/ColorButton'
import { Color, Fonts, Size } from '~/utils'
import ScreenContainer from '~/components/ScreenContainer'
import WalletList from '~/components/WalletList'

const Wallets = Styled.View`
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 8;
  overflow: hidden;
`

export default ({ wallets, onWalletClick }) => (
  <ScreenContainer scrollable backgroundColor={Color.purple}>
    <Wallets>
      <WalletList
        list={wallets}
        onItemClick={address =>
          onWalletClick(wallets.find(w => w.address === address))
        }
      />
    </Wallets>
  </ScreenContainer>
)

const Container = Styled.View`
  flex: 1;
  background-color: ${Color.primary};
  align-items: center;
  justify-content: center;
  padding-top: ${Size.statusAndHeaderHeight};
`

const FetchingText = Styled.Text`
  font-family: ${Fonts.header};
  color: ${Color.white};
  font-size: 28;
`

export const Fetching = () => (
  <Container>
    <FetchingText>Loading Wallets</FetchingText>
  </Container>
)
