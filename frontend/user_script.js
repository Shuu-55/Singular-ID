(() => {

    const openPopupButton = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('closePopup');

    openPopupButton.addEventListener('click', () => {
        popup.classList.remove('hidden'); // Makes the pop-up visible
    });
    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden'); // Hides the pop-up
    });
    
})();
