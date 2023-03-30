function getSong() {

    let songName = document.getElementById('song').value
    if(songName === '') {
        return alert('Please enter a song')
    }
    var table = document.getElementById("resultTable");
    table.innerHTML = '' //reset resultTable

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText)
        for (let i = 0; i < response.resultCount; i++) {
          document.getElementById("searchResultsTitle").innerText = "Songs matching: "+songName
          let newRow = document.createElement("tr")
          let titleCell = document.createElement("td")
          titleCell.id = "titleCell";
          let artistCell = document.createElement("td")
          artistCell.id = "artistCell";
          let imageCell = document.createElement("td")
          imageCell.id = "imageCell";
          let buttonCell = document.createElement("td")

          let plusButton = document.createElement("button")
          plusButton.innerText = "+"
          plusButton.addEventListener("click", function() {
            addSong(this)
          });
          buttonCell.appendChild(plusButton)
          

          titleCell.innerHTML = response.results[i].trackName
          artistCell.innerHTML = response.results[i].artistName
          imageCell.innerHTML = '<img src='+response.results[i].artworkUrl60+'>'
          newRow.appendChild(buttonCell)
          newRow.appendChild(titleCell)
          newRow.appendChild(artistCell)
          newRow.appendChild(imageCell)
          table.appendChild(newRow)
        }
        
      }
      else{
        
      }
    }
    xhr.open('GET', `/songs?title=${songName}&entity=musicTrack&limit=3`, true)
    xhr.send()
}

function moveUp(button) {
  let row = button.parentNode.parentNode;
  let previousRow = row.previousElementSibling;
  if (previousRow) {
    row.parentNode.insertBefore(row, previousRow);
  }
}

function moveDown(button) {
  let row = button.parentNode.parentNode;
  let nextRow = row.nextElementSibling;
  if (nextRow) {
    row.parentNode.insertBefore(nextRow, row);
  }
}


function deleteRow(button) {
  button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
}

function addSong(button){
  let row = button.parentNode.parentNode;
  let table = document.getElementById("playlistTable");
  let newRow = document.createElement("tr")

  let buttonCell = document.createElement("td")
  let minusButton = document.createElement("button")
  let upButton = document.createElement("button")
  let downButton = document.createElement("button")
  minusButton.innerText = "-"
  upButton.innerText = "🔼"
  downButton.innerText = "🔽"
  buttonCell.appendChild(minusButton)
  buttonCell.appendChild(upButton)
  buttonCell.appendChild(downButton)
  minusButton.addEventListener("click", function() {
    deleteRow(this)
  });
  upButton.addEventListener("click", function() {
    moveUp(this)
  });
  downButton.addEventListener("click", function() {
    moveDown(this)
  });
  newRow.appendChild(buttonCell)
  
  let titleCell = row.querySelector("#titleCell");
  let artistCell = row.querySelector("#artistCell");
  let imageCell = row.querySelector("#imageCell");
  newRow.appendChild(titleCell.cloneNode(true));
  newRow.appendChild(artistCell.cloneNode(true));
  newRow.appendChild(imageCell.cloneNode(true));
  table.appendChild(newRow)
}

const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)

})
