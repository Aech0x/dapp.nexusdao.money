import React from "react"

interface TooltipProps {
  tooltipText: string
  children: React.ReactNode
}

const Tooltip = (props: TooltipProps) => {
  const { tooltipText, children } = props
  const tipRef = React.createRef<any>()

  return (
    <div className="relative flex justify-center">
      <div
        className="absolute whitespace-no-wrap bg-white dark:bg-slate-900 text-black dark:text-white px-2 py-0.5 rounded-md hidden items-center transition-all duration-150 border-2 dark:border-slate-900 bottom-[110%]"
        ref={tipRef}
      >
        {tooltipText}
      </div>
      <div
        onMouseEnter={() => {
          tipRef.current.style.display = "flex"
        }}
        onMouseLeave={() => {
          tipRef.current.style.display = "none"
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Tooltip
