window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.memo-name').forEach((elem) => {
      elem.addEventListener('click', (event) => {
        alert(event.target.innerHTML);
        //fetch('/api/select', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tytle: event.target.innerHTML}) })
      });
    });
  
    document.querySelector('.send-button').addEventListener('click', (event) => {
      const tytle = document.querySelector('.tytle').value;
      const text = document.querySelector('.input-text').value;
      fetch('/api/memo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tytle: tytle , note: text }) })
    });
  });