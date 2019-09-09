$(document).ready(function() {
	/* ======= Vegas Plugin ======= */
    /* Ref: http://vegas.jaysalvat.com/index.html */
    $('#promo').vegas({
        delay: 8000,
        overlay: 'assets/plugins/vegas/dist/overlays/06.png',
        color: '#101113',
        transition: 'zoomOut',
        transitionDuration: 3000,
        slides: [
            { src: 'images/hero-1.jpg' },
            { src: 'images/hero-2.jpg' },
            { src: 'images/hero-3.jpg' },
            { src: 'images/hero-4.jpg' }
        ]
    });

});
