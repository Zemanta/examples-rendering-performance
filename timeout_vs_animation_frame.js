var start_time = (new Date()).getTime();

var st = {
    $elm: $('#st'),
    len: 0,
    $disp: $('#time_st')
};
var af = {
    $elm: $('#af'),
    len: 0,
    $disp: $('#time_af')
};

function heavy_process(){
    var stoptime = 15;
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < stoptime){}
}

function render(obj){
    heavy_process();
    obj.$elm.css('width', obj.len +'px');
    obj.len += 1;
    if(obj.len > 300){
        obj.$disp.text((new Date()).getTime() - start_time);
        return false;
    }
    return true;
}

(function st_loop(){
    if( !render(st) ){
        return false;
    }
    setTimeout(st_loop, 16.667);
}());
(function af_loop(){
    if( !render(af) ){
        return false;
    }
    requestAnimationFrame(af_loop);
}());
