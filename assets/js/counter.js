$(document).ready(function() {

    // Function to start count animation when element is in viewport
    function startCountAnimation(element) {
        $(element).each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    // Intersection Observer callback function
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start count animation when element is in viewport
                startCountAnimation(entry.target);
                // Unobserve the target after animation starts to avoid repeating
                observer.unobserve(entry.target);
            }
        });
    }

    // Options for the Intersection Observer
    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when at least 50% of the element is visible
    };

    // Create Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, options);

    // Find all elements with class 'counter' and observe them
    $('.counter').each(function () {
        observer.observe(this);
    });

});