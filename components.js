AFRAME.registerComponent('click-color-change', {
    init: function () {
        var el = this.el; // Reference to the entity (the arcade cabinet)

        // Store original colors of sub-meshes for hover effect
        var originalColors = new Map();

        el.addEventListener('model-loaded', function () {
            // Once the GLB model is loaded, iterate through its meshes
            el.object3D.traverse(function (node) {
                if (node.isMesh) {
                    // Store the original color of each mesh
                    if (node.material && node.material.color) {
                        originalColors.set(node.uuid, node.material.color.clone());
                    }
                }
            });
        });

        el.addEventListener('click', function (evt) {
            // evt.detail.intersection.object is the specific mesh that was clicked within the GLB
            var intersectedMesh = evt.detail.intersection.object;

            if (intersectedMesh && intersectedMesh.material) {
                // Generate a random color
                var newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                intersectedMesh.material.color.set(newColor); // Change the color of the specific mesh
                console.log('Mesh clicked! New color: ' + newColor);
            }
        });

        el.addEventListener('raycaster-intersected', function (evt) {
            var intersectedMesh = evt.detail.intersection.object;
            if (intersectedMesh && intersectedMesh.material) {
                // Highlight on hover
                intersectedMesh.material.color.set('white');
            }
        });

        el.addEventListener('raycaster-intersected-cleared', function (evt) {
            var intersectedMesh = evt.detail.intersection.object;
            if (intersectedMesh && intersectedMesh.material && originalColors.has(intersectedMesh.uuid)) {
                // Revert to original color on hover end
                intersectedMesh.material.color.copy(originalColors.get(intersectedMesh.uuid));
            }
        });
    }
});
