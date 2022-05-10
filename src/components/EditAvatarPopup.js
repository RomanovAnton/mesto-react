import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarLink = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarLink.current.value);
    evt.target.reset();
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.statusSubmitButton}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__avatar-link"
        name="avatarLink"
        placeholder="Ссылка на аватар"
        required
        id="popup__avatar-link"
        ref={avatarLink}
      />
      <span className="popup__input-error popup__avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
