import api from "../utils/api";
import Card from "./Card";
import { useEffect, useState } from "react";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState("");
    const [userDescription , setUserDescription ] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([api.getInfo(), api.getInitialCards()])
            .then(([user, card]) => {
                setUserName(user.name)
                setUserDescription(user.about)
                setUserAvatar(user.avatar)
                card.forEach(element => element.myid = user._id);
                setCards(card);
            })
        }, []);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}>
                <img
                    src={userAvatar}
                    alt="Жак-Ив Кусто"
                    className="profile__avatar"
                />
                </button>
                <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <button
                    className="profile__edit-btn"
                    aria-label="Править"
                    type="button"
                    onClick={onEditProfile}
                />
                <p className="profile__job">{userDescription}</p>
                </div>
                <button
                className="profile__add-btn"
                aria-label="Добавить"
                type="button"
                onClick={onAddPlace}
                />
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map(el => {
                        return (<Card card={el} onCardClick={onCardClick}/>)
                    })}
                </ul>
            </section>
    </main>
    )
}

export default Main;