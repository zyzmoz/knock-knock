export class Route {
  constructor(
    pageId,
    htmlPath,
    controller = () => console.log("Controller not implemented"),
    isProtected = false
  ) {
    this.pageId = pageId;
    this.htmlPath = htmlPath;
    this.controller = controller;
    this.isProtected = isProtected;
  }
}

export class Router {
  static init(renderElement, pages, authGuard = () => true) {
    Router.pages = pages;
    Router.renderElement = document.getElementById(renderElement);
    Router.authGuard = authGuard;
    window.addEventListener("hashchange", (e) => {
      Router.render();
    });
    Router.render();
  }

  static async render() {
    const pageHash = window.location.hash;

    const routeObj = Router.pages.find((page) => page.pageId === pageHash);
    if (routeObj?.isProtected && !Router.authGuard()) {
      return;
    } else {
      const pageHtml = await (await fetch(routeObj.htmlPath)).text();

      Router.renderElement.innerHTML = pageHtml;
      Router.createController(routeObj.controller);
    }
  }

  static createController = (ctrl) => {
    try {
      if (Array.isArray(ctrl)) {
        ctrl.map(c => c())
      } else {
        ctrl();
      }
    } catch (e) {
      console.error("Error invoking controller", e);
    }
  };
}
