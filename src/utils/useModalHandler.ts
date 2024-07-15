export function openModal(id: string) {
  (document.getElementById(id) as HTMLFormElement).showModal();
}

export function closeModal(id: string) {
  const closeButton = document.getElementById(
    `${id}-close-btn`
  ) as HTMLFormElement;
  closeButton.click();
}
