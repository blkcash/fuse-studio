import React, { useEffect } from 'react'
import { formatWei } from 'utils/format'
import { connect } from 'react-redux'
import { getAccount, getProviderInfo, getCommunitiesKeys } from 'selectors/accounts'
import MainnetLogo from 'images/Mainnet.svg'
import FuseLogo from 'images/fuseLogo.svg'
import { withNetwork } from 'containers/Web3'

const NativeBalance = ({
  account,
  providerInfo,
  communitiesKeys
}) => {
  useEffect(() => {
    const { analytics } = window
    if (account && account.accountAddress) {
      analytics.identify(account.accountAddress, {
        provider: providerInfo.name,
        communities: [...communitiesKeys]
      })
    } else {
      analytics.identify({
        subscriptionStatus: 'inactive'
      })
    }
  }, [account, communitiesKeys])

  return (
    <div className='profile__communities grid-y'>
      <span>My balance</span>
      <div className='profile__card grid-x cell align-middle'>
        <div className='profile__card__logo'>
          <img src={MainnetLogo} />
        </div>
        <div className='cell auto grid-y profile__card__content'>
          <h5 className='profile__card__title'>Ethereum Network</h5>
          <p className='profile__card__balance'>
            <span>Balance:&nbsp;</span>
            <span>{account && account.foreign ? formatWei((account.foreign), 2) : 0}&nbsp;</span>
            <span>ETH</span>
          </p>
        </div>
      </div>
      <div className='profile__card grid-x cell align-middle'>
        <div className='profile__card__logo'>
          <img src={FuseLogo} />
        </div>
        <div className='cell auto grid-y profile__card__content'>
          <h5 className='profile__card__title'>Fuse Network</h5>
          <p className='profile__card__balance'>
            <span>Balance:&nbsp;</span>
            <span>{account && account.home ? formatWei((account && account.home), 2) : 0}&nbsp;</span>
            <span>FUSE</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  account: getAccount(state),
  providerInfo: getProviderInfo(state),
  communitiesKeys: getCommunitiesKeys(state)
})

export default withNetwork(connect(mapState, null)(NativeBalance))
