const changeColorComponent = {
  init() {
    this.colorSet = false;
    const container = document.getElementById('container');

    const colorList = ['#AD50FF', '#ff9500', '#66cc00', '#5ac8fa', '#000'];

    const setColor = ({ newColor, button }) => {
      for (let i = 0; i < colorList.length; i++) {
        const btns = document.getElementsByTagName('button');
        btns[i].classList.remove('selected');
      }
      const modelMesh = this.el.getObject3D('mesh');
      modelMesh.traverse((node) => {
        if (node.isMesh) {
          node.material.color = new THREE.Color(newColor);
        }
      });
      button.classList.add('selected');
    };

    for (let i = 0; i < colorList.length; i++) {
      const colorButton = document.createElement('button');
      colorButton.classList.add('carousel');
      colorButton.style.backgroundColor = colorList[i];
      container.appendChild(colorButton);

      colorButton.addEventListener('click', () =>
        setColor({
          newColor: colorList[i],
          button: colorButton,
        })
      );
    }

    if (colorList.length > 5) {
      container.style.pointerEvents = 'auto';
    }

    this.el.sceneEl.addEventListener('model-loaded', () => {
      if (!this.colorSet) {
        const firstButton = container.getElementsByTagName('button')[0];
        setColor({ newColor: colorList[0], button: firstButton });
      }
      this.colorSet = true;
    });
  },
};

export { changeColorComponent };

