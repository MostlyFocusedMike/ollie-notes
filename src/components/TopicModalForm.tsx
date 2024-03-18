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
  openButtonText = "Add New Topic",
  ariaOpenButtonLabel = "Open 'add topic' form",
}: ModalPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const topicId = useId();
  const descriptionId = useId();

  const handleOpenModal = () => dialogRef?.current?.showModal()

  const handleCancelModal = () => dialogRef?.current?.close();

  const handleBackdropClickCheck = (e: React.MouseEvent) => {
    if (didClickOutsideOfModal(e)) dialogRef?.current?.close();
  }

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
    <dialog ref={dialogRef} onClick={handleBackdropClickCheck}>
      <form className="absolute right-1" aria-label={`Close modal`} method="dialog"><button>X</button></form>
      <form method="dialog" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 back">Add New Topic</h2>
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
            onClick={handleCancelModal}
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