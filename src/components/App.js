import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  

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

  return (
  <div className="App">
    <div className="page__container">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="user" btntext="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <label className="popup__field">
              <input
                id="username-input"
                type="text"
                name="username"
                placeholder="Имя"
                className="popup__text popup__text_type_username"
                minLength={2}
                maxLength={40}
                required=""
              />
              <span className="popup__text-error_username popup__text-error" />
            </label>
            <label className="popup__field">
              <input
                id="job-input"
                type="text"
                name="job"
                placeholder="О себе"
                className="popup__text popup__text_type_job"
                minLength={2}
                maxLength={200}
                required=""
              />
              <span className="popup__text-error_job popup__text-error" />
            </label>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="cards" btntext="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <label className="popup__field">
              <input
                id="place-input"
                type="text"
                name="place"
                placeholder="Название"
                className="popup__text popup__text_type_place"
                minLength={2}
                maxLength={30}
                required=""
              />
              <span className="popup__text-error_place popup__text-error" />
            </label>
            <label className="popup__field">
              <input
                id="link-input"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_link"
                required=""
              />
              <span className="popup__text-error_link popup__text-error" />
            </label>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="confirm" btntext="Да"></PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="avatarform" btntext="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <label className="popup__field">
              <input
                id="avatar-input"
                type="url"
                name="avatarpicture"
                placeholder="Ссылка на аватар"
                className="popup__text popup__text_type_avatar"
                required=""
              />
              <span className="popup__text-error_avatarpicture popup__text-error" />
            </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>

  </div>
  );
}

export default App;
