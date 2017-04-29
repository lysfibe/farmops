function updateStatsPane(county) {
    $( '.stats__county-name' ).text(county);
}

$( document ).ready(function() {
    console.log('did stuff');
    $( '.unit' ).click(function() {
        console.log('did more stuff');
        const county = $( this ).children('title').text();
        updateStatsPane(county);
    });
});
