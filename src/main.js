const TYPES = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const defaults = {
  delay: 300,
  type: "default",
  position: "top-center",
  autoDismiss: false,
  dismissText: "x",
  dismissTimeMs: 6000,
  dismissible: false,
  styles: {}
};

const stack = {};

const builder = () => {
  const createContainer = (position) => {
    const containerEl = document.createElement("div");
    containerEl.className = `container container--${position}`;
    document.body.appendChild(containerEl);

    return containerEl;
  };

  const getContainer = (position) => {
    if (stack[position]) return stack[position];

    stack[position] = createContainer(position);
    return stack[position];
  };

  const removeToast = (node) => {
    if (!node) return;
    const position = node.dataset.position;
    node.classList.add("slide-exit");
    node.classList.add(`slide-exit--${position}`);
    node.addEventListener("animationend", () => node.remove());
  };

  const appendDismissButton = (node, dismissText) => {
    const button = document.createElement("button");
    const buttonText = document.createTextNode(dismissText);
    button.title = "Close message";
    button.append(buttonText);
    button.className = "toaster__button";
    button.onclick = () => removeToast(node);
    node.appendChild(button);
  };

  const createToast = (message, opts) => {
    const toasterEl = document.createElement("div");
    toasterEl.className = `toaster toaster--${opts.type} slide-enter slide-enter--${opts.position}`;
    toasterEl.dataset.position = opts.position;
    const messageEl = document.createElement("span");
    const messageText = document.createTextNode(message);
    messageEl.append(messageText);
    messageEl.className = "toaster__message";
    toasterEl.appendChild(messageEl);
    toasterEl.addEventListener("click", (e) => e.stopPropagation());

    if (!opts.dismissible)
      appendDismissButton(toasterEl, opts.dismissText);

    if (opts.autoDismiss)
      setTimeout(() => removeToast(toasterEl), opts.dismissTimeMs);

    getContainer(opts.position).append(toasterEl);
    return toasterEl;
  };

  return {
    createToast
  };
};

const Toaster = {
  render: (message = "🦄 I'm a coder!", userOpts = {}) => {
    const options = { ...defaults, ...userOpts };
    const { createToast } = builder();
    setTimeout(() => createToast(message, options), options.delay);
  },
  success: (message, opts) =>
    Toaster.render(message, { ...opts, type: TYPES.SUCCESS }),
  info: (message, opts) =>
    Toaster.render(message, { ...opts, type: TYPES.INFO }),
  warning: (message, opts) =>
    Toaster.render(message, { ...opts, type: TYPES.WARNING }),
  error: (message, opts) =>
    Toaster.render(message, { ...opts, type: TYPES.ERROR })
};

export default Toaster;
