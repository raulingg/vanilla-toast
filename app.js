import toast from "./src/Toaster";
import "./scss/main.scss";

const handleClick = (opts = {}) => toast.render(undefined, opts);

document.addEventListener("click", (e) => {
  if (e.target.dataset.position || e.target.dataset.type) {
    handleClick({ ...e.target.dataset });
  }
});
