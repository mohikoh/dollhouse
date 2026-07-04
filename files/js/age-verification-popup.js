// === Age Verification Popup ===
(function() {
   console.log('Popup script started');

   const popup = document.getElementById('notification');
   console.log('Popup element found:', popup);

   if (!popup) {
      console.error('ERROR: Popup #notification not found!');
      return;
   }

   const COOKIE_NAME = 'ageVerified';
   const COOKIE_DAYS = 7;

   function setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 864e5);
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
      console.log(`Cookie set: ${name}=${value}`);
   }

   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
         const cookie = parts.pop().split(';').shift();
         console.log(`Cookie read: ${name}=${cookie}`);
         return cookie;
      }
      console.log(`Cookie ${name} not found`);
      return null;
   }

   function showPopup() {
      console.log('Showing popup');
      popup.classList.add('open');
   }

   function hidePopup() {
      console.log('Hiding popup');
      popup.classList.remove('open');
   }

   function initPopup() {
      console.log('initPopup called');
      const isVerified = getCookie(COOKIE_NAME);
      
      if (isVerified === 'true') {
         console.log('User already verified');
         hidePopup();
      } else {
         console.log('Showing popup for first time');
         showPopup();
      }
   }

   // Buttons
   const enterBtn = document.getElementById('enter');
   const leaveBtn = document.getElementById('leave');

   console.log('Enter button:', enterBtn);
   console.log('Leave button:', leaveBtn);

   if (enterBtn) {
      enterBtn.addEventListener('click', function(e) {
         e.preventDefault();
         console.log('Enter button clicked');
         setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
         hidePopup();
      });
   }

   if (leaveBtn) {
      leaveBtn.addEventListener('click', function(e) {
         e.preventDefault();
         console.log('Leave button clicked');
         hidePopup();
      });
   }

    // Click outside
    popup.addEventListener('click', function(e) {
      if (!e.target.closest('.popup__content')) {
        console.log('Clicked outside content');
        hidePopup();
      }
   });

   // Init
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPopup);
      console.log('Waiting for DOMContentLoaded');
   } else {
      initPopup();
   }
})();