let mdInput = document.getElementById('mdInput');
let htmlOutput = document.getElementById('htmlOutput');
let previewFrame = document.getElementById('previewFrame');


window.onload = function() {
    var savedValue = localStorage.getItem("mdInputValue");
    if (savedValue) {
        mdInput.value = savedValue;
    }
    updateFields()
};

function copyToClipboard(inBox) {
    let cTextBox = document.getElementById(inBox);
    cTextBox.select();
    document.execCommand("copy");
    cTextBox.blur();
    alert("Text copied to clipboard!");
}


function pasteFromClipboard(pBox) {
    let pTextBox = document.getElementById(pBox);
    let pasteStatus = false;

    try {
        navigator.clipboard.readText().then(text => {
            pTextBox.value = text;
            pasteStatus = true;
    
        });
    }
    catch(err) {
        console.error("Browser does not support clipboard access!");
        alert("Browser does not support clipboard access!");
    }
}

function updateFields() {
    convertToHTML()
    updatePreview()
    localStorage.setItem("mdInputValue", mdInput.value);
}

function updatePreview() {
    previewFrame.srcdoc = htmlOutput.value;
}

let defaultHeader = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<style>\n\t\tbody {\n\t\t\tbackground-color: #0D1117;\n\t\t}\n\t\tp,h1,h2,h3,h4,h5,h6,li,em,strong,s,code {\n\t\t\tcolor:white;\n\t\t}\n\t\tblockquote {\n\t\t\tborder-left:4px solid #515151;\n\t\t\tbackground-color:#212529;\n\t\t\tpadding:5px;\n\t\t\tborder-radius:5px;\n\t\t\tcolor:white;\n\t\t}\n\t\tth,td {\n\t\t\tborder:1px solid white;\n\t\t\tcolor:white;\n\t\t\tpadding:5px;\n\t\t}\n\t\ttable {\n\t\t\tborder-collapse: collapse;\n\t\t}\n\t\timg {\n\t\t\tmargin:10px 5px 5px 5px;\n\t\t}\n\t\ttextarea {\n\t\t\t-moz-tab-size : 4;\n\t\t\t-o-tab-size : 4;\n\t\t\ttab-size : 4;\n\t\t}\n\t\tpre {\n\t\t\tcolor:green;\n\t\t\tpadding:20px;\n\t\t\tbackground-color:#161B22;\n\t\t\tborder-radius:6px;\n\t\t}\n\t</style>\n</head>\n<body>\n';
let deafultFooter = '</body>\n</html>';

function convertToHTML() {
    let inputMdCode = mdInput.value;

    outHtml = marked.parse(inputMdCode);
    console.log(outHtml);
    
    htmlOutput.value = defaultHeader+outHtml+deafultFooter;
}