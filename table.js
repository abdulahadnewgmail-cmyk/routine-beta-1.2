  let tableContainer = document.querySelector('.table_container')
  let savedRoutine;
  
  function getTableData() {
    let savedData = JSON.parse(localStorage.getItem('savedRoutine'))
    savedRoutine = savedData || prevRoutine

  }
  
  function createTable(array) {
    let html;
    let rows = '';
    let th = ''
    for (var i = 510; i <= 790; i += 40) {
      th += `
        <th class='a${i}'> 
          ${i >= 550? convertToHM(i): ''}
        </th>
      `
    }
    
    for (let i = 0; i <= array.length - 1; i++) {
      
      let object = array[i]
      let index = 550;
      let cells = `
      `;
      
      while (index <= 790) {
        cells += `
        <td>
          <input value='${object[index]}'>
        </td>
        `
        index += 40
      }
      rows += `
        <tr>
          <td class='tableDayName'>
            ${days[i]}
          </td>
          ${cells}
        </tr>
      `
    }
    html = `
    <table>
      ${th}
      ${rows}
    </table>
    `
    tableContainer.innerHTML = html
  }
  
  function convertToHM(totalMinutes) {
    let h = Math.floor(totalMinutes / 60).toString().padStart(2, '0')
    h = Number(h) < 13? h : (h -12).toString().padStart(2, '0')
    let m = (totalMinutes % 60).toString().padStart(2, '0')
    return `${h} : ${m}`
  }
  
  function saveRoutine() {
    let allRows = document.querySelectorAll('tr')
    
    for (let i = 1; i < allRows.length; i++) {
      let object = routine[i-1]
      let eachRow = allRows[i]
      let index = 550;
      for (let j = 1; j < eachRow.childElementCount; j++) {
        let eachCulumn = eachRow.children[j].children[0]
        object[index] = eachCulumn.value ;
        index += 40
      }
    }
    savedRoutine = routine
    
    localStorage.setItem('savedRoutine', JSON.stringify(savedRoutine))
    let parsed = JSON.parse(localStorage.getItem('savedRoutine'))
    createTable(parsed)
    window.alert(' সফল')
  }
  
  function resetRoutine() {
    let ans = confirm(' সকল রুটিন রিসেট হয়ে যাবে !')
    ans && localStorage.removeItem('savedRoutine')
    ans && createTable(prevRoutine)
  }
  
  getTableData()
  createTable(savedRoutine)
  
  
  
  
