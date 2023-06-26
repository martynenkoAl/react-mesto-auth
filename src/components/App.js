import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch(console.error);
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api.setUserInfo(info)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
  }
  
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setAvatar(avatar)
        .then(data => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
  }




    useEffect(() => {
      Promise.all([api.getInfo(), api.getInitialCards()])
          .then(([user, card]) => {
            setCurrentUser(user)
            setCards(card)
          })
          .catch(console.error);
      }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isLoading={isLoading} isOpen={isAddPlacePopupOpen} />
          <PopupWithForm title="Вы уверены?" name="confirm" btntext="Да"></PopupWithForm>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>

      </div>
    </CurrentUserContext.Provider>
  
  );
}

export default App;
