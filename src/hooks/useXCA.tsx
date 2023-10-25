"use client"

import Web3 from "web3"
import { ABI, CHAIN_ID, CONTRACT_ADDRESS, HTTP_PROVIDER } from "@/constant"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import MetaMaskSDK from "@metamask/sdk"
import { revokeDao, validateDao } from "@/utils/api"

const web3 = new Web3(process.env.NEXT_PUBLIC_HTTP_PROVIDER || HTTP_PROVIDER)
new MetaMaskSDK({
  dappMetadata: {
    name: "XCA",
    url: ""
  },
  useDeeplink: false,
  extensionOnly: false
})

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || CONTRACT_ADDRESS
const defaultChainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || CHAIN_ID

const contract = new web3.eth.Contract(ABI, contractAddress)

type XCAContextType = {
  address: string | null
  connectMetamask: () => Promise<void>
  disconnectMetamask: () => Promise<void>
  setChainIfIncorrect: () => Promise<void>
  mint: (
    toAddr: string,
    tokenUri: string,
    onSuccess: () => void,
    onError: () => void
  ) => Promise<any>
  burn: (
    toAddr: string,
    tokenId: number,
    onSuccess: () => void,
    onError: () => void
  ) => Promise<any>
}

export const XCAContext = createContext<XCAContextType>({
  address: null,
  connectMetamask: async () => {},
  disconnectMetamask: async () => {},
  setChainIfIncorrect: async () => {},
  mint: async () => {},
  burn: async () => {}
})

export function XCAProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)

  const setDefaultAddress = useCallback(async () => {
    await setChainIfIncorrect()

    if (window.ethereum) {
      await window.ethereum
        .request({
          method: "eth_accounts",
          params: []
        })
        .then((res) => {
          const connectedAddress = res ? res[0 as keyof typeof res] : null

          if (connectedAddress) {
            setAddress(Web3.utils.toChecksumAddress(connectedAddress))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    setDefaultAddress()
  }, [setDefaultAddress])

  const connectMetamask = async () => {
    await setChainIfIncorrect()

    if (!address && window.ethereum) {
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
          params: []
        })
        .then((res) => {
          const connectedAddress = res ? res[0 as keyof typeof res] : null

          if (connectedAddress) {
            setAddress(Web3.utils.toChecksumAddress(connectedAddress))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const disconnectMetamask = async () => {
    // TODO: Find a way to disconnect using webjs or show a message on how to disconnect using extension
    setAddress(null)
  }

  const setChainIfIncorrect = async () => {
    if (window.ethereum) {
      await window.ethereum
        .request({
          method: "eth_chainId",
          params: []
        })
        .then((res) => {
          const connectedChainId = res

          if (window.ethereum && connectedChainId !== defaultChainId) {
            window.ethereum
              .request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: defaultChainId }]
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const waitForTransactionReceipt = async (txHash: string, callback: () => Promise<void>) => {
    const interval = setInterval(async () => {
      web3.eth
        .getTransactionReceipt(txHash)
        .then((res) => {
          if (res) {
            console.log("Got receipt")
            console.log(res)

            if (res.status) {
              callback()
              console.log("Minted")
            } else {
              console.log("Failed")
            }

            clearInterval(interval)
          }
        })
        .catch(() => {
          // ignore transaction pending error only
        })
    }, 1000)
  }

  const mint = async (
    toAddr: string,
    tokenUri: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    const params = [
      {
        to: contractAddress,
        from: address,
        data: contract.methods.safeMint(toAddr, tokenUri).encodeABI()
      }
    ]

    await setChainIfIncorrect()

    if (window.ethereum) {
      return window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: params
        })
        .then(async (opHash) => {
          setTimeout(() => {
            waitForTransactionReceipt(opHash as string, async () =>
              validateDao(toAddr, {
                validate: true,
                opHash: opHash as string
              }).then(() => {
                onSuccess()
              })
            )
          }, 5000)

          return opHash
        })
        .catch((err) => {
          console.log(err)
          onError()
        })
    }
  }

  const burn = async (
    toAddr: string,
    tokenId: number,
    onSuccess: () => void,
    onError: () => void
  ) => {
    const params = [
      {
        to: contractAddress,
        from: address,
        data: contract.methods.burn(tokenId).encodeABI()
      }
    ]

    await setChainIfIncorrect()

    if (window.ethereum) {
      return window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: params
        })
        .then(async (opHash) => {
          setTimeout(() => {
            waitForTransactionReceipt(opHash as string, () =>
              revokeDao(toAddr, {
                opHash: opHash as string
              })
            ).then(() => {
              onSuccess()
            })
          }, 5000)

          return opHash
        })
        .catch((err) => {
          console.log(err)
          onError()
        })
    }
  }

  return (
    <XCAContext.Provider
      value={{
        address,
        connectMetamask,
        disconnectMetamask,
        setChainIfIncorrect,
        mint,
        burn
      }}
    >
      {children}
    </XCAContext.Provider>
  )
}

export default function useXCA() {
  const context = useContext(XCAContext)

  return context
}
