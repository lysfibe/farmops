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
            $( '.unit' ).click(function() {
              var county = $( this ).children('title').text();
              api.locality(county).then(function(data) {
                $( '#populationRow #population' ).html(data.population);
                $( '#farmlandRow #farmland' ).html(data.farmland);
                $( '#requiredRow #required').html(parseInt(data.required));

                if (data.deficit > 0) {
                  $( '#shippingContainerRow' ).show();
                  $( '#containerCount' ).html(data.containers);
                }
                else {
                  $( '#shippingContainerRow' ).hide();
                }
              });
            });
            clearInterval(loader);

            /* Call this function in the callback after you have the data */
            $( '.unit' ).click(function() {
                $( '.unit' ).removeClass('unit-active');
                $( this ).addClass('unit-active');
                $( '.stats__table' ).slideDown();
            });
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
