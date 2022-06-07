export const storybookCtrl = () => {
  document.querySelector('h1').addEventListener('click', evt => {
    console.log(evt);
    evt.target.innerHTML = "It Works!"
  })
}