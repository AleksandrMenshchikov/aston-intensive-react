export default function handleError(err: unknown) {
  console.error(err);
  if (typeof err === 'string') {
    alert(err);
  } else {
    alert('Произошла ошибка, вы можете увидеть её в консоле');
  }
}
