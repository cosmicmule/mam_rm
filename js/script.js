// GLOBAL VARIABLES
// =============================================================================
// =============================================================================
// =============================================================================
	var config = {
		video:{0:'video4.mp4',1:'video3.mp4',2:'video1.mp4',3:'video2.mp4'},
		currentSection:0,
		prevSection:1,
		TotalSection:4,
		onLock:false
	}

	// buttons
 	var navigation = [];
	var clickThrough_Ele = [];
	var panel_is = false;

	// section order
	idArr = [0,1,2,3];

// BANNER BASE FUNCTIONS
// =============================================================================
// =============================================================================
// =============================================================================
	function initEB() {

	    if (!EB.isInitialized()) {
	        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
	    }else {
	        startAd();
	    }

	}

	function startAd(){

		// RETRIEVE BUTTONS
		navigation = Buttons_GET();
		Buttons_Listener_ADD(navigation,'click',Button_CLICK)
		Buttons_Listener_ADD(navigation,'mouseover',Button_OVER)
		Buttons_Listener_ADD(navigation,'mouseout',Button_OUT)

		// LISTENERS FOR CTA / LOGOS
		clickThrough_Ele.push(document.getElementById('logo'))
		clickThrough_Ele.push(document.getElementById('cta'))
		Buttons_Listener_ADD(clickThrough_Ele,'click',Button_CLICKTHROUGH);

		var hotspot = document.getElementById('POPUP_Collection');
		hotspot.addEventListener('click',panel_CONTROLLER,false)
		hotspot.addEventListener('mouseover',panelShift_UP,false)
		hotspot.addEventListener('mouseout',panelShift_DOWN,false)

		var season_Base = document.getElementById('season_Collection');
		season_Base.addEventListener('click',panel_CONTROLLER,false)
		season_Base.addEventListener('mouseover',panelShift_UP,false)
		season_Base.addEventListener('mouseout',panelShift_DOWN,false)



		// animates first Postcard on starting of banner.
		var IconSetParent = document.querySelector(".navBtn_BASE")
		var IconSetParentSiblings  = IconSetParent.querySelectorAll(".icon");
		TweenLite.set(IconSetParentSiblings, {backgroundPosition:'-10px 0px'});

		var season_Collection = document.getElementById('season_Collection');

		TweenLite.to(season_Collection, .5, {opacity: 1,delay:1});

		//msg(IconSetParent)
		//msg(IconSetParentSiblings)
		animate(config['currentSection'])


}

// NAVIGATION
// =============================================================================
// =============================================================================
// =============================================================================
	function panel_CONTROLLER(){
		// open /
		if(panel_is == false){
			panel_OPEN();
			fadeInPopup_Controller(true);
		}else{
			panel_CLOSED();
		}
	}

	function panel_OPEN(){
		panel_is = true;
		var parent 			= document.getElementById('POPUP_Collection');
		TweenLite.to(parent, .5, {top: 425});
		//msg('PANEL_OPEN');
	}
	function panel_CLOSED(){
		panel_is = false;
		var parent 			= document.getElementById('POPUP_Collection');
		TweenLite.to(parent, .5, {top:516});
		//msg('PANEL_CLOSED');
	}

	function panelShift_UP(){

		if(panel_is == false){
			var parent 			= document.getElementById('POPUP_Collection');
			TweenLite.to(parent, .5, {top: 496});
		}

	}
	function panelShift_DOWN(){

		if(panel_is == false){
			var parent 			= document.getElementById('POPUP_Collection');
			TweenLite.to(parent, .5, {top: 516});
		}
	}

	function Buttons_GET(){

		var navParent  = document.querySelector("#navigation");
		var navSiblings  = navParent.querySelectorAll(".navBtn_BASE");

		return navSiblings;
	}

	function Buttons_Listener_ADD(collection,type,FN){

		for (var i = 0; i < collection.length; i++) {
			collection[i].addEventListener(type,FN,false);
		};

	}

	function Button_CLICK(event){

		// get parent of btn
		var tempBtn = event.target.offsetParent;
		var id = tempBtn.dataset.id;


		var IconSetParentSiblings  = document.getElementsByClassName("icon");
		//msg(IconSetParentSiblings);
		for (var i = 0; i < IconSetParentSiblings.length; i++) {
			TweenLite.set(IconSetParentSiblings[i], {backgroundPosition:'0 0'});
		};

		//msg(id);
		//msg(IconSetParentSiblings[id]);
		TweenLite.set(IconSetParentSiblings[id], {backgroundPosition:'-10px 0'});



		config['prevSection'] = config['currentSection'];
		config['currentSection'] = id;



		if(config['currentSection'] != config['prevSection'] && config['onLock'] != true){

			// tracking
			tracking(idArr[ id ]);

			// animate Postcard
			animate(idArr[ id ]);

			var parent 			= document.getElementById('POPUP_Collection');
			TweenLite.to(parent, .5, {opacity:0});
		}


		panel_is = false;


	}

	function Button_OVER(event){

		if(config['onLock'] == false){

			var tempBtn = event.target.offsetParent;
			var id = tempBtn.dataset.id;


			var target_ele = document.getElementsByClassName('Btn_active_'+ id);
			var target_season_Collection = document.getElementsByClassName('season_Icon_'+ id);

			// animate Rollover.
			TweenLite.to(target_ele, .25, {opacity:1});

			// set all season icons to opacity 0;

			for (var i = 0; i < 4; i++) {
				if(i != id){
					TweenLite.set(document.getElementsByClassName('season_Icon_'+ i),{opacity:0,overwrite:4});
				}
			};

			TweenLite.set(target_season_Collection,  {opacity:0});
			TweenLite.to(target_season_Collection, 1, {opacity:1});
		}

	}

	function Button_OUT(event){

		var tempBtn = event.target.offsetParent;
		var id = tempBtn.dataset.id;
		var target_ele = document.getElementsByClassName('Btn_active_'+ id);
		var target_season_Collection = document.getElementsByClassName('season_Icon_' + id);
		var target_season_Collection_CurrentSection = document.getElementsByClassName('season_Icon_'+  config['currentSection']);

		// animate Rollover.
		TweenLite.to(target_ele, .25, {opacity:0});
		TweenLite.to(target_season_Collection, .25, {opacity:0});
		TweenLite.to(target_season_Collection_CurrentSection, .25, {opacity:1});

	}
// CLICKTHROUGHS
// =============================================================================
// =============================================================================
// =============================================================================
	function Button_CLICKTHROUGH(a) {
    if(0 == Number(config.currentSection)) {
        EB.clickthrough("summer");
    }else if(1 == Number(config.currentSection)){
        EB.clickthrough("fall");
    }else if(2 == Number(config.currentSection)){
        EB.clickthrough("winter");
    }else if(3 == Number(config.currentSection)){
        EB.clickthrough("spring");
    }
}



// SECTION ANIMATION
// =============================================================================
// =============================================================================
// =============================================================================
	function animate(id){


		if(config['onLock'] == false){

			var id = idArr[id];
			var postcard_Collection  = document.getElementsByClassName("postCard_video");
			var popup_Collection  = document.getElementsByClassName("popup_Base");



			// FADEOUT CURRENT POSTCARD
			TweenLite.to(postcard_Collection[config['prevSection']], 1, {opacity:0});
			TweenLite.to(popup_Collection[config['prevSection']], 1, {opacity:0});

			var get_postcard_Collection = postcard_Collection[config['currentSection']];
			var get_postcard_Collection_Supers = get_postcard_Collection.querySelectorAll(".superCollection");
			//msg(get_postcard_Collection_Supers);

			for (var i = 0; i < get_postcard_Collection_Supers.length; i++) {
				TweenLite.set(get_postcard_Collection_Supers[i], {opacity:0, y:'+=40px'});
				TweenLite.to(get_postcard_Collection_Supers[i], 1, {opacity:1,y:0,delay:2 + i});
			};

			// UPDATE CURRENT SECTION
			config['prevSection'] = config['currentSection'];

			// FADEIN POSTCARD
			TweenLite.set(postcard_Collection[id], {rotation:20,left:-656,opacity:0});
			TweenLite.to(postcard_Collection[id], 1, {opacity:1,left:-110,rotation:3,zIndex:3,onComplete:animate_onComplete,onCompleteParams:[postcard_Collection[id]],onStart:animate_onStart,onStartParams:[ postcard_Collection[id] ]});

			// FADIN POP UP.
			//TweenLite.set(popup_Collection[id], {opacity:0});
			for (var i = 0; i < popup_Collection.length; i++) {
				popup_Collection[0].style.opacity = 0;
			};

			TweenLite.to(popup_Collection[id], 1, {opacity:1,delay:4, onComplete:animationUnlock});


		}




	}

	function animationUnlock(){

		// remove animation lock on banner
		config['onLock'] = false;
		//msg(config['onLock'])

		// FADEIN BUTTONS
		for (var i = 0; i < navigation.length; i++) {
			TweenLite.to(navigation[i], .25, {opacity:1,scale:1});
		};


		fadeInPopup('test');

	}



	function fadeInPopup(){
		fadeInPopup_Controller();
	}

	function fadeInPopup_Controller(evt){
		var parent 			= document.getElementById('POPUP_Collection');

		try{
			parent.style.removeProperty("top");
		}catch(e){

		}

		TweenLite.to(parent, .5, {opacity:1});
		if(evt != undefined){
			tracking('open');
		}

	}

	function animate_onStart(event){

		var parent 			= document.getElementsByClassName('postCard_video');
		var sibling			= parent[ config['currentSection'] ].getElementsByClassName('videoHolder');
		var siblingVideo	= sibling[0].getElementsByClassName('video');

		try{
			siblingVideo[0].currentTime = 0;
			siblingVideo[0].muted= true;
			siblingVideo[0].pause();
		}catch(e){}

		// LOCK  NAVIGATION UNTIL ANIMATION HAS COMPLETED FULLY.
		config['onLock'] = true;

		if(config['currentSection'] == 3){
			siblingVideo[0].style.top = '-18px';
		}

		if(config['currentSection'] == 0){
			siblingVideo[0].style.left = '54px';
		}

		for (var i = 0; i < navigation.length; i++) {
			if(navigation[i].dataset.id != config['currentSection']){
				TweenLite.to(navigation[i], .5, {opacity:.2,scale:0.02,transformOrigin:"left 50% -200",delay:i/3});
			}
		};

	}

	function animate_onComplete(event){

		var parent 			= document.getElementsByClassName('postCard_video');
		var sibling			= parent[ config['currentSection'] ].getElementsByClassName('videoHolder');
		var siblingVideo	= sibling[0].getElementsByClassName('video');

		//msg(siblingVideo);

		try{
			// REMOVE Z-INDEX FROM POSTCARD.
			sibling[0].style.removeProperty('z-index');
			siblingVideo[0].play();

		}catch(e){

		}




	}


// SHARED
// =============================================================================
// =============================================================================
// =============================================================================
	function tracking(id){

		if(config['currentSection'] == 0){
			EB.userActionCounter('Tracking Summer');
		}else if(config['currentSection'] == 1){
			EB.userActionCounter('Tracking Fall');
		}else if(config['currentSection'] == 2){
			EB.userActionCounter('Tracking Winter');
		}else if(config['currentSection'] == 3){
			EB.userActionCounter('Tracking Spring');
		}else if(config['currentSection'] == 'open'){

			if(config['currentSection'] == 0){
				EB.userActionCounter('Panel Open Summer');
			}else if(config['currentSection'] == 1){
				EB.userActionCounter('Panel Open Fall');
			}if(config['currentSection'] == 2){
				EB.userActionCounter('Panel Open Winter');
			}if(config['currentSection'] == 3){
				EB.userActionCounter('Panel Open Spring');
			}

		}
	}

	function objectGetBounds(obj,fnSwitch){
		return obj.getBoundingClientRect();
	}

	function listeners_ADD(obj,type,pointer){
		obj.addEventListener(type,pointer,false)
	}

	function listeners_REMOVE(){
		obj.addEventListener(ele,type,pointer)
	}

	function msg(data){console.log(data)}


window.addEventListener("load", initEB);
