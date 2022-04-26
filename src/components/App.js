import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(false)

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleCardClick(evt) {
    setSelectedCard(evt.target)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <div className="page">
      <div className="content">
        <Header />

        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />

        <Footer />

        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="popup__input popup__profile-name" name="profileName" placeholder="Имя" required
            minLength="2" maxLength="40" id="popup__profile-name" />
          <span className="popup__input-error popup__profile-name-error"></span>
          <input type="text" className="popup__input popup__profile-job" name="profileJob"
            placeholder="Профессиональная деятельность" required minLength="2" maxLength="200" id="popup__profile-job" />
          <span className="popup__input-error popup__profile-job-error"></span>
        </PopupWithForm>

        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="popup__input popup__card-name" name="name" placeholder="Название" required
            minLength="2" maxLength="30" id="popup__card-name" />
          <span className="popup__input-error popup__card-name-error "></span>
          <input type="url" className="popup__input popup__card-link" name="link" placeholder="Ссылка на картинку" required
            id="popup__card-link" />
          <span className="popup__input-error popup__card-link-error"></span>
        </PopupWithForm>

        <PopupWithForm name="delete-confirm" title="Вы уверены?" onClose={closeAllPopups} />

        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" className="popup__input popup__avatar-link" name="avatarLink" placeholder="Ссылка на аватар"
            required id="popup__avatar-link" />
          <span className="popup__input-error popup__avatar-link-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </div>
  );
}

export default App;
