let imageData;console.log("Loaded WebGL.js");var imageWidth=void 0,imageHeight=void 0;function supportsWebGL(){try{var e=document.createElement("canvas");return!!window.WebGLRenderingContext&&(e.getContext("webgl")||e.getContext("experimental-webgl"))}catch(e){return!1}}const vsSource="\n  attribute vec4 aVertexPosition;\n  attribute vec2 aTextureCoord;\n\n  varying highp vec2 vTextureCoord;\n\n  void main(void) {\n    gl_Position = aVertexPosition;\n    vTextureCoord = aTextureCoord;\n  }\n";var fsSource="\n  precision lowp float;\n  varying highp vec2 vTextureCoord;\n  uniform vec2 u_textureSize;\n\n  uniform sampler2D uSampler;\n\n  void main(void) {\n    vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;\n\n    gl_FragColor = vec4(0.0,0.0,0.0,1.0);\n  }\n";function fsSetup(e){if(0===e[0].length&&0===e[1].length&&0===e[2].length)return fsSource;let t="\n    precision lowp float;\n    varying highp vec2 vTextureCoord;\n    uniform vec2 u_textureSize;\n\n    uniform sampler2D uSampler;\n    vec4 shift = vec4(0.1,0.0,0.0,0.0);\n\n    void main(void) {\n      vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;\n      vec4 sum = vec4(0.0, 0.0, 0.0, 1.0);\n\n  ";for(let r=0;r<e.length;++r){let o;o=0===r?"r":1===r?"g":"b";let n="+";for(let i of e[r])"sign"===i.type?n=i.info:t+=`sum.${o} ${n}= texture2D(uSampler, vTextureCoord + onePixel * vec2(${i.loc.toString()})).${i.color};`}return t+="gl_FragColor = sum;}",console.log(t),t}function filterGL(e,t,r){fsSource=fsSetup(r,fsSource),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0);const o=initBuffers(e),n=initShaderProgram(e,vsSource,fsSource),i={program:n,attribLocations:{vertexPosition:e.getAttribLocation(n,"aVertexPosition"),textureCoord:e.getAttribLocation(n,"aTextureCoord")},uniformLocations:{uSampler:e.getUniformLocation(n,"uSampler"),textureSizeLocation:e.getUniformLocation(n,"u_textureSize")}};loadTexture(e,t,i,o)}function initBuffers(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,1]),e.STATIC_DRAW);const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r);e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,1,1,0,1]),e.STATIC_DRAW);const o=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,o);return e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),{position:t,textureCoord:r,indices:o}}function loadTexture(e,t,r,o){const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const i=e.RGBA,a=e.RGBA,c=e.UNSIGNED_BYTE,u=new Uint8Array([0,0,0,255]);e.texImage2D(e.TEXTURE_2D,0,i,1,1,0,a,c,u);const s=new Image;return s.onload=function(){imageWidth=s.width,imageHeight=s.height,e.canvas.width=imageWidth,e.canvas.height=imageHeight;e.canvas.style.width=(s.width/s.height*600).toString()+"px",e.canvas.style.height=600..toString()+"px",e.viewport(0,0,e.canvas.width,e.canvas.height),e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,i,a,c,s),isPowerOf2(s.width)&&isPowerOf2(s.height)?e.generateMipmap(e.TEXTURE_2D):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)),drawScene(e,r,o,n),B_download.style.display="block"},s.src=t,n}function isPowerOf2(e){return 0==(e&e-1)}function drawScene(e,t,r,o){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);{const o=2,n=e.FLOAT,i=!1,a=0,c=0;e.bindBuffer(e.ARRAY_BUFFER,r.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,o,n,i,a,c),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}{const o=2,n=e.FLOAT,i=!1,a=0,c=0;e.bindBuffer(e.ARRAY_BUFFER,r.textureCoord),e.vertexAttribPointer(t.attribLocations.textureCoord,o,n,i,a,c),e.enableVertexAttribArray(t.attribLocations.textureCoord)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r.indices),e.useProgram(t.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,o),e.uniform2f(t.uniformLocations.textureSizeLocation,imageWidth,imageHeight),e.uniform1i(t.uniformLocations.uSampler,0);{const t=6,r=e.UNSIGNED_SHORT,o=0;e.drawElements(e.TRIANGLE_STRIP,t,r,o),imageData=e.canvas.toDataURL("image/png",1)}}function initShaderProgram(e,t,r){const o=loadShader(e,e.VERTEX_SHADER,t),n=loadShader(e,e.FRAGMENT_SHADER,r),i=e.createProgram();return e.attachShader(i,o),e.attachShader(i,n),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?i:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(i)),null)}function loadShader(e,t,r){const o=e.createShader(t);return e.shaderSource(o,r),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(o)),e.deleteShader(o),null)}
