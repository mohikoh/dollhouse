(function() {
   const html = document.documentElement;
   const THEME_KEY = 'theme';

   function getSystemPreference() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
   }

   function applyTheme() {
      const savedTheme = localStorage.getItem(THEME_KEY);
      
      if (savedTheme === 'dark') {
         html.classList.add('dark');
      } else if (savedTheme === 'light') {
         html.classList.remove('dark');
      } else {
         // If the user hasn't selected anything, we follow the system theme.
         if (getSystemPreference() === 'dark') {
            html.classList.add('dark');
         } else {
            html.classList.remove('dark');
         }
      }
   }

   // We apply the theme immediately
   applyTheme();

   // We are monitoring the system theme changes
   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) { // only if there is no saved choice
         if (e.matches) {
            html.classList.add('dark');
         } else {
            html.classList.remove('dark');
         }
      }
   });
})();