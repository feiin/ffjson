
const jsonTags = {
    '[': ']',
    '{': '}'
};

// match json tags
function findJson(openingTag, closingTag, str) {
    let count = 0, endIndex = 0, nextTagIndex = 0;
    for (let i = 0; i < str.length; i++) {
        let letter = str[i];
        if (letter === openingTag) {
            count++;
            if (count > 1 && nextTagIndex === 0) {
                nextTagIndex = str.substring(1).search(/[\{\[]/);//nextTagIndex
                nextTagIndex = nextTagIndex + 1;
            }
        } else if (letter === closingTag) {
            count--;
        }

        if (!count) {
            endIndex = i;
            return { find: true, endIndex: endIndex + 1, nextTagIndex: nextTagIndex };
        }

    }
    return { find: false, endIndex: endIndex + 1, nextTagIndex: nextTagIndex };
}

// filter the json in the string
function filterJsonString(str, results) {
    let startIndex = str.search(/[\{\[]/);
    if (startIndex === -1) {
        results.push({ isJson: false, content: str });
        return null;
    }

    let openingTag = str[startIndex];
    let closingTag = jsonTags[openingTag];

    if(startIndex > 0) {
        results.push({ isJson: false, content: str.substring(0, startIndex) })
    }
    str = str.substring(startIndex);
    let j = findJson(openingTag, closingTag, str);
    if (j.find) {
        //maybe json
        results.push({ isJson: true, content: str.substring(0, j.endIndex) });

        if (j.endIndex < str.length) {
            //continue
            filterJsonString(str.substring(j.endIndex), results);
        }

    } else {
        //continue

        if (j.nextTagIndex === 0) {
            results.push({ isJson: false, content: str.substring(startIndex, j.endIndex) });
        } else {
            //str
            results.push({ isJson: false, content: str.substring(0, j.nextTagIndex) });

            //continue 
            filterJsonString(str.substring(j.nextTagIndex), results);

        }

    }
}

// try parse the json
function formatJson(item) {

    // console.log(item);
    try {
        item.content = JSON.parse(item.content);
        item.isJson = true;
    } catch (e) {
        item.isJson = false;
    }
    return item;
}

// filter and format the json in strings
function filterFormatJSON(str) {
    let results = [];
    filterJsonString(str, results);

    //format json
    for (let item of results) {
        if (item.isJson) {
            formatJson(item)
        }
    }
    return results;
}



module.exports = { filterFormatJSON: filterFormatJSON };