function Card({card, onCardClick}) {
    return (
    <div className="element">
        <img
            src={card.link}
            alt="Здесь должно быть изображение"
            className="element__picture"
            onClick={() => onCardClick({link: card.link, name: card.name})}
        />
        <div className="element__info">
            <h2 className="element__name">{card.name}</h2>
            <div className="element__likes">
            <button
                type="button"
                aria-label="Нравится"
                className="element__like-btn"
            />
            <h2 className="element__likescount">{card.likes.length}</h2>
            </div>
        </div>
        <button
            type="button"
            className="element__delete-btn"
            aria-label="Удалить карточку"
        />
    </div>
    )
}

export default Card;