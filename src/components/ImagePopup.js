function ImagePopup({card, isOpen, onClose}) {
    return (
    <div className={`popup popup_image popup_dark ${isOpen && 'popup_opened'}`}>
      <div className="popup__display">
        <img src={card.link} alt="Изображение" className="popup__photo" />
        <h4 className="popup__placename">{card.name}</h4>
        <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose} />
      </div>
    </div>
    )
}

export default ImagePopup;