
import Modal from "@/components/Modal";

export default async function NewTopicFormModal() {
  // TODO: Get a default starting note somehow
  return (
    <Modal
      openButtonText="Add A Note!"
      ariaOpenButtonLabel="Open Modal and add a note"
    >
      <div>
        <form method="dialog">
          <button>Submit!</button>
        </form>
      </div>
    </Modal>
  );
}