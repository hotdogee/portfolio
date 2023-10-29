'use client'
import DarkModeToggle from '@/components/DarkModeToggle'
import LocaleSelect from '@/components/LocaleSelect'
import { DictionaryContext } from '@/context/i18n.context'
import useLocalStorageState from '@/hooks/useLocalStorageState'
import { Locale } from '@/i18n'
import kofi from '@/images/kofi.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const t = useContext(DictionaryContext)

  // const header_height = 52
  // const menu_height = 48
  // const footer_height = 40
  // const fixed_height = header_height + menu_height + footer_height
  // const half_fixed_height = fixed_height / 2
  return (
    <>
      <div
        className={`wide:grid-cols-[1fr_1fr] wide:grid-rows-[52px_fit-content(50vw)_minmax(48px,_1fr)_40px] grid h-screen grid-rows-[52px_1fr_48px_1fr_40px]`}
      >
        <header className="wide:col-span-2 mx-2 flex items-center justify-between">
          <a
            href="https://cubes.hanl.in/"
            className="flex items-center justify-items-start"
          >
            <Image
              src="/icons/android-chrome-512x512.png"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="h-10"
            />
            <h1 className="ml-2 text-base leading-tight sm:text-2xl md:text-3xl">
              {t['Han Lin']}
            </h1>
          </a>
          <menu className="flex items-center justify-items-end space-x-2">
            <DarkModeToggle />
            <LocaleSelect />
          </menu>
        </header>
        <main className="wide:max-h-[calc(100vh-140px)] relative flex min-h-0 justify-center bg-gray-200 dark:bg-gray-600"></main>
        <main className="wide:order-3 wide:max-h-[calc(100vh-140px)] z-10 order-4 flex min-h-0 items-center justify-center bg-gray-200 dark:bg-gray-600"></main>
        <menu className="wide:order-4 wide:col-span-2 order-3 flex items-center justify-center"></menu>
        <footer className="wide:col-span-2 order-5 mx-4 flex flex-row items-center justify-between text-gray-600 transition-colors dark:text-gray-400">
          <div className="flex space-x-1 text-sm">
            {/* <div>{`© ${new Date().getFullYear()}`}</div> */}
            <div>{`Created by`}</div>
            <a
              href="https://ko-fi.com/hanlin"
              className="hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
            >
              Han Lin
            </a>
          </div>
          <Link href="https://ko-fi.com/hanlin">
            <Image src={kofi} alt={t['Buy me a coffee']} height={30} className="flex-0" />
          </Link>
          <div className="flex flex-row space-x-3">
            <div className="">
              <a href="https://github.com/hotdogee/origami-moving-cubes-drawing-designer">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>GitHub icon</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
            <div className="">
              <a href="mailto:hotdogee@gmail.com">
                <svg
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>Mail icon</title>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
            <div className="">
              <a href="https://x.com/hotdogee">
                <svg
                  role="img"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>X icon</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="">
              <a href="https://www.linkedin.com/in/hotdogee/">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>LinkedIn icon</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
