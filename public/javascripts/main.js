// Show the page selector when tab is clicked
$(window).on('keydown', function(e){
	var keyCode = e.keyCode || e.which; 

	if (keyCode == 9 /* tab */) { 
        e.preventDefault(); 
        
        // Show the page selector
        $(".pageSelector").toggle();
    }
});