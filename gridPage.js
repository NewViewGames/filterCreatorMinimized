const xSize=document.getElementById("xSize"),ySize=document.getElementById("ySize"),grid=document.getElementById("grid");var currBox=document.getElementById("redEq");const filterButton=document.getElementById("filter"),pictureBox=document.getElementById("pictureFile"),addNum=document.getElementById("addNum"),numBox=document.getElementById("customNum"),urlBox=document.getElementById("pictureUrl"),redButton=document.getElementById("redSquare"),greenButton=document.getElementById("greenSquare"),blueButton=document.getElementById("blueSquare"),equationButtons=[redButton,greenButton,blueButton],redEq=document.getElementById("redEq"),greenEq=document.getElementById("greenEq"),blueEq=document.getElementById("blueEq"),equationBoxes=[redEq,greenEq,blueEq],open=document.getElementById("openParen"),closed=document.getElementById("closedParen");console.log("Running JS"),remakeGrid(),open.addEventListener("click",()=>addSign("(")),closed.addEventListener("click",()=>addSign(")")),document.getElementById("sizeInput").addEventListener("submit",remakeGrid),filterButton.addEventListener("click",filterDataGather),addNum.addEventListener("click",e=>{currBox.childElementCount>0&&addSign("+");let t=createSquare(numBox.value,[],"value");t.value=numBox.value,currBox.appendChild(t)});for(let e of equationButtons)e.addEventListener("click",switchEquation);function setup(){}function remakeGrid(){grid.innerHTML="";let e="repeat("+ySize.value.toString()+", 50px)",t="repeat("+xSize.value.toString()+", 50px)";grid.style["grid-template-columns"]=e,grid.style["grid-template-rows"]=t;for(let e=-(xSize.value-1)/2;e<=(xSize.value-1)/2;++e)for(let t=-(ySize.value-1)/2;t<=(ySize.value-1)/2;++t){let n=createSquare(t.toString()+","+e.toString(),[{name:"XgridIndex",value:t},{name:"YgridIndex",value:e}],"square");n.addEventListener("click",e=>{addToEquation(e.target)}),grid.appendChild(n)}}function createSquare(e,t,n){let r=document.createElement("BUTTON");r.innerHTML=e,r.className="gridSquares",r.type=n;for(let e of t)r.setAttribute(e.name,e.value);return r}function switchEquation(e){switch(e.target.id){case"redSquare":currBox=redEq;break;case"greenSquare":currBox=greenEq;break;case"blueSquare":currBox=blueEq}}function addSign(e){let t=document.createElement("BUTTON");t.className="signs",t.innerHTML=e,t.sign=e,t.type="sign",t.addEventListener("click",changeSign),currBox.appendChild(t)}function changeSign(e){let t=e.target;switch(t.innerHTML){case"+":t.innerHTML="-",t.sign="-";break;case"-":t.innerHTML="*",t.sign="*";break;case"*":t.innerHTML="/",t.sign="/";break;case"/":t.innerHTML="+",t.sign="+"}}function changeColor(e){switch(e.color){case 0:e.style["background-color"]="rgb(0, 255, 0)",e.color=1;break;case 1:e.style["background-color"]="rgb(0, 0, 255)",e.color=2;break;case 2:case void 0:default:e.style["background-color"]="rgb(255, 0, 0)",e.color=0}}function equationSquares(e){let t=e.target;changeColor(t),!0===e.ctrlKey&&t.remove()}function addToEquation(e){let t=currBox.childNodes[currBox.childNodes.length-1];void 0!==t&&"square"===t.getAttribute("type")&&addSign("+");let n=e.cloneNode(!0);n.style["background-color"]="rgb(255, 0, 0)",n.color=0,n.addEventListener("click",equationSquares),currBox.appendChild(n)}function equationsToArray(e){let t=[];function n(e,t){let n=t.getAttribute("type");return void 0===n&&console.log("Undefined type warning."),"square"===n&&e.push({loc:[t.getAttribute("XgridIndex"),t.getAttribute("YgridIndex")],color:t.color,type:"square"}),"sign"===n&&e.push({sign:t.innerHTML,type:"sign"}),"value"===n&&e.push({value:t.value,type:"value"}),e}for(let r of e)t.push(nodeListToArr(r.childNodes).reduce(n,[]));return t}function nodeListToArr(e){return Array.from(e)}xSize.addEventListener("change",()=>{ySize.value=xSize.value}),ySize.addEventListener("change",()=>{xSize.value=ySize.value}),setup();const canvasBefore=document.getElementById("canvasBefore"),canvasAfter=document.getElementById("canvasAfter"),ctxA=canvasBefore.getContext("2d"),ctxB=canvasAfter.getContext("2d");function filterDataGather(){if(void 0===pictureBox.files[0]&&""===urlBox.value)return void window.alert("Please supply an image file or URL.");let e=equationsToArray(equationBoxes),t=void 0;const n=new Image;if(n.crossOrigin="Anonymous",n.addEventListener("load",function(){ctxA.canvas.width=n.width,ctxA.canvas.height=n.height,ctxB.canvas.width=n.width,ctxB.canvas.height=n.height,ctxA.drawImage(n,0,0),t=ctxA.getImageData(0,0,n.width,n.height),setTimeout(()=>{filterImage(t,e,n.height,n.width)},0)}),""!==urlBox.value){let e=urlBox.value;try{new URL(e)}catch(e){return console.log(e),void window.alert("URL did not work.\n\nGenerated Error: \n"+e.toString())}n.src=e}else n.src=URL.createObjectURL(pictureBox.files[0])}function filterImage(e,t,n,r){console.log("FilterStart");let o=e.data,a=new Uint8ClampedArray(o.length);function i(e){let n=[0,0,0,255];for(let a=0;a<t.length;++a){let i="";for(let n of t[a]){if("square"===n.type){let t=findColorIndx(e,n.loc,r,o.length,n.color);t>=0?void 0===o[t]?(console.log("Undefined pixel location: "+t.toString()),i+="0"):i+=o[t]:i+="0"}"sign"===n.type&&(i+=n.sign),"value"===n.type&&(i+=n.value)}n[a]=math.evaluate(i)}a[e]=n[0],a[e+1]=n[1],a[e+2]=n[2],a[e+3]=n[3]}let l=0;for(;l<o.length;){if(i(l),l%(4*r)==0){let e=new ImageData(a,r,n);ctxB.putImageData(e,0,0)}l+=4}let d=new ImageData(a,r,n);ctxB.putImageData(d,0,0),console.log("Filter Image End")}function findColorIndx(e,t,n,r,o){let a=4*t[0],i=4*t[1]*n;return i+e<0||i+e>=r||a+e<0||a+e>=r?-1:e+i+a+o}
