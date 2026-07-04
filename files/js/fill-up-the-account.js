document.addEventListener('DOMContentLoaded', () => {

   // Amount
   IMask(document.getElementById('amount'), {
      mask: '0000',
      lazy: true,
      placeholderChar: '_',
   });

   // Validadity
   IMask(document.getElementById('validity'), {
      mask: '00:00:00',
      lazy: true,
      placeholderChar: '_',
   });
    
   function setupMaskedInput(inputId, containerId, isDate = true) {
      const input = document.getElementById(inputId);
      const container = document.getElementById(containerId);
      if (!input || !container) return;

      // Creating cells
      container.innerHTML = '';
      for (let i = 0; i < 3; i++) {
         const cell = document.createElement('div');
         cell.className = 'cell';
         container.appendChild(cell);
         if (i < 2) {
            const sep = document.createElement('span');
            sep.textContent = ':';
            sep.className = 'colon';
            container.appendChild(sep);
         }
      }
      const cells = container.querySelectorAll('.cell');

      const maskOptions = isDate ? {
         mask: '00:00:00',
         prepare: (val, masked) => {
            const current = masked.unmaskedValue + val;
            const len = current.length;
            if (len === 1 && parseInt(val) > 3) return false;
            if (len === 2) {
               let first = parseInt(current[0]);
               let second = parseInt(val);
               if (first === 3 && second > 1) return false;
               if (first === 0 && second === 0) return false;
            }
            if (len === 3 && parseInt(val) > 1) return false;
            if (len === 4) {
               let first = parseInt(current[2]);
               let second = parseInt(val);
               if (first === 0 && second === 0) return false;
               if (first === 1 && second > 2) return false;
            }
            return val;
         }
      } : { mask: '00:00:00' };

      const mask = IMask(input, maskOptions);

      function updateUI() {
         const val = mask.unmaskedValue;
         const pos = mask.cursorPos; // Position in the mask "00:00:00"

         cells.forEach((cell, i) => {
            const pair = val.substring(i * 2, i * 2 + 2);
            cell.textContent = pair;
            cell.classList.toggle('active', pair.length > 0);
            
            // CURSOR: check if the mask position falls within the cell
            // Cell i has a range in the mask: [i*3, i*3+2]
            const isFocused = document.activeElement === input && (pos >= i * 3 && pos <= i * 3 + 1);
            cell.classList.toggle('focused', isFocused);
         });
      }

      mask.on('accept', updateUI);
      input.addEventListener('focus', updateUI);
      input.addEventListener('blur', updateUI);
      input.addEventListener('click', updateUI);
      
      updateUI();
   }

   setupMaskedInput('date', 'date-cells', true);
   setupMaskedInput('validity', 'validity-cells', false);
});