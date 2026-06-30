document.addEventListener('DOMContentLoaded', () => {
   
   // Filter container (limiting the scope)
   const filterContainer = document.querySelector('.filter-block__filter');
   if (!filterContainer) return;

   const slidersConfig = [
      { id: 'age-slider', start: [25, 40] },
      { id: 'height-slider', start: [145, 185] },
      { id: 'weight-slider', start: [50, 90] }
   ];

   // Initializing sliders only within our container
   slidersConfig.forEach(s => {
      const el = filterContainer.querySelector(`#${s.id}`);
      if (el && !el.noUiSlider) {
         noUiSlider.create(el, {
            start: s.start,
            connect: true,
            step: 1,
            range: { 'min': s.start[0], 'max': s.start[1] + 30 },
            tooltips: true,
            format: { to: v => Math.round(v), from: v => Number(v) }
         });
         el.noUiSlider.on('update', updateFiltersCount);
      }
   });

   // Counting function (inside filterContainer context)
   function updateFiltersCount() {
      const countSpan = document.getElementById('filters-selected');
      if (!countSpan) return;

      let total = 0;

      // 1. Count the checkboxes
      const checkedBoxes = filterContainer.querySelectorAll('.filter-block__block input[type="checkbox"]:checked');
      total += checkedBoxes.length;

      // 2. Count the sliders
      slidersConfig.forEach(s => {
         const el = filterContainer.querySelector(`#${s.id}`);
         if (el && el.noUiSlider) {
            const current = el.noUiSlider.get().map(Number);
            // If the values ​​have changed, add 1
            if (JSON.stringify(current) !== JSON.stringify(s.start)) {
               total++;
            }
         }
      });

      // DEBUG: will output the current result to the browser console (F12)
      //console.log("Current filter counter:", total);

      countSpan.textContent = total;
   }

   // 1. Class switching logic (only inside filterContainer)
   filterContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.filter-block__el');
      if (!item) return;
      
      // If you click on a button inside a block, we don’t touch the class
      if (e.target.closest('.filter-block__block') || e.target.closest('.n_btn')) return;

      const isSelected = item.classList.contains('selected');
      filterContainer.querySelectorAll('.filter-block__el').forEach(el => el.classList.remove('selected'));
      if (!isSelected) item.classList.add('selected');
   });

   // 2. Close on click outside filterContainer
   document.addEventListener('click', (e) => {
      if (!filterContainer.contains(e.target)) {
         filterContainer.querySelectorAll('.filter-block__el').forEach(el => el.classList.remove('selected'));
      }
   });

   // 3. Handling the Apply and Reset buttons (preventing reboots)
   filterContainer.querySelectorAll('form').forEach(form => {
      // Reset button
      form.querySelector('input[type="reset"]')?.addEventListener('click', (e) => {
         setTimeout(() => {
            form.querySelectorAll('.noUi-target').forEach(el => {
               const cfg = slidersConfig.find(s => s.id === el.id);
               if (cfg) el.noUiSlider.set(cfg.start);
            });
            updateFiltersCount();
            form.closest('.filter-block__el')?.classList.remove('selected');
         }, 0);
      });

      // Apply button (preventing sending)
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         form.closest('.filter-block__el')?.classList.remove('selected');
      });
   });

   // 4. Global reset (id="all-filters" или id="All-filters-reset-btn")
   const allResetBtn = document.getElementById('all-filters') || document.getElementById('All-filters-reset-btn');
   allResetBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      filterContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = cb.defaultChecked);
      slidersConfig.forEach(s => {
         const el = filterContainer.querySelector(`#${s.id}`);
         if (el) el.noUiSlider.set(s.start);
      });
      updateFiltersCount();
   });

   updateFiltersCount();

   // Force a refresh whenever a change occurs in the filter container.
   filterContainer.addEventListener('change', updateFiltersCount);
   filterContainer.addEventListener('input', updateFiltersCount);
});