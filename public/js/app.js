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
                  $( '.stats__message-no-data' ).hide();
                $( '#populationRow #population' ).html(data.population);
                $( '#farmlandRow #farmland' ).html(data.farmland);
                $( '#requiredRow #required').html(parseInt(data.required));

                if (data.deficit > 0) {
                    $( '#deficitIcon' ).html('<i class="fa fa-minus" aria-hidden="true"></i>');
                    $( '#deficitRow #deficit' ).html(Math.abs(parseInt(data.deficit)));
                    $( '#deficitRow .stats__table-cell--data-text' ).html('hectares shortage');

                    $( '#shippingContainerRow' ).show();
                    $( '#containerCount' ).html(data.containers);
                } else {
                    $( '#deficitIcon' ).html('<i class="fa fa-plus" aria-hidden="true"></i>');

                    $( '#deficitRow #deficit' ).html(Math.abs(parseInt(data.deficit)));
                    $( '#deficitRow .stats__table-cell--data-text' ).html('hectares surplus');

                    $( '#shippingContainerRow' ).hide();
                }

                $( '.stats__table' ).slideDown();
            }).catch(function() {
                $( '.stats__message-no-data' ).show();
                $( '.stats__table' ).slideUp();
            });
            });
            clearInterval(loader);

            /* Call this function in the callback after you have the data */
            $( '.unit' ).click(function() {
                $( '.unit' ).removeClass('unit-active');
                $( this ).addClass('unit-active');
            });
        }
    }

    function init() {
        loader = setInterval(initCountyListeners, 500);
        // use fetch to get loads of data and chuck it into the foodops object

        // work out the working counties
        // api.locality().then(function(data) {
        //     console.log(Object.keys(data));
        //
        //     $( '.unit' ).each(function() {
        //         if ($( this ).children('title').text() in data) {
        //             console.log($( this ).children('title').text());
        //             api.locality($(this).children('title').text()).then(function(data) {
        //                 console.log(data);
        //             });
        //         }
        //     });
        // });
        // var demo = new CountUp("elementID", startVal, endVal, decimalplaces, duration);
        // var demo = new CountUp("personCount", 0, 3595, 0, 2.5);
        // demo.start();
    }

    init();
})();
