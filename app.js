// Import the necessary styles and components
import './index.css';
import { changeSceneComponent } from './components/change-scene';
import { changeColorComponent } from './components/color-change';

// Register the 'change-view' and 'change-color' components
AFRAME.registerComponent('change-view', changeSceneComponent)
AFRAME.registerComponent('change-color', changeColorComponent)

async function downloadModel() {
  // Get the user input (Sketchfab model ID)
  var modelID = document.getElementById('modelIDInput').value;

  try {
    // Make a request to the Sketchfab API to get the model's glTF download URL
    const response = await fetch(`https://api.sketchfab.com/v3/models/${modelID}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch model data');
    }

    console.log(response); // Print the response object

    const data = await response.json();
    const downloadUrl = data.gltf.url;
  
    // Remove the existing model entity
    var existingModelEntity = document.querySelector('#target');
    existingModelEntity.parentNode.removeChild(existingModelEntity);
  
    // Create a new <a-entity> element to load and display the model
    var modelEntity = document.createElement('a-entity');
    modelEntity.setAttribute('gltf-model', downloadUrl);
    modelEntity.setAttribute('id', 'target');
    modelEntity.setAttribute('rotation', '0 30 0');
    modelEntity.setAttribute('xrextras-two-finger-rotate', '');
    modelEntity.setAttribute('xrextras-pinch-scale', '');
    modelEntity.setAttribute('xrextras-hold-drag', '');
    modelEntity.setAttribute('reflections', 'type: realtime');
    modelEntity.setAttribute('change-color', '');
    modelEntity.setAttribute('shadow', 'receive: false');
  
    // Add the modelEntity to your scene
    var scene = document.querySelector('a-scene');
    scene.appendChild(modelEntity);
  } catch (error) {
    console.error('Failed to fetch model data:', error);
    // Handle the error here (e.g., display an error message to the user)
  }
}


// Add an event listener to trigger the downloadModel function
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('downloadButton').addEventListener('click', function() {
      XR8.xrController().start(); // Start the XR session
    console.log('Download button clicked');
    downloadModel();
  });
});


