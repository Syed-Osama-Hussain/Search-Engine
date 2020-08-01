

module.exports = function Search(query,data){
    let result = [];

    for(let i=0;i<data.length;i++){
        const item = data[i];
        if(item.tags.some(tag => query.includes(tag))){
            result.push(item);
            // console.log(`found in tags: ${item.tags}`)
        }else if(item.content.indexOf(query) !== -1){
            result.push(item);
            // console.log(`found in content: ${item.content}`)
        }
    }

    if(result.length === 0) return Error("No result found.");

    return result;

}