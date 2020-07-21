const query = process.argv[2].replace(/-/g, ' ').toLowerCase();
const data = require('./indexedData.json');


function Search(){
    console.log(query)
    let result = {};
    for(let i=0;i<data.length;i++){
        // console.log(data[i])
        const item = data[i];
        if(item.tags.some(tag => query.includes(tag))){
            result[item.id] = item;
            console.log(`found in tags: ${item.tags}`)
        }else if(item.content.indexOf(query) !== -1){
            result[item.id] = item;
            console.log(`found in content: ${item.content}`)
        }
    }

    console.log('#########');
    
    if(Object.keys(result).length === 0) console.log("Sorry! No result found.")
    
    for (let id in result) {
      const item = result[id];
      console.log(`${item.title} - ${item.heading}`);
      console.log(`Link: ${item.heading_url}`);
      console.log();
      console.log(item.content);
      console.log('@@@@@@@@@');
    }

}

Search();