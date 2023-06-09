import React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Portal from "components/templates/Portal"
import classNames from "classnames"

const overlayVariants: Variants = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
}

const modalVariants: Variants = {
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

function Modal(props: {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onCloseRequest: () => void
}) {
  const { children, isOpen, onCloseRequest, className } = props

  return (
    <Portal containerId="modals-portal">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            animate="enter"
            exit="exit"
            initial="exit"
            className="fixed inset-0 grid place-items-center overflow-auto bg-slate-900/50 p-6"
            onClick={onCloseRequest}
          >
            <motion.div
              variants={modalVariants}
              className={classNames(
                "flex flex-col bg-slate-800 text-slate-100 shadow-lg",
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

export default Modal
