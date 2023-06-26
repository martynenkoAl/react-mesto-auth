class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
      this._authorization = options.headers.authorization;
    }
  
    _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
  }
  
    getInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._getResponseData);
    }
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._getResponseData);
    }
  
    setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._getResponseData);
    }
  
    setAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._getResponseData);
    }
  
    addNewCard(data) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._getResponseData);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._getResponseData);
    }
  
    toggleLike(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes `, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._getResponseData);
    }
  }


  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: '16c59b9f-2624-4711-ab65-5d2bf980f5da',
      'Content-Type': 'application/json'
    }
  })

  export default api;