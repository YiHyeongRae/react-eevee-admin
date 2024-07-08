export function openModal(id: string) {
  (document.getElementById(id) as HTMLFormElement).showModal();
}

export function closeModal(id: string) {
  const closeButton = (document.getElementById(id) as HTMLFormElement)
    .children[0].children[2].children[0] as HTMLButtonElement;
  closeButton.click();
}
