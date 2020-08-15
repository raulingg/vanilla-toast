
import toast from './src';

const handleClick = (opts = {}) => toast.render(undefined, opts);

document.addEventListener('click', (e) => {
    console.log(e.target.dataset)
    if (e.target.dataset.position || e.target.dataset.type) {
        console.log('entro')
    handleClick({ ...e.target.dataset });
  }
});