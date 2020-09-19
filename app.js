import toast from './dist/index.es.js'

const handleClick = (opts = {}) => toast.render('Hola coder!!', opts)

document.addEventListener('click', (e) => {
  if (e.target.dataset.position || e.target.dataset.type) {
    handleClick({ ...e.target.dataset })
  }
})
