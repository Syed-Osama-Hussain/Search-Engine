

module.exports = function Search(query,data){
    let result = [];
    query = query.split(" ")
    for(let i=0;i<data.length;i++){
        const item = data[i];
        if(item.tags.some(tag => query.includes(tag))){
            result.push(item);
        }else if(query.some(function(v) { return item.content.indexOf(v) >= 0; })){
            result.push(item);
        }
    }
    return result;
}

