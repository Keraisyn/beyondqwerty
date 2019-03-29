var layout = "qwerty";
var dvorak = {81:222, 87:188, 69:190, 82:80, 84:89, 89:70, 85:71, 73:67, 79:82, 80:76, 219:191, 221:187,
            65:65, 83:79, 68:69, 70:85, 71:73, 72:68, 74:72, 75:84, 76:78, 186:83, 222:189,
            90:186, 88:81, 67:74, 86:75, 66:88, 78:66, 77:77, 188:87, 190:86, 191:90};

// Gets key from event
function getKey (e) {
    var location = e.location;
    var selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + e.keyCode + '-R"]']
    } else {
        var code = e.keyCode || e.which;
        if (layout == "dvorak" && code in dvorak) {
            code = dvorak[code];
        }
        selector = [
            '[data-key="' + code + '"]',
            '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
        ].join(',');
    }
    return document.querySelector(selector);
}

function pressKey (char) {
    var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
    if (!key) {
        return console.warn('No key for', char);
    }
    key.setAttribute('data-pressed', 'on');
    setTimeout(function () {
        key.removeAttribute('data-pressed');
    }, 200);
}

var h1 = document.getElementById("h1");
var originalQueue = h1.innerHTML;
var queue = h1.innerHTML;

var titletext = document.getElementById("titletext");
var originalQueue = titletext.innerHTML;
var queue = titletext.innerHTML;

// The little animation thing
function next () {
    var c = queue[0];
    queue = queue.slice(1);
    titletext.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKey(c);
    if (queue.length) {
        setTimeout(next, Math.random() * 200 + 50);
    }
}


function type(key) {
    h1 = document.getElementById("h1");
    children = key.childNodes;
    var x = 1;

    if (key.classList.contains("key--space")) {
        x = 0;
        h1.textContent = h1.textContent + " ";
    }

    if (children.length == 3) {
        if (children[1].textContent == "delete") {
            x = 0;
            h1.textContent = h1.textContent.substr(0, h1.textContent.length - 1);
        } else if (children[1].textContent == "return") {
            x = 0;
            h1.textContent = h1.textContent + "<\r\n>";
        }
    }

    if (document.getElementsByClassName("key--w6")[0].getAttribute("data-pressed") == "on" || document.getElementsByClassName("key--w6")[1].getAttribute("data-pressed") == "on") {
        if (children.length == 1) {
            h1.textContent = h1.textContent + children[0].textContent;
        } else {
            if (children[1].textContent != "shift") {
                h1.textContent = h1.textContent + children[1].textContent;
            }
        }
    } else {
        if (x==1) {
            if (key.classList.contains("key--double")) {
                h1.textContent = h1.textContent + children[3].textContent;
            } else {
                h1.textContent = h1.textContent + children[0].textContent.toLowerCase();
            }
        }
    }
}

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

document.body.addEventListener('keydown', function (e) {
    var key = getKey(e);
    if (!key) {
        return console.warn('No key for', e.keyCode);
    }

    key.setAttribute('data-pressed', 'on');

    type(key)
});

document.body.addEventListener('keyup', function (e) {
    var key = getKey(e);
    key && key.removeAttribute('data-pressed');
});

var keyboard = document.getElementById("keyboard");

function size () {
    let size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
    console.log(size);
}

window.addEventListener('resize', function (e) {
    size();
});
size();






// Changes layouts
function changeLayout(lay) {
    keyboard = document.getElementById("keyboard");
    if (lay=="dvorak") {
        layout = "dvorak";
        keyboard.innerHTML = `
    <div class="keyboard__row keyboard__row--h1">
    <div data-key="27" class="key--word">
        <span>esc</span>
    </div>
    <div data-key="112" class="key--fn">
        <span>F1</span>
    </div>
    <div data-key="113" class="key--fn">
        <span>F2</span>
    </div>
    <div data-key="114" class="key--fn">
        <span>F3</span>
    </div>
    <div data-key="115" class="key--fn">
        <span>F4</span>
    </div>
    <div data-key="116" class="key--fn">
        <span>F5</span>
    </div>
    <div data-key="117" class="key--fn">
        <span>F6</span>
    </div>
    <div data-key="118" class="key--fn">
        <span>F7</span>
    </div>
    <div data-key="119" class="key--fn">
        <span>F8</span>
    </div>
    <div data-key="120" class="key--fn">
        <span>F9</span>
    </div>
    <div data-key="121" class="key--fn">
        <span>F10</span>
    </div>
    <div data-key="122" class="key--fn">
        <span>F11</span>
    </div>
    <div data-key="123" class="key--fn">
        <span>F12</span>
    </div>
    <div data-key="n/a" class="key--word">
        <span>pwr</span>
    </div>
</div>
<div class="keyboard__row">
    <div class="key--double" data-key="192">
        <div>~</div>
        <div>\`</div>
    </div>
    <div class="key--double" data-key="49">
        <div>!</div>
        <div>1</div>
    </div>
    <div class="key--double" data-key="50">
        <div>@</div>
        <div>2</div>
    </div>
    <div class="key--double" data-key="51">
        <div>#</div>
        <div>3</div>
    </div>
    <div class="key--double" data-key="52">
        <div>$</div>
        <div>4</div>
    </div>
    <div class="key--double" data-key="53">
        <div>%</div>
        <div>5</div>
    </div>
    <div class="key--double" data-key="54">
        <div>^</div>
        <div>6</div>
    </div>
    <div class="key--double" data-key="55">
        <div>&</div>
        <div>7</div>
    </div>
    <div class="key--double" data-key="56">
        <div>*</div>
        <div>8</div>
    </div>
    <div class="key--double" data-key="57">
        <div>(</div>
        <div>9</div>
    </div>
    <div class="key--double" data-key="48">
        <div>)</div>
        <div>0</div>
    </div>
    <div class="key--double" data-key="219">
        <div>{</div>
        <div>[</div>
    </div>
    <div class="key--double" data-key="221">
        <div>}</div>
        <div>]</div>
    </div>
    <div class="key--bottom-right key--word key--w4" data-key="8">
        <div>delete</div>
    </div>
</div>

<div class="keyboard__row">
    <div class="key--bottom-left key--word key--w4" data-key="9">
        <span>tab</span>
    </div>
    <div class="key--double" data-key="222">
        <div>"</div>
        <div>'</div>
    </div>
    <div class="key--double" data-key="188">
        <div><</div>
        <div>,</div>
    </div>
    <div class="key--double" data-key="190">
        <div>></div>
        <div>.</div>
    </div>
    <div class="key--letter" data-char="P">P</div>
    <div class="key--letter" data-char="Y">Y</div>
    <div class="key--letter" data-char="F">F</div>
    <div class="key--letter" data-char="G">G</div>
    <div class="key--letter" data-char="C">C</div>
    <div class="key--letter" data-char="R">R</div>
    <div class="key--letter" data-char="L">L</div>
    <div class="key--double" data-key="191">
        <div>?</div>
        <div>/</div>
    </div>
    <div class="key--double" data-key="187">
        <div>+</div>
        <div>=</div>
    </div>
    <div class="key--double" data-key="220" data-char="|\\">
        <div>|</div>
        <div>\\</div>
    </div>
</div>
<div class="keyboard__row">
    <div class="key--bottom-left key--word key--w5" data-key="20">
        <span>caps lock</span>
    </div>
    <div class="key--letter" data-char="A">A</div>
    <div class="key--letter" data-char="O">O</div>
    <div class="key--letter" data-char="E">E</div>
    <div class="key--letter" data-char="U">U</div>
    <div class="key--letter" data-char="I">I</div>
    <div class="key--letter" data-char="D">D</div>
    <div class="key--letter" data-char="H">H</div>
    <div class="key--letter" data-char="T">T</div>
    <div class="key--letter" data-char="N">N</div>
    <div class="key--letter" data-char="S">S</div>
    <div class="key--double" data-key="189">
        <div>_</div>
        <div>-</div>
    </div>
    <div class="key--bottom-right key--word key--w5" data-key="13">
        <span>return</span>
    </div>
</div>
<div class="keyboard__row">
    <div class="key--bottom-left key--word key--w6" data-key="16">
        <span>shift</span>
    </div>
    <div class="key--double" data-key="186">
        <div>:</div>
        <div>;</div>
    </div>
    <div class="key--letter" data-char="Q">Q</div>
    <div class="key--letter" data-char="J">J</div>
    <div class="key--letter" data-char="K">K</div>
    <div class="key--letter" data-char="X">X</div>
    <div class="key--letter" data-char="B">B</div>
    <div class="key--letter" data-char="M">M</div>
    <div class="key--letter" data-char="W">W</div>
    <div class="key--letter" data-char="V">V</div>
    <div class="key--letter" data-char="Z">Z</div>
    <div class="key--bottom-right key--word key--w6" data-key="16-R">
        <span>shift</span>
    </div>
</div>
<div class="keyboard__row keyboard__row--h3">
    <div class="key--bottom-left key--word">
        <span>fn</span>
    </div>
    <div class="key--bottom-left key--word key--w1" data-key="17">
        <span>control</span>
    </div>
    <div class="key--bottom-left key--word key--w1" data-key="18">
        <span>option</span>
    </div>
    <div class="key--bottom-right key--word key--w3" data-key="91">
        <span>command</span>
    </div>
    <div class="key--double key--right key--space" data-key="32" data-char=" ">
        &nbsp;
    </div>
    <div class="key--bottom-left key--word key--w3" data-key="93-R">
        <span>command</span>
    </div>
    <div class="key--bottom-left key--word key--w1" data-key="18-R">
        <span>option</span>
    </div>
    <div data-key="37" class="key--arrow">
        <span>&#9664;</span>
    </div>
    <div class="key--double key--arrow--tall" data-key="38">
        <div>&#9650;</div>
        <div>&#9660;</div>
    </div>
    <div data-key="39" class="key--arrow">
        <span>&#9654;</span>
    </div>
</div>`
    } else {
        layout="qwerty";
        keyboard.innerHTML = `<div class="keyboard__row keyboard__row--h1">
            <div data-key="27" class="key--word">
                <span>esc</span>
            </div>
            <div data-key="112" class="key--fn">
                <span>F1</span>
            </div>
            <div data-key="113" class="key--fn">
                <span>F2</span>
            </div>
            <div data-key="114" class="key--fn">
                <span>F3</span>
            </div>
            <div data-key="115" class="key--fn">
                <span>F4</span>
            </div>
            <div data-key="116" class="key--fn">
                <span>F5</span>
            </div>
            <div data-key="117" class="key--fn">
                <span>F6</span>
            </div>
            <div data-key="118" class="key--fn">
                <span>F7</span>
            </div>
            <div data-key="119" class="key--fn">
                <span>F8</span>
            </div>
            <div data-key="120" class="key--fn">
                <span>F9</span>
            </div>
            <div data-key="121" class="key--fn">
                <span>F10</span>
            </div>
            <div data-key="122" class="key--fn">
                <span>F11</span>
            </div>
            <div data-key="123" class="key--fn">
                <span>F12</span>
            </div>
            <div data-key="n/a" class="key--word">
                <span>pwr</span>
            </div>
        </div>
        <div class="keyboard__row">
            <div class="key--double" data-key="192">
                <div>~</div>
                <div>\`</div>
            </div>
            <div class="key--double" data-key="49">
                <div>!</div>
                <div>1</div>
            </div>
            <div class="key--double" data-key="50">
                <div>@</div>
                <div>2</div>
            </div>
            <div class="key--double" data-key="51">
                <div>#</div>
                <div>3</div>
            </div>
            <div class="key--double" data-key="52">
                <div>$</div>
                <div>4</div>
            </div>
            <div class="key--double" data-key="53">
                <div>%</div>
                <div>5</div>
            </div>
            <div class="key--double" data-key="54">
                <div>^</div>
                <div>6</div>
            </div>
            <div class="key--double" data-key="55">
                <div>&</div>
                <div>7</div>
            </div>
            <div class="key--double" data-key="56">
                <div>*</div>
                <div>8</div>
            </div>
            <div class="key--double" data-key="57">
                <div>(</div>
                <div>9</div>
            </div>
            <div class="key--double" data-key="48">
                <div>)</div>
                <div>0</div>
            </div>
            <div class="key--double" data-key="189">
                <div>_</div>
                <div>-</div>
            </div>
            <div class="key--double" data-key="187">
                <div>+</div>
                <div>=</div>
            </div>
            <div class="key--bottom-right key--word key--w4" data-key="8">
                <div>delete</div>
            </div>
        </div>
        <div class="keyboard__row">
            <div class="key--bottom-left key--word key--w4" data-key="9">
                <span>tab</span>
            </div>
            <div class="key--letter" data-char="Q">Q</div>
            <div class="key--letter" data-char="W">W</div>
            <div class="key--letter" data-char="E">E</div>
            <div class="key--letter" data-char="R">R</div>
            <div class="key--letter" data-char="T">T</div>
            <div class="key--letter" data-char="Y">Y</div>
            <div class="key--letter" data-char="U">U</div>
            <div class="key--letter" data-char="I">I</div>
            <div class="key--letter" data-char="O">O</div>
            <div class="key--letter" data-char="P">P</div>
            <div class="key--double" data-key="219" data-char="{[">
                <div>{</div>
                <div>[</div>
            </div>
            <div class="key--double" data-key="221" data-char="}]">
                <div>}</div>
                <div>]</div>
            </div>
            <div class="key--double" data-key="220" data-char="|\\">
                <div>|</div>
                <div>\\</div>
            </div>
        </div>
        <div class="keyboard__row">
            <div class="key--bottom-left key--word key--w5" data-key="20">
                <span>caps lock</span>
            </div>
            <div class="key--letter" data-char="A">A</div>
            <div class="key--letter" data-char="S">S</div>
            <div class="key--letter" data-char="D">D</div>
            <div class="key--letter" data-char="F">F</div>
            <div class="key--letter" data-char="G">G</div>
            <div class="key--letter" data-char="H">H</div>
            <div class="key--letter" data-char="J">J</div>
            <div class="key--letter" data-char="K">K</div>
            <div class="key--letter" data-char="L">L</div>
            <div class="key--double" data-key="186">
                <div>:</div>
                <div>;</div>
            </div>
            <div class="key--double" data-key="222">
                <div>"</div>
                <div>'</div>
            </div>
            <div class="key--bottom-right key--word key--w5" data-key="13">
                <span>return</span>
            </div>
        </div>
        <div class="keyboard__row">
            <div class="key--bottom-left key--word key--w6" data-key="16">
                <span>shift</span>
            </div>
            <div class="key--letter" data-char="Z">Z</div>
            <div class="key--letter" data-char="X">X</div>
            <div class="key--letter" data-char="C">C</div>
            <div class="key--letter" data-char="V">V</div>
            <div class="key--letter" data-char="B">B</div>
            <div class="key--letter" data-char="N">N</div>
            <div class="key--letter" data-char="M">M</div>
            <div class="key--double" data-key="188">
                <div>&lt;</div>
                <div>,</div>
            </div>
            <div class="key--double" data-key="190">
                <div>&gt;</div>
                <div>.</div>
            </div>
            <div class="key--double" data-key="191">
                <div>?</div>
                <div>/</div>
            </div>
            <div class="key--bottom-right key--word key--w6" data-key="16-R">
                <span>shift</span>
            </div>
        </div>
        <div class="keyboard__row keyboard__row--h3">
            <div class="key--bottom-left key--word">
                <span>fn</span>
            </div>
            <div class="key--bottom-left key--word key--w1" data-key="17">
                <span>control</span>
            </div>
            <div class="key--bottom-left key--word key--w1" data-key="18">
                <span>option</span>
            </div>
            <div class="key--bottom-right key--word key--w3" data-key="91">
                <span>command</span>
            </div>
            <div class="key--double key--right key--space" data-key="32" data-char=" ">
                &nbsp;
            </div>
            <div class="key--bottom-left key--word key--w3" data-key="93-R">
                <span>command</span>
            </div>
            <div class="key--bottom-left key--word key--w1" data-key="18-R">
                <span>option</span>
            </div>
            <div data-key="37" class="key--arrow">
                <span>&#9664;</span>
            </div>
            <div class="key--double key--arrow--tall" data-key="38">
                <div>&#9650;</div>
                <div>&#9660;</div>
            </div>
            <div data-key="39" class="key--arrow">
                <span>&#9654;</span>
            </div>
        </div>`
    }

}

var checkbox = document.getElementById("start");

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        keyboard.style.transform = "translateX(-2000px)";
        setTimeout(function(){ changeLayout("dvorak"); keyboard.style.transform = '';}, 700);

    } else {
        keyboard.style.transform = "translateX(-2000px)";
        setTimeout(function () { changeLayout("qwerty"); keyboard.style.transform = '';}, 700);
    }
});
