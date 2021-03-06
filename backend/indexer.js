const fs = require('fs'),
    path = require('path'),
    walk = require('walk'),
    commonmark = require('commonmark'),
    stemmer = require('stemmer'),
    crypto = require('crypto'),
    {Content} = require('./models/content');

const wikiUrlPrefix = process.argv[2];    
const wikiDir = `${process.argv[3]}/`;
const walker = walk.walk(`${process.argv[3]}/`);
let index = Object.create(null);

walker.on('file', (root, filestats, next) => {
    const fileName = filestats.name;
    if(fileName.indexOf(".md") !== -1){
        const pathName = path.join(wikiDir,fileName);
        const content = fs.readFileSync(pathName).toString();
        index[fileName] = processFile(fileName,content);
    }
    next();
});

walker.on('errors', (root, nodeStatsArray, next) => {
    next();
});

walker.on('end',  () => {
    let result = [];
    for(let fileName in index){
        for(let i=0; i < index[fileName].length; i+=1){
            result.push(index[fileName][i]);
        }
    }
    process.send(result);
});

function processFile(fileName,content){
    let result = [];
    const title = fileName.replace('.md','');
    const tags = breakIntoTags(title);    
    const tree = contentToMarkdownTree(content);
    const processedContent = processContent(title, tree);
    for(let heading in processedContent){
        const headingTags = breakIntoTags(heading);

        for(let i=0; i< processedContent[heading].length; i++){
            const item = processedContent[heading][i];
            const data = convertToSearchData(title, heading, tags, item,headingTags);
            result.push(data);
        }
    }

    return result;
}

function breakIntoTags(text){
    let clean = text.replace(/[^a-zA-Z]/g,' ');
    clean = clean.toLowerCase();
    clean = clean.split(' ');
    let tagsHash = Object.create(null);
    for(let i=0; i < clean.length; i+=1){
        if(shouldIgnoreWord(clean[i]))
        {    continue;
        }
        const stemmed = stemmer(clean[i]);
        tagsHash[stemmed] = true;
        tagsHash[clean[i]] = true;
    }
    let tags = [];
    for(let key in tagsHash){
        
        if(key.length > 0) tags.push(key);

    }
    return tags;
}

function shouldIgnoreWord(text){
    const stopWords = ['the', 'on', 'for', 'up', 'and', 'an', "'", 'to']
    return text.length === 1 || stopWords.indexOf(text) !== -1;
}

function contentToMarkdownTree(content){
    const reader = new commonmark.Parser();
    return reader.parse(content);
}

function processContent(title, tree){
    const walker = tree.walker();
    let event, node, child;
    let currentHeading = null;
    let currentText = null;
    let sections = {null: []};

    while((event = walker.next())){
        node = event.node;
        if(node.type === "heading"){
            currentHeading = getNodeChildrenText(node);
        }else if(node.literal){
            const text = node.literal.replace('\n',' ').toLowerCase();
            if(sections[currentHeading]){
                sections[currentHeading].push(text);
            }else{
                sections[currentHeading] = [text];
            }
        }
    }
    sections[title] = sections[null];
    delete sections[null];
    return sections;
}

function getNodeChildrenText(node){
    let text = '';
    let child = node.firstChild;

    do{
        text += child.literal;
    }while(child = child.next)
    return text;
}

function convertToSearchData(title, heading, tags, item, headingTags){
    const subHeadingUrl = heading.replace(/\s+/g, '-').replace(/[\/()]/g, '').toLowerCase();
    // const id = generateId(title, heading, item.content);

    const titleUrl = `${wikiUrlPrefix}/${title.replace(' ','-')}`;
    let headingUrlSuffix = heading.toLowerCase().replace(/[\/\(\),.]/g, '').replace(/ /g, '-');
    return {
        title: title,
        title_url: titleUrl,
        heading: heading,
        heading_url: title == heading ? titleUrl : `${titleUrl}#${headingUrlSuffix}`,
        content: item,
        tags: tags.concat(breakIntoTags(item)).concat(headingTags)
      };
}

function generateId(){
    const hash = crypto.createHash('sha256');
    hash.update.apply(hash,arguments);
    return hash.digest('hex');
}