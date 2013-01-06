//--------------------------------------
// Queue (FIFO)クラス
//--------------------------------------

console.log(background_img_path)
function Queue() {  this.list = new Array();};
Queue.prototype.enqueue = function(a) { this.list.push(a); };
Queue.prototype.dequeue = function() {
    if( this.list.length > 0 ) {
	return this.list.shift();
    }
    return null;
};
Queue.prototype.size = function() { return this.list.length; };
Queue.prototype.toString = function() { return '[' + this.list.join(',') + ']'; };
Queue.prototype.get = function(index){ return this.list[index]; };
Queue.prototype.randomRemove = function(){
    if( this.list.length > 0 ) {
	var index=parseInt(Math.random() * this.list.length);
	return this.remove(index);
    }
    return null;
};
Queue.prototype.remove = function(index){
    if( this.list.length > 0 ) {
	var element;
	var tmp = new Array();
	for (i = 0 ; i < this.list.length ; i++){
	    if(i == index){
		element = this.get(index);
	    }else{
		tmp.push(this.get(i));
	    }
	}
 	this.list = tmp ;
	return element;
    }
    return null;
};

//--------------------------------------
// Positionクラス
//--------------------------------------
function Position(x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.top = y1;
    this.left = x1;
    this.width = x2 - x1;
    this.height = y2 - y1;
    this.next = null;
}
Position.prototype.clone = function(){
    return new Position(this.x1, this.y1, this.x2, this.y2,this.index);
};



//--------------------------------------------------
//wnw.showライブラリ
//--------------------------------------------------
var wnw;
if (!wnw) wnw = {};
if (!wnw.show) wnw.show = {};
(function(){
    var libPath;
    function start(imgUrlList,message,path,topImageUrl,logoUrl){
        libPath = path;
        wnw.show.InitAnime.start(message,onInitAnimeFinish,topImageUrl,logoUrl);
        for (i = 0; i < imgUrlList.length ; i++) {
            wnw.show.Slider.addOldImg(imgUrlList[i]);
        }
    };
    function onInitAnimeFinish(){
        wnw.show.Slider.start();
    };
    function libPath(){
        return libPath;
    };
    function addImg(url){
        wnw.show.Slider.addNewImg(url);
    };
    //publicフィールド・関数定義
    wnw.show.start = start;
    wnw.show.libPath = libPath;
    wnw.show.addImg = addImg;
})();

//--------------------------------------------------
//wnw.show.InitAmineライブラリ
//--------------------------------------------------
if (!wnw.show.InitAnime) wnw.show.InitAnime = {};
(function(){
    function log(str){
        console.log("[wnw.show.InitAnime] " + str);
    };
    function Back(position,src,zIndex,opacity){
        this.position = position;
        this.src = src;
        this.zIndex = zIndex;
        this.opacity = opacity;
        this.img = $("<img />")
            .attr("src",src)
            .css("opacity",0);
        $("body").append(this.img);
    };
    Back.prototype.isLoad = function(){
        log(this.src + " size is " + this.img.width());
        //画像のサイズが24以下の場合はロードできていないと判断
        //(firefoxではロードできていないと画像サイズが24になる）
        return (this.img.width() >= 24);
    };
    Back.prototype.show = function(){
        log("view" + this.src);
        this.img.css({"position" : "absolute",
                      "top":this.position.top,
                      "left":this.position.left,
                      "width":this.position.width,
                      "height":this.position.height,
                      "z-index":this.zIndex});
        this.img.animate({"opacity":this.opacity},FADEIN_TIME);
    };
    Back.prototype.hide = function(){
        log("hide" + this.src);
        this.img.animate({"opacity":0},FADEIN_TIME);
    };

    FADEIN_TIME = 3000;

    //最初の写真を表示している時間
    PHOTO_SPAN = 15000;

    //封筒アニメーションの間隔
    ANIME_SPAN = 3000;

    //文字のタイピング関連
    var TYPE_CHAR_SPEED = 100;// 動作スピード
    var TYPE_CHAR_NL_TIME = 1000;//改行するときの停止時間
    var TYPE_CHAR_OPACITY = 1;
    var TYPE_CHAR_CURSOLE = '<span style="color:#ff00ff;">_</span>';// カーソルの形状（HTMLタグ可）
    var typeCharMessage;
    var typeCharDiv;

    var gBacks = new Array();
    var callbackFunction ;

    function start(msg,callback,topImageUrl,logoUrl){
        log("initAnime start");
        typeCharMessage=msg;
        callbackFunction = callback;
        log("callbackFunction:" + callbackFunction);
        log("wnw.show.LibPath:" + wnw.show.libPath());
        gBacks[0]=new Back(new Position(10,10,1200,750) , background_img_path,0,1);//背景のピンクの四角
        gBacks[1]=new Back(new Position(61,385,178,495) , env0_img_path,0,1);
        gBacks[2]=new Back(new Position(277,349,392,435) , env1_img_path,0,1);
        gBacks[3]=new Back(new Position(430,138,995,563) ,  env2_img_path,0,1);
        gBacks[4]=new Back(new Position(1024,337,1135,433) ,  env3_img_path,0,1);
        gBacks[5]=new Back(new Position(234,203,356,302) ,  env4_img_path,0,1);
        gBacks[6]=new Back(new Position(679,83,760,136) ,  env5_img_path,0,1);
        gBacks[7]=new Back(new Position(885,40,992,117) ,  env6_img_path,0,1);
        gBacks[8]=new Back(new Position(125,615,259,680) ,  env7_img_path,0,1);
        gBacks[9]=new Back(new Position(279,521,374,597) ,  env8_img_path,0,1);
        gBacks[10]=new Back(new Position(458,602,546,651) ,  env9_img_path,0,1);
        gBacks[11]=new Back(new Position(602,569,688,641) ,  env10_img_path,0,1);
        gBacks[12]=new Back(new Position(801,576,917,672) ,  env11_img_path,0,1);
        gBacks[13]=new Back(new Position(968,641,1070,740) ,  env12_img_path,0,1);
        gBacks[14]=new Back(new Position(10,10,800,210) , kirakira_img_path,255,1);
        gBacks[15]=new Back(new Position(430,148,995,563) ,  topImageUrl ,1,1);
        gBacks[16]=new Back(new Position(30,480,300,300) , logoUrl ,255,0.7);
        loadStep1();
    };

    //背景画像がロードできるまで待つ
    function loadStep1(){
        var _finishLoad = true;
        $.each(gBacks,function(){
            if (!(this.isLoad())){
                _finishLoad = false;
                log("NG:" + this.src );
            }else{
                log("OK:" + this.src );
            }
        });

        if(_finishLoad){
            log("loaded");
            loadStep2();
        }else{
            log("wait");
            setTimeout(loadStep1,1000);
        }
    };

    //キラキラ表示
    function loadStep2(){
        gBacks[0].show(); // 背景
        gBacks[14].show(); // キラキラ
        setTimeout(loadStep3,ANIME_SPAN);
    };

    //封筒がふわっと現れるアニメーション
    function loadStep3(){
        gBacks[1].show();
        gBacks[4].show();
        gBacks[7].show();
        gBacks[13].show();
        setTimeout(loadStep5,ANIME_SPAN);
    };

    //封筒がふわっと現れるアニメーション
    function loadStep5(){
        gBacks[2].show();
        gBacks[3].show();
        gBacks[5].show();
        gBacks[6].show();
        gBacks[9].show();
        //    gBacks[8].show();
        setTimeout(loadStep6,ANIME_SPAN);
    };

    //写真がふわっと現れるアニメーション
    function loadStep6(){
        gBacks[15].show();//写真
        setTimeout(loadStep7,ANIME_SPAN);
    };

    //文字表示
    function loadStep7(){
        typeCharDiv = $("<div />")
            .attr("id","str_div")
            .css({
                "color":"#B8860B",
                //    "text-shadow": "0px 0px 10px white",
                "top":570,
                "left":450,
                "font-size":30,
                //    "font-weight": "bold",
                "width":1000,
                "opacity": 1,
                "position":"absolute",
                "z-index":255,
                "font-family": "wnw_show_font",
                "padding":10
            });
        $("body").append(typeCharDiv);
        loadStep8(0);

        setTimeout(loadStep9,PHOTO_SPAN);

    };

    //文字表示のサブ関数。一文字づつ描画
    function loadStep8(counter){
	    if (counter > typeCharMessage.length){
		    typeCharDiv.html(typeCharMessage);
        }else if(typeCharMessage.charAt(counter) == '/'){
            setTimeout(loadStep8, TYPE_CHAR_NL_TIME, counter+1);
	    }else{
            $("#str_div").html(typeCharMessage.substring(0,counter)+TYPE_CHAR_CURSOLE);
		    setTimeout(loadStep8,TYPE_CHAR_SPEED,counter+1);
	    }
    };

    function loadStep9(){
        typeCharDiv.animate({"opacity":0},FADEIN_TIME);
        gBacks[15].hide();//写真
        gBacks[16].show();//ロゴ表示
        gBacks[10].show();
        gBacks[11].show();
        gBacks[12].show();

        callbackFunction();
    };

    //public関数の定義
    wnw.show.InitAnime.start = start;

})();

//-------------------------------------------------------
//wnw.show.Sliderライブラリ
//-------------------------------------------------------
if (!wnw.show.Slider) wnw.show.Slider = {};
(function(){
    function log(str){
        console.log("[wnw.show.Slider] " + str);
    }

    // コンテナクラス
    function Container(imgJq,posi,name){
        this.imgJq=imgJq;
        this.name = name;
        var fitPosi=fit(posi,this.imgJq.width(),this.imgJq.height());
        fitPosi.next=posi.next;
        this.posi=fitPosi;
        this.imgJq.css({"position":"absolute",
                        "top" : fitPosi.top,
                        "left" : fitPosi.left,
                        "width" : fitPosi.width
                       });
        this.fadeinFlag=false; //次にフェードインするかどうか
        this.moveFlag=false;  //次に移動するかどうか
        this.fadeoutFlag=false;  //次にフェードアウトするかどうか
        this.nextDeleteFlag=false;  //次に削除されるかどうか
    }
    Container.prototype.setPosi = function(posi){
        var fitPosi=fit(posi,this.imgJq.width(),this.imgJq.height());
        fitPosi.next=posi.next;
        this.posi=fitPosi;
        this.imgJq.css({"position":"absolute",
                        "top" : fitPosi.top,
                        "left" : fitPosi.left,
                        "width" : fitPosi.width
                       });
    };
    Container.prototype.toString = function(){
        var _str = this.name + ": ";
        if(this.fadeinFlag){
            _str += "fade in :";
        }
        if(this.moveFlag){
            _str += "move    :";
        }
        if(this.fadeoutFlag){
            _str += "fade out:";
        }
        if(this.nextDeleteFlag){
            _str += "next del:";
        }
        return _str + this.imgJq.attr("src");
    };
    //コンテナクラスここまで

    //枠の中にwidth*heightの画像をフィットさせた場合の位置を返す関数
    function fit(wakuPosi,width,height){
        if(wakuPosi==null){
            return null;
        }else{
            if(wakuPosi.width / width > wakuPosi.height / height ){
                var rate=wakuPosi.height / height;
            }else{
                var rate=wakuPosi.width / width;
            }
            var top =  wakuPosi.top+ (wakuPosi.height - rate * height)/2;
            var left = wakuPosi.left+ (wakuPosi.width - rate * width)/2;
            return new Position(parseInt(left),
                                parseInt(top),
                                parseInt(left + rate * width),
                                parseInt(top + rate * height));
        }
    }
    //アニメーション更新間隔[msec]
    var KOMA_TIME=100;
    //フィードの時間 [msec]
    var FADE_TIME=2500;
    //画像切り替え間隔 [msec]
    var IMAGE_CHANGE_TIME=15000;
    //画像処理の開始時間の揺らぎの最大値[msec]
    var SQEW_SPAN=1000;
    // 位置
    var gPosiList = new Array();
    gPosiList[0]=new Position(61,385,178,495);
    gPosiList[1]=new Position(277,349,392,435);
    gPosiList[2]=new Position(430,138,995,563);
    gPosiList[3]=new Position(1024,337,1135,433);
    gPosiList[4]=new Position(234,203,356,302);
    gPosiList[5]=new Position(679,83,760,136);
    gPosiList[6]=new Position(885,40,992,117);
    gPosiList[7]=new Position(125,615,259,680);
    gPosiList[8]=new Position(279,521,374,597);
    gPosiList[9]=new Position(458,602,546,651);
    gPosiList[10]=new Position(602,569,688,641);
    gPosiList[11]=new Position(801,576,917,672);
    gPosiList[12]=new Position(968,641,1070,740);
    //画像の位置
    var gImgPosiList = new Array();
    gImgPosiList[0]=gPosiList[6].clone();
    gImgPosiList[1]=new Position(450,158,975,543);
    gImgPosiList[2]=gPosiList[11].clone();
    gImgPosiList[3]=gPosiList[12].clone();
    gImgPosiList[4]=gPosiList[4].clone();
    gImgPosiList[5]=gImgPosiList[1].clone();
    gImgPosiList[6]=gPosiList[3].clone();
    //既存画像初期位置
    var OLD_IMAGE_START_POSI = 0;
    //既存画像の遷移順序
    gImgPosiList[0].next = gImgPosiList[1];
    gImgPosiList[1].next = gImgPosiList[2];
    gImgPosiList[2].next = gImgPosiList[3];
    gImgPosiList[3].next = null;
    //新規画像初期位置
    var NEW_IMAGE_START_POSI = 4;
    //新規画像の遷移順序
    //gImgPosiList[4].next = gImgPosiList[5];
    //gImgPosiList[5].next = gImgPosiList[6];
    //gImgPosiList[6].next = null;
    gImgPosiList[4].next = gImgPosiList[1];
    //コンテナのリスト
    var gConList = new Array();
    //既存画像 jquery objキュー
    var gOldImgJqQueue = new Queue();
    //新規画像 jquery objキュー
    var gNewImgJqQueue = new Queue();

    //既存画像追加
    function addOldImg(url){
        $("body").append(
            $("<img />")
                .attr("src", url)
                .css({"opacity":0,"z-index":1})
                .load(function(){
                    log("既存キューに追加 " + $(this).attr("src") + " size :"  + $(this).width());
                    gOldImgJqQueue.enqueue($(this));
                })
        );
    }

    //新規画像追加
    function addNewImg(url){
        $("body").append(
            $("<img />")
                .attr("src", url)
                .css({"opacity":0,"z-index":1})
                .load(function(){
                    log("新規キューに追加 " + $(this).attr("src") + " size :"  + $(this).width());
                    gNewImgJqQueue.enqueue($(this));
                })
        );
    }

    // メインループ
    function start(){
        for ( i = 0 ; i < gConList.length ; i++){
            var _con = gConList[i];
            log("コンテナNo" + i + ":" + _con.toString());
        }

        //古いコンテナの削除
        for ( i = 0 ; i < gConList.length ; i++){
            if(gConList[i].nextDeleteFlag){
                log("既存キューに追加 " + gConList[i].imgJq.attr("src") );
                gOldImgJqQueue.enqueue(gConList[i].imgJq);
                log("古いコンテナ削除");
                gConList.splice(i,1);
            }
        }

        if( gNewImgJqQueue.size() ==0){
            //新規キューに画像はない
            if( gOldImgJqQueue.size() ==0){
                //既存キューにも新規キューにも画像がない
                log("既存キューにも新規キューにも画像がない");
            }else{
                //既存キューに画像あり
                if(gImgPosiList[OLD_IMAGE_START_POSI].div == null &&
                   gImgPosiList[NEW_IMAGE_START_POSI].div == null){
                    log("既存キューに画像あり");
                    var _img = gOldImgJqQueue.dequeue();
                    log("既存キューから取得 " + _img.attr("src"));
                    //コンテナを作り、画像と場所をセットする
                    var _con = new Container(_img ,gImgPosiList[OLD_IMAGE_START_POSI],"old");
                    //フェードインフラグをたてる
                    _con.fadeinFlag=true;
                    //コンテナリストに追加
                    gConList.push(_con);
                }
            }
        }else{
            //新規キューに画像あり
            if(gImgPosiList[NEW_IMAGE_START_POSI].div == null){
                log("新規キューに画像あり");
                var _img = gNewImgJqQueue.dequeue();
                log("新規キューから取得 " + _img.attr("src"));
                //コンテナを作り、画像と場所をセットする
                var _con = new Container(_img, gImgPosiList[NEW_IMAGE_START_POSI],"new");
                //フェードインフラグをたてる
                _con.fadeinFlag=true;
                //コンテナリストに追加
                gConList.push(_con);
                //鳥登場
                wnw.show.Tori.fly();
            }
        }
        //log(gConList);

        //性能向上のため、アニメをする前にpositionのキャッシュを作っておく
        cachedFromPosiList = new Array();
        cachedNextPosiList = new Array();
        for(i=0;i<gConList.length;i++){
            cachedFromPosiList[i]=gConList[i].posi;
            cachedNextPosiList[i]=fit(gConList[i].posi.next,
                                      gConList[i].imgJq.width(),
                                      gConList[i].imgJq.height());
        }
        //アニメ開始
        komaLoop(0);
        //次のループへ
        setTimeout(start, IMAGE_CHANGE_TIME);
        //鳥のテスト用
        //wnw.show.Tori.fly();

    }

    var cachedFromPosiList;
    var cachedNextPosiList;

    function komaLoop(t){
        var r = (t - 0.3) / (0.7 - 0.3);
        //透明度が中途半端にならないよう丸める
        if(r>0.95){r=1;}
        var fadeoutTime=1-(t-0)/(0.4 - 0);
        if(fadeoutTime<0.05){fadeoutTime=0;}
            var fadeinTime=(t-0.6)/(1 - 0.6);
        if(fadeinTime>0.95){fadeinTime=1;}
        for(i=0;i<gConList.length;i++){
            var div=gConList[i];
            if(0 <= t && t <= 0.4 ){
                if(div.moveFlag || div.fadeoutFlag ){
                    div.imgJq.css({"opacity": fadeoutTime});
                }
            }
            if(0.6 <= t && t <= 1 ){
                if(div.moveFlag || div.fadeinFlag ){
                    div.imgJq.css({"opacity": fadeinTime});
                }
            }
            if(0.3 <= t && t<= 0.4 || 0.6 <= t && t<= 0.7){
                if(div.moveFlag){
                    var fromPosi = cachedFromPosiList[i];
                    var toPosi = cachedNextPosiList[i];
                    div.imgJq.css({"top":r * toPosi.top  + (1-r) * fromPosi.top,
                                   "left":r * toPosi.left  + (1-r) * fromPosi.left,
                                   "width":r * toPosi.width  + (1-r) * fromPosi.width
                                  });
                }
            }
        }
        if(t<1){
            t += 0.02 ;
//            setTimeout("wnw.show.Slider.komaLoop(" + t + ")", 100);
            setTimeout(function(){komaLoop(t);}, 100);
        }else{
            //アニメーション終了。フラグ更新
            for(i=0;i<gConList.length;i++){
                var _con=gConList[i];
                if(_con.fadeoutFlag){
                    _con.fadeoutFlag=false;
                    _con.nextDeleteFlag=true;
                }else if(_con.fadeinFlag){
                    _con.fadeinFlag=false;
                    _con.moveFlag=true;
                }else if(_con.moveFlag){
                    //positionを進める
                    _con.setPosi(_con.posi.next);
                    _con.moveFlag=false;
                    if(_con.posi.next != null){
                        // 次が終わりじゃない場合は、moveのフラグを立てる
                        _con.moveFlag=true;
                    }else{
                        // 次が終わりの場合は、fadeoutのフラグを立てる
                        _con.fadeoutFlag=true;
                    }
                }
            }
        }
    }

    //publicフィールド・関数定義
    wnw.show.Slider.start     = start;
    wnw.show.Slider.addOldImg = addOldImg;
    wnw.show.Slider.addNewImg = addNewImg;

})();

//---------------------------------------------
// wnw.show.Toriライブラリ
//---------------------------------------------
if (!wnw.show.Tori) wnw.show.Tori = {};
(function(){
    //定数

    //アニメーション更新間隔[msec]
    var KOMA_TIME=100;
    //変数
    var toriElement;
    var already_init = false;
    //音楽再生
    function playSound(){
        //鳥の鳴き声
        var swfURL = wnw.show.libPath() + "/sounds/SoundUnit.swf";
	    var div = document.getElementById("SoundUnit");
	    var innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="0" height="0" id="SoundUnit"><param name="movie" value="' + swfURL + '" /><embed src="' + swfURL + '" width="0" height="0" name="SoundUnit" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	    div.innerHTML = innerHTML;
    }

    function fly(){
        //トリ画像
        var TORI_IMAGE= wnw.show.libPath() + "/images/tori.png";
        var NULL_IMAGE = wnw.show.libPath() + "/images/null.gif";
        if (already_init == false){
            $("body")
                .append($("<img/>")
                        .attr("src",NULL_IMAGE)
                        .attr("id","tori"))
                .append($("<div />")
                        .attr("id","SoundUnit"));
            already_init = true;
        }

        //鳥初期化
        var tori = new Image();
        tori.src = TORI_IMAGE;
        toriElement=document.getElementById("tori");
        toriElement.src = tori.src;
        toriElement.style.position = "absolute";
        toriElement.style.zIndex =  255;
        toriElement.style.top =  -30;
        toriElement.style.left = -350;
        toriElement.style.width = 400;
        toriElement.style.height = 400;

        //playSound();
        komaAnime(0);
    }
    function komaAnime(t){
        t++;
        if(t == 30 || t == 50){
            playSound();
        }
        if(0<t && t <= 25){
            toriElement.style.left = -350+t*10;
            toriElement.style.top = -30-t*t*0.1;
        }else if(25 < t && t <= 50){
            ;
        }else if(50 < t && t <= 75){
            toriElement.style.left = -350+(t-25)*10;
            toriElement.style.top = -30-(t-25)*(t-25)*0.1;
        }
        setTimeout(function(){komaAnime(t);}, KOMA_TIME);
    }

    //publicフィールド・関数定義
    wnw.show.Tori.fly = fly;

})();
