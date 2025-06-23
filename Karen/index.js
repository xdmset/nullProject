const toggleBtn = document.getElementById('toggleSelector');
const popup = document.getElementById('avatarPopup');
const closeBtn = document.getElementById('closePopup');
const avatars = document.querySelectorAll('.avatar-option');
const selectedAvatar = document.getElementById('selectedAvatar');

toggleBtn.addEventListener('click', () => {
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

avatars.forEach((avatar) => {
  avatar.addEventListener('click', () => {
    selectedAvatar.src = avatar.src;
    popup.style.display = 'none';
  });
});
