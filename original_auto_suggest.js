$(document).ready(function() {
    var typeTimer; // timer that will run the search function
    var timeout = 2000; // time in milliseconds, e.g. 2000ms = 2s
    
    // On keyup in the input, wait 2 seconds to retreive a list of suggestions.
    $( '#test-input' ).keyup(function(){
        clearTimeout(typeTimer);
        if ($('#test-input').val()){
            typeTimer = setTimeout(SuggestionSearch, timeout);
        }
    });

    function SuggestionSearch() {
    // A function that retreives a JSON object of records that contain the user's input.
    // The JSON data is then placed into <p> elements and inserted into the page.
        var query;
        query = $( '#test-input' ).val();
        $.getJSON('api/', {suggestions: query, page: 1}, function(data){
            // 'suggestions' and 'page' will be the GET paramenters
            var items = [];
            $.each( data, function( key, val ) {
                items.push( '<p id="' + key + '" class="suggestions">' + val['title'] + '</p>');
            });
            $('#child-suggestions').html(items);
        });
    }
    
    // Allows users to click on dynamically generated suggestions to automatically fill in the input
    $('#child-suggestions').on('click', '.suggestions', function() {
        var newinput = $(this).text();
        $( '#test-input' ).val(newinput);
    });

});
