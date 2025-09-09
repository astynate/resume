const sliders = document.querySelectorAll('.slider-wrapper');

const PointEventListener = (sliderWrapper, index, controls) => {
    const scrollPosition = sliderWrapper.clientWidth * index;

    sliderWrapper.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    const points = controls.querySelectorAll('.slider-point');

    for (let i = 0; i < points.length; i++) {
        points[i].setAttribute('state', i === index ? "active" : "");
    }
}

for (const slider of sliders) {
    const images = slider.querySelectorAll(':scope .slider img');
    const controls = slider.querySelector('.slider-controls-wrapper');
    const sliderWrapper = slider.querySelector('.slider');

    if (images.length === 1) {
        continue;
    }

    for (let i = 0; i < images.length; i++) {
        let point = document.createElement('div');
        
        point.className = 'slider-point';

        point.setAttribute('state', i === 0 ? "active" : "");
        point.addEventListener('click', () => PointEventListener(sliderWrapper, i, controls));

        controls.appendChild(point);
    }
}