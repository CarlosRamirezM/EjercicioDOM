fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json')
  .then(response => response.json())
  .then(response => {
      console.log(response);

      let count = 1;

      let squirrelCount = 0;
      let arrayEventCount = {};
      let arraySquirrelAndEventCount = {};

      response.forEach(item => {

        let events = item["events"];
        let squirrel = item["squirrel"];    
       
        
        if (squirrel) {
          squirrelCount++;
        }

        events.forEach( element => {

          let innerEvent = arrayEventCount[element];

          if(innerEvent) {
            arrayEventCount[element]++;            
          }
          else {
            arrayEventCount[element] = 1;
            arraySquirrelAndEventCount[element] = 0;
          }

          if(squirrel) {
            arraySquirrelAndEventCount[element]++;            
          }          
        });
      
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let tdEvents = document.createElement("td");  
        let tdSquirrel = document.createElement("td");  
        let txtCount = document.createTextNode(count);
        let txtEvent = document.createTextNode(events);
        let txtSquirrel = document.createTextNode(squirrel);
        
        th.appendChild(txtCount);
        tdEvents.appendChild(txtEvent);
        tdSquirrel.appendChild(txtSquirrel);
        
        tr.appendChild(th);
        tr.appendChild(tdEvents);
        tr.appendChild(tdSquirrel);

        if(item["squirrel"] === true) {
          tr.setAttribute("class","table-danger");
        }

        let tableBody = document.getElementById("table1body");
        tableBody.appendChild(tr);

        count++;
        
      }); 

      console.log(arrayEventCount);      
      console.log(arraySquirrelAndEventCount);

      return [squirrelCount, arrayEventCount, arraySquirrelAndEventCount, response.length];
    }).then( data => {

      let sCount = data[0];
      let eCount = data[1];
      console.log(eCount);
      let esCount = data[2];
      const totalEvents = data[3];

      let arrayCorrelations = {};

      for (e in eCount) {
        let tp = esCount[e]; 
        let fp = sCount - tp;
        let fn = eCount[e] - tp;
        let tn = totalEvents - tp - fp - fn;

        let upper = (tp*tn)-(fp*fn);
        let bottom = ((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn))**(0.5);

        arrayCorrelations[e] = upper/bottom;
      }

      return arrayCorrelations;
    }).then( corr => {
      console.log(corr);

      let count = 1;

      for(e in corr) {

        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let tdEvents = document.createElement("td");  
        let tdSquirrel = document.createElement("td");  
        let txtCount = document.createTextNode(count);
        let txtEvent = document.createTextNode(e);
        let txtSquirrel = document.createTextNode(corr[e]);
        
        th.appendChild(txtCount);
        tdEvents.appendChild(txtEvent);
        tdSquirrel.appendChild(txtSquirrel);
        
        tr.appendChild(th);
        tr.appendChild(tdEvents);
        tr.appendChild(tdSquirrel);

        let tableBody = document.getElementById("table2body");
        tableBody.appendChild(tr);

        count++;
      }
    }); 

