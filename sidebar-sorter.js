var parentNodeQuery = '#editors > div.x-tab-bar > div.x-tab-bar-body > div.x-horizontal-box-overflow-body > div';
function enableSidebarSort() {
    var parentNode = document.querySelector(parentNodeQuery);


    if (!parentNode) {
        console.log("Waiting for tabs to appear before sorting.");
        setTimeout(enableSidebarSort, 3000);
        return;
    }

    /* DEPRECATED - Using MutationObserver now.
    console.log('Adding event listener')
    parentNode.addEventListener("DOMNodeInserted", function (ev) {
        if (ev.relatedNode == parentNode) {
            sortem();
        }
    });
    */

    // Select the node that will be observed for mutations
    var targetNode = parentNode;

    // Options for the observer (which mutations to observe)
    var config = { attributes: false, childList: true, subtree: false };

    // Callback function to execute when mutations are observed
    var callback = function () {
        sortem()
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    sortem();
}

function sortem() {

    var parentNode = document.querySelector(parentNodeQuery);
    console.log('sortem...', parentNode);
    parentNode.style.display = "flex";
    parentNode.style["flex-flow"] = "column";

    var items = parentNode.children;

    // Coerce into an array
    items = [].slice.call(items);

    // Now we can sort it.  Sort alphabetically
    items.sort(function (a, b) {
        var firstFileName = simplifyName(a.textContent);
        var secondFileName = simplifyName(b.textContent);


        return firstFileName.localeCompare(secondFileName);
    });

    items.forEach(function (item, index) {
        item.title = item.textContent;
        item.style.order = index;
    });
}

/**
 * Files for a component have names like File.cmp, FileController.js, FileHelper.js which
 * are usually grouped together alphabetically but if there are other files like FileSave.cmp
 * it can mix files of two components together when sorted.
 * 
 * This method changes a filename by removing the suffix when the suffix is Controller.js (or
 * similar) and replacing it with something more cleanly sortable (such as .0 .1 .2)
 * 
 * @param {string} filename 
 */
function simplifyName(filename) {
    var groupApexClasses = false;

    var result = filename;
    var suffixes = {
        '.cmp': '.1',
        'Controller.js': '.2',
        'Helper.js': '.3',
        '.apxc': '.4'
    }

    // Group Apex Classes together at the top
    if (groupApexClasses) {
        if (filename.endsWith('.apxc')) {
            result = '1' + result;
        } else {
            result = '2' + result;
        }
    }

    for (var propertyName in suffixes) {
        if (result.endsWith(propertyName)) {
            // Replace the suffix with the sorting value
            result = result.replace(propertyName, suffixes[propertyName]);
            return result;
        }
    }
    return result + '.0';
}

enableSidebarSort();
