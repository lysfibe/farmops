(function() {
    var loader,
        foodops;

    function updateStatsPane(county) {
        $( '.stats__county-name' ).text(county);
    }

    function initCountyListeners() {
        if ($( '.unit' ).length > 0) {
            $( '.unit' ).hover(function() {
                var county = $( this ).children('title').text();
                updateStatsPane(county);
            });
            clearInterval(loader);
        }
    }

    function init() {
        loader = setInterval(initCountyListeners, 500);
        // use fetch to get loads of data and chuck it into the foodops object


        // var demo = new CountUp("elementID", startVal, endVal, decimalplaces, duration);
        var demo = new CountUp("personCount", 0, 3595, 0, 2.5);
        demo.start();
    }

    init();
})();
