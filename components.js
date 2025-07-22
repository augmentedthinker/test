AFRAME.registerComponent('click-color-change', {
    init: function () {
        var el = this.el; // Reference to the entity
        var originalColor = el.getAttribute('color'); // Store original color

        el.addEventListener('click', function (evt) {
            // Generate a random color
            var newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            el.setAttribute('color', newColor); // Change the color of the object
            console.log('Object clicked! New color: ' + newColor);
        });

        // Optional: Add visual feedback on hover/raycaster intersection
        el.addEventListener('raycaster-intersected', function (evt) {
            el.setAttribute('color', 'white'); // Highlight on hover
        });

        el.addEventListener('raycaster-intersected-cleared', function (evt) {
            el.setAttribute('color', originalColor); // Revert on hover end
        });
    }
});