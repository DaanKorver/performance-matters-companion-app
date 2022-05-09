/**
 * Renders html into a specific element
 * @param {*} element Element the html needs to be rendered to
 * @param {*} html the html that needs to be rendered
 */
export default function render(element, html) {
  element.insertAdjacentHTML("beforeend", html)
}