import toast from "./src/Toaster";
import "./scss/main.scss";

console.log("debug");
const handleClick = (opts = {}) => toast.render("Hello world", opts);

document.addEventListener("click", (e) => {
  console.log(e.target.dataset);
  if (e.target.dataset.position || e.target.dataset.type) {
    handleClick({ ...e.target.dataset });
  }
});
