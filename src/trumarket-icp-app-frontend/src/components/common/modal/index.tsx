import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
interface TMModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  classOverrides?: string;
  fullScreen?: boolean;
  showCloseIcon?: boolean;
  showHeader?: boolean;
  headerText?: string;
}

const TMModal: React.FC<TMModalProps> = ({
  open,
  handleClose,
  children,
  classOverrides,
  fullScreen,
  headerText,
  showHeader = false,
  showCloseIcon = true,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      style={{ outline: 'none', zIndex: 999999999 }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2  rounded-[4px] bg-tm-white font-sans outline-none',
            classOverrides,
            fullScreen ? 'h-full w-[90vw]' : 'h-auto w-full max-w-[400px]'
          )}
        >
          <div className="relative">
            <div
              className={classNames({
                'fixed z-10  w-full border-b border-b-tm-black-20 bg-tm-white':
                  showHeader,
              })}
            >
              {showHeader && headerText ? (
                <p className="px-[30px] py-[20px] text-[18px] font-bold leading-[1.1em] text-tm-black-80">
                  {headerText}
                </p>
              ) : null}
              {showCloseIcon && (
                <div className="absolute right-[18px] top-[14px] z-[999]">
                  <div
                    onClick={handleClose}
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full text-tm-black-80 opacity-80 "
                  >
                    <CloseIcon />
                  </div>
                </div>
              )}
            </div>
            <div>{children}</div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TMModal;
