window.addEventListener('DOMContentLoaded', function() {
    var marqueeInner = document.getElementById('marqueeInner');
    var clientFolder = '/assets/img/clients/';
    var clientImages = [];
    var loadedSources = {}; // Keep track of loaded image sources
    var maxIterations = 35; // Set a maximum number of iterations
    var fileExtensions = ['.png', '.svg', '.jpg']; // Array of file extensions

    // Function to fetch client images from the folder
    function fetchClientImages() {
        var i = 1;
        var loadedImages = 0;
        var currentExtensionIndex = 0;

        // Recursive function to iterate through file extensions
        function tryNextExtension() {
            var img = new Image();
            img.src = clientFolder + i + fileExtensions[currentExtensionIndex];
            img.alt = 'Client ' + i;

            // Check if image exists, if not, try next extension
            img.onload = function() {
                if (!loadedSources[this.src]) { // Check if image source is already loaded
                    clientImages.push(this);
                    loadedSources[this.src] = true;
                }
                loadedImages++;
                if (loadedImages >= maxIterations) {
                    insertImagesIntoMarquee();
                    // Append new set of images before the animation ends
                    appendNewSetOfImages();
                } else {
                    i++;
                    tryNextExtension();
                }
            };
            img.onerror = function() {
                currentExtensionIndex++;
                if (currentExtensionIndex < fileExtensions.length) {
                    tryNextExtension();
                } else {
                    loadedImages++;
                    if (loadedImages >= maxIterations) {
                        insertImagesIntoMarquee();
                        // Append new set of images before the animation ends
                        appendNewSetOfImages();
                    } else {
                        i++;
                        tryNextExtension();
                    }
                }
            };
        }

        tryNextExtension(); // Start trying the first extension
    }

    // Function to insert images into the marquee
    function insertImagesIntoMarquee() {
        clientImages.forEach(function(img) {
            var holder = document.createElement('div');
            holder.className = 'marquee__logo-holder';
            holder.appendChild(img);
            marqueeInner.appendChild(holder);
        });
    }

    // Function to append a new set of images before the animation ends
    function appendNewSetOfImages() {
        var newImages = clientImages.map(function(img) {
            return img.cloneNode(true);
        });

        newImages.forEach(function(img) {
            var holder = document.createElement('div');
            holder.className = 'marquee__logo-holder';
            holder.appendChild(img);
            marqueeInner.appendChild(holder);
        });

        // Adjust animation duration to accommodate the new set of images
        setMarqueeAnimationDuration();
    }

    // Function to calculate total width of images and set animation duration
    function setMarqueeAnimationDuration() {
        var totalWidth = marqueeInner.scrollWidth;
        var animationDuration = totalWidth / 100; // Assuming 100 pixels move per second
        marqueeInner.style.animationDuration = animationDuration + 's';
    }

    // Fetch images and insert into the marquee
    fetchClientImages();
});
