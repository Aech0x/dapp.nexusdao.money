import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Menu, Switch, Transition } from "@headlessui/react"
import { ChevronDownIcon, MenuAlt1Icon } from "@heroicons/react/outline"
import { addToken } from "../helpers/metamask"
import { addresses } from "../constants/network"
import { switchNetwork } from "../helpers/metamask"
import { RootState } from "../store"
import { setSidebarState } from "../slices/app"
import { useTheme } from "next-themes"

function Topbar() {
  const dispatch = useDispatch()
  const { connected, isValidNetwork } = useSelector(
    (state: RootState) => state.web3
  )
  useEffect(() => {
    dispatch({ type: "web3/autoConnect" })
    dispatch({ type: "presale/getGlobalPresaleData" })
    dispatch({ type: "nodes/getGlobalNodeData" })
  }, [dispatch])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const { theme, setTheme } = useTheme()
  const [enabled, setEnabled] = useState(theme === "dark" ? true : false)

  useEffect(() => {
    setTheme(enabled ? "dark" : "light")
  }, [enabled])

  useEffect(() => {
    setEnabled(theme === "dark" ? true : false)
  }, [theme])

  return (
    <div className="flex justify-between py-8">
      <button
        role="button"
        title="Open sidebar"
        className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-800 lg:invisible"
        onClick={() => {
          dispatch(setSidebarState(true))
        }}
      >
        <MenuAlt1Icon className="h-6 w-6" />
      </button>

      <div className="flex gap-x-4 items-center">
        {mounted && (
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex items-center h-6 rounded-full w-11 group`}
          >
            <span className="sr-only">Enable dark mode</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        )}
        <Menu as="div" className="relative text-left hidden md:inline-block">
          <Menu.Button className="flex items-center px-3 py-2 text-lg font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">
            <span>NXS</span>
            <ChevronDownIcon className="w-5 h-5 ml-2" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  <button
                    className="px-2 py-2 text-md rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 w-full text-center"
                    onClick={() => {
                      window.open(
                        `https://traderjoexyz.com/home#/trade?outputCurrency=${addresses.NEXUS_ERC20}`,
                        "_blank"
                      )
                    }}
                  >
                    Buy on TraderJoe
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="px-2 py-2 text-md rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 w-full text-center"
                    onClick={() => {
                      addToken(
                        addresses.NEXUS_ERC20,
                        "NXS",
                        18,
                        "https://nexusdao.money/logo512.png"
                      )
                    }}
                  >
                    Add to MetaMask
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <button
          className={`px-3 py-2 rounded-lg ${
            isValidNetwork
              ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
              : "bg-red-600 hover:bg-red-700 text-white"
          } font-semibold text-lg`}
          onClick={
            connected
              ? isValidNetwork
                ? () => {
                    dispatch({ type: "web3/disconnect" })
                  }
                : switchNetwork
              : () => {
                  dispatch({ type: "web3/connect" })
                }
          }
        >
          {connected
            ? isValidNetwork
              ? "Disconnect Wallet"
              : "Switch to Avalanche"
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  )
}

export default Topbar
