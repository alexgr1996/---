function handleSubmit() {
  const name2 = document.getElementById('name').value;
  const name2 = localStorage.getItem('name');
  document.getElementById('result-name').innerHTML = name2;
}
