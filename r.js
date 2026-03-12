  
  const hr = document.querySelector('hr');
  const routine_h1 = document.querySelector('.routine_h1');

      //aligning "somoyer hisab" Text
  routine_h1.style.top = (hr.getBoundingClientRect().top - routine_h1.offsetHeight / 1.5) + 'px'
  const routine_subject = document.querySelectorAll('.routine_subject')
  const clock = document.querySelector('.clock')
  routine = JSON.parse(localStorage.getItem('savedRoutine')) || prevRoutine
  let subjectNowIndex;
  
  let currentHour;
  let currentMinute;
  let currentSecond;
  let currentDay;
  let weekday;
  let time;
  
  function updateClock() {
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    
    weekday = date.getDay()
    currentHour = hour.toString().padStart(2, '0')
    currentMinute = minute.toString().padStart(2, '0')
    currentSecond = second.toString().padStart(2, '0')
    time = hour * 60 + minute
    
    clock.textContent = 
    currentHour + ' : ' + currentMinute + ' : ' + currentSecond
    
    setInterval(() => {
      let date = new Date()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      
      weekday = date.getDay()
      
      currentHour = hour.toString().padStart(2, '0')
      currentMinute = minute.toString().padStart(2, '0')
      currentSecond = second.toString().padStart(2, '0')
      
      time = hour * 60 + minute
      
      clock.textContent = 
      currentHour +' : ' +currentMinute+' : '+currentSecond
      
    }, 1000)
  }
  
  function updateSubList() {
    let currentDayRoutine = routine[weekday]
    let index = 550
    routine_subject.forEach((eachCell, i) =>  {
     
      eachCell.textContent = currentDayRoutine[index]? currentDayRoutine[index] : 'নাই'
      
      if(time >= index && time <= index +40)subjectNowIndex = i;

      index += 40
    })
  }
  
  function scrollSubList() {
    const routine_section = document.querySelector('.routine_section')
    routine_section.scrollBy({
      left: subjectNowIndex? (subjectNowIndex - 1) * routine_subject[1].offsetWidth: 0,
      behavior: 'smooth'
    })
  }
  
  function styleSubList(){
    if (subjectNowIndex)
      {
        let selectedCell = routine_subject[subjectNowIndex].parentElement
        
        let child = selectedCell.children[1]
        //console.log(subjectNowIndex)
        //console.log(selectedCell)
         selectedCell.style.cssText = `
            
            background: linear-gradient(45deg, pink, magenta);
            border: 1px solid gold
          `
        child.style.cssText = `
          color: gold;
          -webkit-text-stroke:  1px #2D2D2D;
          font-size: 1.7rem;
          fonth-weight: bolder
        `
      }
  }
  
 function redirect(url) {
   window.location.href = url
 } 

  updateClock()
  updateSubList()
  scrollSubList()
  styleSubList()
