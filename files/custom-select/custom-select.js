jQuery(document).ready(function($) {
	// Target the specific select elements
	var $custom_select = $('.wrap-select .ff-el-input--content select');
	if ($custom_select.length > 0) {
		$custom_select.each(function() {
			var $nativeSelect = $(this);
			var numberOfOptions = $nativeSelect.children('option').length;

			// Hide the native select and wrap it
			$nativeSelect.addClass('hidden-native-select');
			$nativeSelect.wrap('<div class="custom-select-wrapper"></div>');
			$nativeSelect.after('<div class="custom-select-trigger"></div>');

			var $customTrigger = $nativeSelect.next('div.custom-select-trigger');

			// Set the initial text from the selected option
			$customTrigger.text($nativeSelect.children('option:selected').text());

			// Create the custom dropdown list
			var $customList = $('<ul />', { 'class': 'custom-select-options' }).insertAfter($customTrigger);

			// Populate the custom list with options
			for (var i = 0; i < numberOfOptions; i++) {
				var $currentOption = $nativeSelect.children('option').eq(i);
				var liClass = '';

				// Add a specific class to the first item (usually the placeholder)
				if (i === 0) {
					liClass += 'is-placeholder ';
				}

				// Add a class if this option is currently selected
				if ($currentOption.is(':selected')) {
					liClass += 'is-selected';
				}

				$('<li />', {
					text: $currentOption.text(),
					rel: $currentOption.val(),
					'class': $.trim(liClass) // Trim removes extra spaces
				}).appendTo($customList);
			}

			var $customListItems = $customList.children('li');

			// Handle the click on the trigger (open/close dropdown)
			$customTrigger.click(function(e) {
				e.stopPropagation();
				$('div.custom-select-trigger.active').not(this).each(function(){
					$(this).removeClass('active').next('ul.custom-select-options').hide();
				});
				$(this).toggleClass('active').next('ul.custom-select-options').toggle();
			});

			// Handle the click on a list item
			$customListItems.click(function(e) {
				e.stopPropagation();

				// Optional: Uncomment the next line if you want to completely block clicking the placeholder via JS
				// if ($(this).hasClass('is-placeholder')) return;

				// Update trigger text and close the dropdown
				$customTrigger.text($(this).text()).removeClass('active');

				// Remove 'is-selected' from all items and add to the clicked one
				$customListItems.removeClass('is-selected');
				$(this).addClass('is-selected');

				// Update the native select and trigger change event for validation
				$nativeSelect.val($(this).attr('rel')).trigger('change'); 
				$customList.hide();
			});

			// Close the dropdown when clicking outside
			$(document).click(function() {
				$customTrigger.removeClass('active');
				$customList.hide();
			});
		});
	}
});
