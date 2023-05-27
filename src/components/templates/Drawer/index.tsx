import React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Portal from "components/templates/Portal"
import classNames from "classnames"

const overlayVariants: Variants = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      when: "afterChildren",
    },
  },
}

const drawerVariants: Variants = {
  enter: (side: DrawerSide) => ({
    x: side === "left" ? "0%" : "0%",
    transition: {
      duration: 0.3,
    },
  }),
  exit: (side: DrawerSide) => ({
    x: side === "left" ? "-100%" : "100%",
    transition: {
      duration: 0.3,
    },
  }),
}

type DrawerSide = "left" | "right"

function Drawer(props: {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onCloseRequest: () => void
  side: DrawerSide
}) {
  const { children, isOpen, onCloseRequest, className, side } = props

  return (
    <Portal containerId="drawers-portal">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            animate="enter"
            exit="exit"
            initial="exit"
            className="fixed inset-0 overflow-hidden bg-slate-900/20"
            onClick={onCloseRequest}
          >
            <motion.div
              variants={drawerVariants}
              style={{[side]: 0}}
              custom={side}
              className={classNames(
                "absolute flex flex-col bg-slate-800 text-slate-100 top-0 bottom-0 shadow-lg",
                className
              )}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default Drawer
