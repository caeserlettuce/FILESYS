 
var canvas;
var gl;
var prog;
var bufObj = {};
var textureObj;
var maskTextureObj;
var ShProg = {};

function  render(delteMS){

    var vp = [canvas.width, canvas.height];
    var distortion = document.getElementById( "distortion" ).value / 100.0;
    var rgbShift = document.getElementById( "rgbshift" ).value / 1000.0;
    var stripes = document.getElementById( "stripes" ).value / 100.0;

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.enable( gl.DEPTH_TEST );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    var texUnit = 0;
    gl.activeTexture( gl.TEXTURE0 + texUnit );
    gl.bindTexture( gl.TEXTURE_2D, textureObj );
    ShProg.Use( progDraw );
    ShProg.SetI1( progDraw, "u_texture", texUnit );
    ShProg.SetF1( progDraw, "u_distortion", distortion );
    ShProg.SetF1( progDraw, "u_stripe", stripes );
    ShProg.SetF1( progDraw, "u_rgbshift", rgbShift );
    VertexBuffer.Draw( bufRect );

    requestAnimationFrame(render);
}  

function resize() {
    vp_size = [window.innerWidth, window.innerHeight];
    //vp_size = [256, 256]
    canvas.width = vp_size[0];
    canvas.height = vp_size[1];
}

function init() {

    canvas = document.getElementById( "retro-canvas");
    gl = canvas.getContext( "experimental-webgl" );
    //gl = canvas.getContext( "webgl2" );
    if ( !gl )
    return;

    var texCX = 128;
    var texCY = 128;
    var texPlan = [];
    for (ix = 0; ix < texCX; ++ix) {
        for (iy = 0; iy < texCY; ++iy) {
            var val_x = Math.sin( Math.PI * 6.0 * ix / texCX )
            var val_y = Math.sin( Math.PI * 6.0 * iy / texCY )
            texPlan.push( 128 + 127 * val_x, 63, 128 + 127 * val_y, 255 );
        }
    }

    textureObj = Texture.LoadTexture2D( "https://raw.githubusercontent.com/Rabbid76/graphics-snippets/master/resource/texture/supermario.jpg" );
    
    progDraw = ShProg.Create( 
    [ { source : "draw-shader-vs", stage : gl.VERTEX_SHADER },
        { source : "draw-shader-fs", stage : gl.FRAGMENT_SHADER }
    ] );
    progDraw.inPos = gl.getAttribLocation( progDraw.progObj, "inPos" );
    if ( progDraw.progObj == 0 )
        return;

    bufRect = VertexBuffer.Create(
    [ { data :  [ -1, -1, 1, -1, 1, 1, -1, 1 ], attrSize : 2, attrLoc : progDraw.inPos } ],
    [ 0, 1, 2, 0, 2, 3 ] );

    window.onresize = resize;
    resize();
    requestAnimationFrame(render);
}

var ShProg = {
Create: function (shaderList) {
    var shaderObjs = [];
    for (var i_sh = 0; i_sh < shaderList.length; ++i_sh) {
        var shderObj = this.Compile(shaderList[i_sh].source, shaderList[i_sh].stage);
        if (shderObj) shaderObjs.push(shderObj);
    }
    var prog = {}
    prog.progObj = this.Link(shaderObjs)
    if (prog.progObj) {
        prog.attrInx = {};
        var noOfAttributes = gl.getProgramParameter(prog.progObj, gl.ACTIVE_ATTRIBUTES);
        for (var i_n = 0; i_n < noOfAttributes; ++i_n) {
            var name = gl.getActiveAttrib(prog.progObj, i_n).name;
            prog.attrInx[name] = gl.getAttribLocation(prog.progObj, name);
        }
        prog.uniLoc = {};
        var noOfUniforms = gl.getProgramParameter(prog.progObj, gl.ACTIVE_UNIFORMS);
        for (var i_n = 0; i_n < noOfUniforms; ++i_n) {
            var name = gl.getActiveUniform(prog.progObj, i_n).name;
            prog.uniLoc[name] = gl.getUniformLocation(prog.progObj, name);
        }
    }
    return prog;
},
AttrI: function (prog, name) { return prog.attrInx[name]; },
UniformL: function (prog, name) { return prog.uniLoc[name]; },
Use: function (prog) { gl.useProgram(prog.progObj); },
SetI1: function (prog, name, val) { if (prog.uniLoc[name]) gl.uniform1i(prog.uniLoc[name], val); },
SetF1: function (prog, name, val) { if (prog.uniLoc[name]) gl.uniform1f(prog.uniLoc[name], val); },
SetF2: function (prog, name, arr) { if (prog.uniLoc[name]) gl.uniform2fv(prog.uniLoc[name], arr); },
SetF3: function (prog, name, arr) { if (prog.uniLoc[name]) gl.uniform3fv(prog.uniLoc[name], arr); },
SetF4: function (prog, name, arr) { if (prog.uniLoc[name]) gl.uniform4fv(prog.uniLoc[name], arr); },
SetM33: function (prog, name, mat) { if (prog.uniLoc[name]) gl.uniformMatrix3fv(prog.uniLoc[name], false, mat); },
SetM44: function (prog, name, mat) { if (prog.uniLoc[name]) gl.uniformMatrix4fv(prog.uniLoc[name], false, mat); },
Compile: function (source, shaderStage) {
    var shaderScript = document.getElementById(source);
    if (shaderScript)
        source = shaderScript.text;
    var shaderObj = gl.createShader(shaderStage);
    gl.shaderSource(shaderObj, source);
    gl.compileShader(shaderObj);
    var status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS);
    if (!status) alert(gl.getShaderInfoLog(shaderObj));
    return status ? shaderObj : null;
},
Link: function (shaderObjs) {
    var prog = gl.createProgram();
    for (var i_sh = 0; i_sh < shaderObjs.length; ++i_sh)
        gl.attachShader(prog, shaderObjs[i_sh]);
    gl.linkProgram(prog);
    status = gl.getProgramParameter(prog, gl.LINK_STATUS);
    if ( !status ) alert(gl.getProgramInfoLog(prog));
    return status ? prog : null;
} };

var VertexBuffer = {
Create: function(attribs, indices, type) {
    var buffer = { buf: [], attr: [], inx: gl.createBuffer(), inxLen: indices.length, primitive_type: type ? type : gl.TRIANGLES };
    for (var i=0; i<attribs.length; ++i) {
        buffer.buf.push(gl.createBuffer());
        buffer.attr.push({ size : attribs[i].attrSize, loc : attribs[i].attrLoc, no_of: attribs[i].data.length/attribs[i].attrSize });
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buf[i]);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( attribs[i].data ), gl.STATIC_DRAW);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    if ( buffer.inxLen > 0 ) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.inx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
    return buffer;
},
Draw: function(bufObj) {
    for (var i=0; i<bufObj.buf.length; ++i) {
        gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.buf[i]);
        gl.vertexAttribPointer(bufObj.attr[i].loc, bufObj.attr[i].size, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray( bufObj.attr[i].loc);
    }
    if ( bufObj.inxLen > 0 ) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx);
        gl.drawElements(bufObj.primitive_type, bufObj.inxLen, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
    }
    else
        gl.drawArrays(bufObj.primitive_type, 0, bufObj.attr[0].no_of );
    for (var i=0; i<bufObj.buf.length; ++i)
        gl.disableVertexAttribArray(bufObj.attr[i].loc);
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
} };

var Texture = {};
Texture.HandleLoadedTexture2D = function( image, texture, flipY ) {
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, flipY != undefined && flipY == true );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.bindTexture( gl.TEXTURE_2D, null );
    return texture;
}
Texture.LoadTexture2D = function( name ) {
    var texture = gl.createTexture();
    texture.image = new Image();
    texture.image.setAttribute('crossorigin', 'anonymous');
    texture.image.onload = function () {
        Texture.HandleLoadedTexture2D( texture.image, texture, false )
    }
    texture.image.src = name;
    return texture;
}
       
init();