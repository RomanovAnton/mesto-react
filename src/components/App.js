import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
    

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(evt) {
    setSelectedCard(evt.target);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));

    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
    closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    }
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
    });
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            
          />

          <PopupWithForm
            name="delete-confirm"
            title="Вы уверены?"
            onClose={closeAllPopups}
            buttonText="Да"
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
