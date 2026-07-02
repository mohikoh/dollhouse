document.addEventListener('DOMContentLoaded', () => {

   // Mask for phone
   const phoneInput = document.querySelector('#phone');
   if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
         let val = e.target.value.replace(/\D/g, ''); // We delete everything except the numbers
         if (!val.startsWith('380')) val = '380' + val; // Forced start from 380
         
         // Formatting: +380 XXX-XX-XX
         let formatted = '+380 ';
         if (val.length > 3) formatted += val.substring(3, 6);
         if (val.length > 6) formatted += '-' + val.substring(6, 8);
         if (val.length > 8) formatted += '-' + val.substring(8, 10);
         
         e.target.value = formatted;
      });
   }

   // Custom select image
   document.querySelectorAll('.choose-a-photo').forEach(block => {
      const input = block.querySelector('input[type="file"]');

      input.addEventListener('change', function(e) {
         if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
               // 1. Create a preview if it doesn't exist yet.
               let preview = block.querySelector('.choose-a-photo__preview');
               if (!preview) {
                  preview = document.createElement('div');
                  preview.className = 'choose-a-photo__preview';
                  block.appendChild(preview);
               }

               // 2. Create a delete button if it doesn't exist yet.
               let removeBtn = block.querySelector('.remove-photo-btn');
               if (!removeBtn) {
                  removeBtn = document.createElement('div');
                  removeBtn.className = 'remove-photo-btn';
                  removeBtn.innerHTML = '&times;';
                  // Add a delete handler on creation
                  removeBtn.addEventListener('click', (ev) => {
                     ev.stopPropagation();
                     input.value = '';
                     preview.remove(); // Delete the element completely
                     removeBtn.remove(); // Remove the button completely
                  });
                  block.appendChild(removeBtn);
               }

               // 3. Install the image
               preview.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(this.files[0]);
         }
      });
   });

   // List row limit
   const btns_readmore = document.querySelectorAll('.btn-readmore');
   btns_readmore.forEach(btn_readmore => {
      btn_readmore.addEventListener('click', function(e) {
         e.preventDefault();
         this.parentNode.classList.toggle("row-limit");
      });
   });
});