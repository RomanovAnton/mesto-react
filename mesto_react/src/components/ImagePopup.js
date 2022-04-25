function ImagePopup() {
  return (
    <div className="popup popup_image">
      <div className="popup__container-image">
        <img className="popup__card-image" src="#" alt="#" />
        <p className="popup__caption"></p>
        <button className="popup__button-close" type="button"><img className="popup__icon"
          src="<%=require('./images/Close_Icon.svg')%>" alt="кнопка закрыть" /></button>
      </div>
    </div>
  );
}

export default ImagePopup;