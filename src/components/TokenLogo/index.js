import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlaceHolder from '../../assets/placeholder.png'
import { useListedTokens } from '../../contexts/Application';
import { isAddress } from '../../utils'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.bg1};
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  const tokens = useListedTokens();
  const path = tokens?.full?.find(i => i.address === address)?.logoURI
    || `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/poa/assets/${isAddress(address)}/logo.png`;

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <Image {...rest} alt={''} src={PlaceHolder} size={size} />
      </Inline>
    )
  }

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path || PlaceHolder}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
