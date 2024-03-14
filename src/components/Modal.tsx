"use client";
import { useRef } from "react";

type ModalPropsType = {
  children: React.ReactNode;
  openButtonText?: string;
  ariaOpenButtonLabel?: string;
}

export default function Modal({
  children,
  openButtonText = "Open Modal",
  ariaOpenButtonLabel = "Open Modal",
}: ModalPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    if (!dialogRef?.current) return;
    dialogRef.current.showModal();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!dialogRef?.current) return;

    const targetElement = e.target as HTMLElement;
    const { top, height, left, width } = targetElement.getBoundingClientRect();
    const { clientX: x, clientY: y } = e;

    // https://github.com/facebook/react/issues/7407
    const isRadioButtonKeyboardEvent = x === 0 && y === 0;
    if (isRadioButtonKeyboardEvent) return;

    const clickedOutsideOfModal = (
      x <= left || x >= left + width ||
      y <= top || y >= top + height
    );

    if (clickedOutsideOfModal) dialogRef.current.close();
  }

  return <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleOpenModal}
      aria-label={ariaOpenButtonLabel}
      title={ariaOpenButtonLabel}
    >
      {openButtonText}
    </button>
    <dialog ref={dialogRef} onClick={handleClick}>
      <form aria-label={`Close modal`} method="dialog"><button>X</button></form>
      {children}
    </dialog>
  </>
}