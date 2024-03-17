"use client";
import { useId, useRef } from "react";

type ModalPropsType = {
  openButtonText?: string;
  ariaOpenButtonLabel?: string;
}

const didClickOutsideOfModal = (e: React.MouseEvent) => {
  const targetElement = e.target as HTMLElement;
  const { clientX: x, clientY: y } = e;

  // https://github.com/facebook/react/issues/7407
  const isRadioButtonKeyboardEvent = x === 0 && y === 0;
  if (isRadioButtonKeyboardEvent) return false;

  const { top, height, left, width } = targetElement.getBoundingClientRect();
  return (
    x <= left || x >= left + width ||
    y <= top || y >= top + height
  );
}

export default function TopicModalForm({
  openButtonText = "Open Modal",
  ariaOpenButtonLabel = "Open Modal",
}: ModalPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const topicId = useId();
  const descriptionId = useId();

  const handleOpenModal = () => {
    if (!dialogRef?.current) return;
    dialogRef.current.showModal();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (!dialogRef?.current || e.target instanceof HTMLDialogElement) return;
    if (didClickOutsideOfModal(e)) dialogRef.current.close();
  }

  const handleCancel = () => dialogRef?.current?.close();

  const handleSubmit = (e: React.FormEvent) => {
    console.log('Hi submit:');
  }

  return <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleOpenModal}
      aria-label={ariaOpenButtonLabel}
      title={ariaOpenButtonLabel}
    >
      {openButtonText}
    </button>
    <dialog ref={dialogRef} onClick={handleModalClick}>
      <form aria-label={`Close modal`} method="dialog"><button>X</button></form>
      <form method="dialog" onSubmit={handleSubmit}>
        <div>
          <label htmlFor={topicId}>Topic</label>
          <input id={topicId} type="text" className="border-2" />
        </div>
        <div>
          <label htmlFor={descriptionId}> Description:</label>
          <input id={descriptionId} type="text" className="border-2" />
        </div>
        <div>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit!</button>
        </div>
      </form>
    </dialog>
  </>
}