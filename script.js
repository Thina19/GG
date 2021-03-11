(function(){
    var script = {
 "layout": "absolute",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A].forEach(function(component) { component.set('visible', false); }) }",
 "children": [
  "this.MainViewer",
  "this.Container_806973DA_ADB0_EB72_41E1_4BBDAAEB91FF",
  "this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0",
  "this.Container_A797E343_B17D_3EDA_41AB_2CDE4A57AE7C",
  "this.HTMLText_B3A95BF7_AD90_5B11_41E1_AC9050095132"
 ],
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "scripts": {
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "registerKey": function(key, value){  window[key] = value; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "existsKey": function(key){  return key in window; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getKey": function(key){  return window[key]; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); }
 },
 "horizontalAlign": "left",
 "width": "100%",
 "height": "100%",
 "buttonToggleFullscreen": "this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
 "defaultVRPointer": "laser",
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Player",
 "minHeight": 20,
 "borderRadius": 0,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "downloadEnabled": false,
 "gap": 10,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "visible",
 "desktopMipmappingEnabled": false,
 "minWidth": 20,
 "paddingTop": 0,
 "definitions": [{
 "initialPosition": {
  "yaw": -6.53,
  "pitch": 1.51,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_camera",
 "class": "PanoramaCamera"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 18.46,
   "yaw": -166.94,
   "distance": 1,
   "panorama": "this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -64.69,
   "yaw": -18.22,
   "distance": 1,
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -64.69,
   "yaw": -166.94,
   "distance": 1,
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13"
  }
 ],
 "label": "GDT ID ground floor 360 view 04",
 "id": "panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06",
 "thumbnailUrl": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_312D4B62_2001_FE6A_41B9_4209867682D4",
  "this.overlay_3585718D_2002_EAC2_417E_DEBE837CBBC0"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": -3.52,
  "pitch": 1.26,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -160.36,
   "yaw": -3.11,
   "distance": 1,
   "panorama": "this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -85.74,
   "yaw": -164.18,
   "distance": 1,
   "panorama": "this.panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 02",
 "id": "panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C",
 "thumbnailUrl": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_306833C3_2006_EEAB_41BB_6A9C68AF8E59",
  "this.overlay_34511933_2001_FBDC_41B1_1D09C9BF0986"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "duration": 0,
 "easing": "linear",
 "id": "effect_CCD93AA4_AC7D_17DF_41BE_9DB7786D337B",
 "from": "right",
 "class": "SlideInEffect"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -168.45,
   "yaw": 6.4,
   "distance": 1,
   "panorama": "this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 37.81,
   "yaw": -164.18,
   "distance": 1,
   "panorama": "this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 08",
 "id": "panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97",
 "thumbnailUrl": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_31C494CD_2002_AAB9_41BA_971B4DB07ADC",
  "this.overlay_365F1564_2001_AA54_41B2_F3ECBF44D08A"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 5.52,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F3461D4_2002_AA29_41B4_E4A4241FF3AA",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 94.26,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_004C7422_2002_AA68_41A9_55DC1675352C",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 10, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 13.06,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FC1B2F1_2002_AFE8_41B1_50F1C88E81E4",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -157.52,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F0DB21A_2002_AE58_41AD_C38135BF57F4",
 "class": "PanoramaCamera"
},
{
 "duration": 0,
 "easing": "linear",
 "id": "effect_2745EDF7_ACED_1161_41CE_8D7449621D35",
 "from": "right",
 "class": "SlideInEffect"
},
{
 "initialPosition": {
  "yaw": 161.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_002A9448_2002_AA38_41B1_580FFF420EDD",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 15.82,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FA9233A_2002_AE59_41B7_B17441F8299D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -4.52,
  "pitch": 1.26,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 15.82,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FD962A8_2002_AE78_41AA_8D9A0914BA74",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -80.9,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F94D384_2002_AE28_41B6_D7C94E4949AE",
 "class": "PanoramaCamera"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -152.87,
   "yaw": 87.8,
   "distance": 1,
   "panorama": "this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 99.1,
   "yaw": -87.3,
   "distance": 1,
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 99.1,
   "yaw": -87.3,
   "distance": 1,
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13"
  }
 ],
 "label": "GDT ID ground floor 360 view 06",
 "id": "panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E",
 "thumbnailUrl": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_31E135D8_2001_AAA6_41B4_7AA5166ED63F",
  "this.overlay_35004542_2001_AA4A_41BD_1EEAAAD7E873"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "duration": 0,
 "easing": "linear",
 "id": "effect_2745FDF7_ACED_1161_41D1_B5EC4D857875",
 "to": "right",
 "class": "SlideOutEffect"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 22.48,
   "yaw": -174.48,
   "distance": 1,
   "panorama": "this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9"
  },
  {
   "panorama": "this.panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 11",
 "id": "panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0",
 "thumbnailUrl": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_33536EC7_2007_B6A9_419E_5407C6F5D1C3",
  "this.overlay_365A8F20_2002_F7D0_41BF_2E8EAE90F99C"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 115.31,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FEC3287_2002_AE28_41B2_1A13397AB5A7",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 26.88,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_0073B3CD_2002_AE38_4194_E6121F688FD3",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CF69760_2001_D665_41BB_0B483A7501C9_camera",
 "class": "PanoramaCamera"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -164.18,
   "yaw": -85.74,
   "distance": 1,
   "panorama": "this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C"
  }
 ],
 "label": "GDT ID ground floor 360 view 01",
 "id": "panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0",
 "thumbnailUrl": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_2EF54626_2006_69ED_41BE_869DF3110531"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -166.94,
   "yaw": 18.46,
   "distance": 1,
   "panorama": "this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -3.11,
   "yaw": -160.36,
   "distance": 1,
   "panorama": "this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 03",
 "id": "panorama_2CF73E42_2001_B9A5_4153_89191441DBC6",
 "thumbnailUrl": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_3108E184_2002_AAAE_41B0_1CA943AA8473",
  "this.overlay_3500B04C_200E_AA40_41B1_A313FF69A921"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": -80.9,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F8213A7_2002_AE68_41B0_4619562E5E7E",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 92.7,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_003DC435_2002_AA68_4191_AEA7F987ED91",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 11.55,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F26D1F7_2002_ADE8_41AA_C81EF4C1A1EA",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 27.13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FA6B35D_2002_AED8_4183_660257A225F9",
 "class": "PanoramaCamera"
},
{
 "mouseControlMode": "drag_acceleration",
 "buttonZoomOut": "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "touchControlMode": "drag_rotation",
 "buttonMoveRight": "this.IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonMoveDown": "this.IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96",
 "class": "PanoramaPlayer",
 "buttonPause": "this.IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
 "buttonMoveLeft": "this.IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
 "buttonPlayRight": "this.IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonMoveUp": "this.IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
 "buttonPlayLeft": "this.IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
 "buttonZoomIn": "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525"
},
{
 "initialPosition": {
  "yaw": 177.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F2C21E5_2002_ADE8_41B4_153ACC75957F",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -161.54,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F06823E_2002_AE58_4197_7C8E1BE2F0CB",
 "class": "PanoramaCamera"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -164.18,
   "yaw": 37.81,
   "distance": 1,
   "panorama": "this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 87.8,
   "yaw": -152.87,
   "distance": 1,
   "panorama": "this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 07",
 "id": "panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0",
 "thumbnailUrl": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_31769D2D_2002_5BFE_41BB_113C2BCA7B22",
  "this.overlay_35FAE5A0_2007_AAC8_4163_4BAD4DF548B0"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 115.31,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FF3E265_2002_AEE8_41B0_8EA901A7204D",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 176.89,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FBBB317_2002_AE57_4199_D0AE3159BDEB",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -92.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3FD5E2CF_2002_AE38_41A0_235F9A4A8B64",
 "class": "PanoramaCamera"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -174.48,
   "yaw": 22.48,
   "distance": 1,
   "panorama": "this.panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -2.39,
   "yaw": -153.12,
   "distance": 1,
   "panorama": "this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 10",
 "id": "panorama_2CF69760_2001_D665_41BB_0B483A7501C9",
 "thumbnailUrl": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_32935B5F_2006_FE59_419E_3F655889D5E1",
  "this.overlay_3683B452_203E_6A73_41B6_F75FC61BDB48"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": 19.64,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_005EA410_2002_AA28_4182_F951B2205C06",
 "class": "PanoramaCamera"
},
{
 "duration": 0,
 "easing": "linear",
 "id": "effect_CCD9DAA4_AC7D_17DF_41E2_64CF35750EE8",
 "to": "right",
 "class": "SlideOutEffect"
},
{
 "initialPosition": {
  "yaw": -142.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3F10C208_2002_AE38_419E_D5084DF704B4",
 "class": "PanoramaCamera"
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -87.3,
   "yaw": 99.1,
   "distance": 1,
   "panorama": "this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -18.22,
   "yaw": -64.69,
   "distance": 1,
   "panorama": "this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06"
  }
 ],
 "label": "GDT ID ground floor 360 view 05",
 "id": "panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
 "thumbnailUrl": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_3148D848_200F_B9A6_41A9_5D253ACF91F8",
  "this.overlay_35DB55C4_2003_EA4C_41B7_BEE8DF04F94B"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "class": "Panorama",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -153.12,
   "yaw": -2.39,
   "distance": 1,
   "panorama": "this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9"
  },
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 6.4,
   "yaw": -168.45,
   "distance": 1,
   "panorama": "this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97"
  },
  {
   "panorama": "this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "GDT ID ground floor 360 view 09",
 "id": "panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4",
 "thumbnailUrl": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 36,
      "width": 18432,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 24,
      "width": 12288,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 12,
      "width": 6144,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_325BC99D_2001_FADE_4191_9B5FC95A9B79",
  "this.overlay_36796E4B_203E_5652_419E_D1F4BE09D256"
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "150%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_camera",
 "class": "PanoramaCamera"
},
{
 "initialPosition": {
  "yaw": -173.6,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_006153EF_2002_ADF8_41B1_87C475088BB3",
 "class": "PanoramaCamera"
},
{
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "id": "MainViewer",
 "toolTipFontWeight": "normal",
 "playbackBarHeadWidth": 6,
 "left": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 0,
 "width": "100%",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "class": "ViewerArea",
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontFamily": "Arial",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "paddingLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": true,
 "progressLeft": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "transitionDuration": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 100,
 "height": "100%",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "paddingTop": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "0.6vw",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "toolTipTextShadowBlurRadius": 3,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "children": [
  "this.Container_F59EA3FC_AC15_152A_41D3_A68AE3523ABE",
  "this.Container_8F88A174_B17F_DAF3_41E3_9385916D5A3E",
  "this.Container_8E56560D_B147_6613_41E3_B9F30B1AF2C2"
 ],
 "height": "100%",
 "id": "Container_806973DA_ADB0_EB72_41E1_4BBDAAEB91FF",
 "left": "79.38%",
 "horizontalAlign": "left",
 "right": "1.2%",
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "top": "0%",
 "borderRadius": 0,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 10,
 "minWidth": 1,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Right Side Container"
 },
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "children": [
  "this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856"
 ],
 "id": "Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0",
 "left": "0%",
 "horizontalAlign": "left",
 "right": "84.23%",
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "top": "0%",
 "bottom": "0%",
 "borderRadius": 0,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 10,
 "minWidth": 1,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "data": {
  "name": "Left Side Container"
 },
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "children": [
  "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
  "this.IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
  "this.IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
  "this.Container_A7977343_B17D_3EDA_41C0_F47328C07981",
  "this.IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
  "this.IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
  "this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
  "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525"
 ],
 "id": "Container_A797E343_B17D_3EDA_41AB_2CDE4A57AE7C",
 "left": "40%",
 "horizontalAlign": "center",
 "right": "38.77%",
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "minHeight": 20,
 "top": "85.03%",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "bottom": "0%",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "gap": 4,
 "minWidth": 20,
 "borderSize": 0,
 "overflow": "hidden",
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Middle Control"
 },
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "id": "HTMLText_B3A95BF7_AD90_5B11_41E1_AC9050095132",
 "left": "0.01%",
 "right": "71.34%",
 "paddingRight": 20,
 "class": "HTMLText",
 "backgroundOpacity": 0,
 "top": "0%",
 "borderRadius": 0,
 "height": 65.49,
 "scrollBarWidth": 10,
 "paddingLeft": 20,
 "minHeight": 1,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vw;\"><B><I>GTD Ground Floor </I></B></SPAN></SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "HTMLText53815"
 },
 "paddingBottom": 20,
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "toolTipShadowVerticalLength": 0,
 "id": "IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
 "width": 54,
 "maxHeight": 128,
 "maxWidth": 128,
 "toolTipShadowColor": "#333333",
 "horizontalAlign": "center",
 "toolTipFontWeight": "normal",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "paddingRight": 0,
 "toolTipDisplayTime": 600,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A.png",
 "verticalAlign": "middle",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipFontStyle": "normal",
 "toolTip": "Fullscreen",
 "height": 38,
 "rollOverIconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A_rollover.png",
 "toolTipFontFamily": "Arial",
 "paddingLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingTop": 0,
 "toolTipShadowHorizontalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "transparencyActive": true,
 "mode": "toggle",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "toolTipFontColor": "#606060",
 "toolTipFontSize": 12,
 "data": {
  "name": "IconButton1493"
 },
 "toolTipOpacity": 1,
 "toolTipPaddingBottom": 4,
 "pressedIconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A_pressed.png",
 "cursor": "hand",
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13, this.camera_3FF3E265_2002_AEE8_41B0_8EA901A7204D); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.43,
   "yaw": -18.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -20.85,
   "yaw": -18.22,
   "hfov": 16.43,
   "image": "this.AnimatedImageResource_3881D432_2002_AA3C_4170_06D029F10D31",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_312D4B62_2001_FE6A_41B9_4209867682D4",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13, this.camera_3FEC3287_2002_AE28_41B2_1A13397AB5A7); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.35,
   "yaw": -166.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.14,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -29.14,
   "yaw": -166.94,
   "hfov": 15.35,
   "image": "this.AnimatedImageResource_36F6A2AB_2006_AED8_41B1_F2FCAA887018",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_3585718D_2002_EAC2_417E_DEBE837CBBC0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF73E42_2001_B9A5_4153_89191441DBC6, this.camera_005EA410_2002_AA28_4182_F951B2205C06); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.94,
   "yaw": -3.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -15.51,
   "yaw": -3.11,
   "hfov": 16.94,
   "image": "this.AnimatedImageResource_38B73C11_2002_F9F7_41A8_9025A59CBB9F",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_306833C3_2006_EEAB_41BB_6A9C68AF8E59",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.37,
   "yaw": -164.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -21.35,
   "yaw": -164.18,
   "hfov": 16.37,
   "image": "this.AnimatedImageResource_38B74C11_2002_F9F7_41B6_37D53ADA6888",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_34511933_2001_FBDC_41B1_1D09C9BF0986",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4, this.camera_3F26D1F7_2002_ADE8_41AA_C81EF4C1A1EA); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.61,
   "yaw": 6.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -19.09,
   "yaw": 6.4,
   "hfov": 16.61,
   "image": "this.AnimatedImageResource_372617AF_2002_5628_41AD_056F69AB0D78",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_31C494CD_2002_AAB9_41BA_971B4DB07ADC",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.11,
   "yaw": -164.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -23.61,
   "yaw": -164.18,
   "hfov": 16.11,
   "image": "this.AnimatedImageResource_365921C9_2007_AA55_417F_0C654BCDF65B",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_365F1564_2001_AA54_41B2_F3ECBF44D08A",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0, this.camera_3FA6B35D_2002_AED8_4183_660257A225F9); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.53,
   "yaw": 87.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -19.84,
   "yaw": 87.8,
   "hfov": 16.53,
   "image": "this.AnimatedImageResource_36F5A2AC_2006_AED8_41A2_BF34A0AB398B",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_31E135D8_2001_AAA6_41B4_7AA5166ED63F",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13, this.camera_3F8213A7_2002_AE68_41B0_4619562E5E7E); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.14,
   "yaw": -87.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -23.36,
   "yaw": -87.3,
   "hfov": 16.14,
   "image": "this.AnimatedImageResource_36F512AC_2006_AED8_41A1_4B476BA9A6CC",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_35004542_2001_AA4A_41BD_1EEAAAD7E873",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.93,
   "yaw": -55.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -15.57,
   "yaw": -55.65,
   "hfov": 16.93,
   "image": "this.AnimatedImageResource_373847B0_2002_5638_41BC_1D4654DB2A8F",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_33536EC7_2007_B6A9_419E_5407C6F5D1C3",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.26,
   "yaw": -174.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -22.36,
   "yaw": -174.48,
   "hfov": 16.26,
   "image": "this.AnimatedImageResource_3739F7B1_2002_5638_41A8_321D93F97793",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_365A8F20_2002_F7D0_41BF_2E8EAE90F99C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C, this.camera_3FA9233A_2002_AE59_41B7_B17441F8299D); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.41,
   "yaw": -85.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -20.97,
   "yaw": -85.74,
   "hfov": 16.41,
   "image": "this.AnimatedImageResource_37734A1D_2002_B9CA_41A8_77DADF9F3AFB",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2EF54626_2006_69ED_41BE_869DF3110531",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06, this.camera_3FC1B2F1_2002_AFE8_41B1_50F1C88E81E4); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.66,
   "yaw": 18.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -18.59,
   "yaw": 18.46,
   "hfov": 16.66,
   "image": "this.AnimatedImageResource_3724B7AD_2002_5628_41B2_378C0F4D1BD8",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_3108E184_2002_AAAE_41B0_1CA943AA8473",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 17.32,
   "yaw": -160.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -9.8,
   "yaw": -160.36,
   "hfov": 17.32,
   "image": "this.AnimatedImageResource_38B4D201_2003_A9D7_41B4_7A8536079612",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_3500B04C_200E_AA40_41B1_A313FF69A921",
 "class": "HotspotPanoramaOverlay"
},
{
 "id": "IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "horizontalAlign": "center",
 "width": "9.07%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "23.36%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27662"
 },
 "pressedIconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
 "horizontalAlign": "center",
 "width": "8.96%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "23.36%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27670"
 },
 "pressedIconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96",
 "horizontalAlign": "center",
 "width": "80%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "23.36%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27669"
 },
 "pressedIconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
 "horizontalAlign": "center",
 "width": "100%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_rollover.png",
 "mode": "toggle",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "pressedRollOverIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_pressed_rollover.png",
 "minWidth": 0,
 "paddingTop": 0,
 "height": "29.2%",
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27668"
 },
 "pressedIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
 "horizontalAlign": "center",
 "width": "8.99%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "23.36%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27665"
 },
 "pressedIconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
 "horizontalAlign": "center",
 "width": "11.17%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "pressedRollOverIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_pressed_rollover.png",
 "minWidth": 0,
 "paddingTop": 0,
 "height": "29.2%",
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27671"
 },
 "pressedIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
 "horizontalAlign": "center",
 "width": "80%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "23.36%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27667"
 },
 "pressedIconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
 "horizontalAlign": "center",
 "width": "11.27%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "29.2%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27664"
 },
 "pressedIconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525",
 "horizontalAlign": "center",
 "width": "8.91%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "23.36%",
 "minWidth": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27673"
 },
 "pressedIconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97, this.camera_3FD962A8_2002_AE78_41AA_8D9A0914BA74); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.82,
   "yaw": 37.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -25.87,
   "yaw": 37.81,
   "hfov": 15.82,
   "image": "this.AnimatedImageResource_365A81C8_2007_AA53_41BC_24CCB9105005",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_31769D2D_2002_5BFE_41BB_113C2BCA7B22",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.08,
   "yaw": -152.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -23.86,
   "yaw": -152.87,
   "hfov": 16.08,
   "image": "this.AnimatedImageResource_36F4B2AC_2006_AED8_41A7_053A71516429",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_35FAE5A0_2007_AAC8_4163_4BAD4DF548B0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0, this.camera_3F3461D4_2002_AA29_41B4_E4A4241FF3AA); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.78,
   "yaw": 22.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -17.33,
   "yaw": 22.48,
   "hfov": 16.78,
   "image": "this.AnimatedImageResource_3738E7B0_2002_5638_41A6_18ABFF4C5238",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_32935B5F_2006_FE59_419E_3F655889D5E1",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.12,
   "yaw": -153.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -30.65,
   "yaw": -153.12,
   "hfov": 15.12,
   "image": "this.AnimatedImageResource_365801CA_2007_AA57_4175_D68488841B86",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_3683B452_203E_6A73_41B6_F75FC61BDB48",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E, this.camera_003DC435_2002_AA68_4191_AEA7F987ED91); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.53,
   "yaw": 99.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -19.84,
   "yaw": 99.1,
   "hfov": 16.53,
   "image": "this.AnimatedImageResource_36F602AB_2006_AED8_419B_E4BCC07B2543",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_3148D848_200F_B9A6_41A9_5D253ACF91F8",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06, this.camera_002A9448_2002_AA38_41B1_580FFF420EDD); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.23,
   "yaw": -64.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -35.92,
   "yaw": -64.69,
   "hfov": 14.23,
   "image": "this.AnimatedImageResource_3EA8AE97_2002_B6ED_41B3_4E73F58FACD1",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_35DB55C4_2003_EA4C_41B7_BEE8DF04F94B",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2CF69760_2001_D665_41BB_0B483A7501C9, this.camera_0073B3CD_2002_AE38_4194_E6121F688FD3); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 16.76,
   "yaw": -2.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -17.58,
   "yaw": -2.39,
   "hfov": 16.76,
   "image": "this.AnimatedImageResource_3659F1C9_2007_AA55_41BD_29335412D5E4",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_325BC99D_2001_FADE_4191_9B5FC95A9B79",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 15.24,
   "yaw": -168.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "useHandCursor": true,
 "items": [
  {
   "pitch": -29.89,
   "yaw": -168.45,
   "hfov": 15.24,
   "image": "this.AnimatedImageResource_3659B1C9_2007_AA55_41B6_3529613A2332",
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_36796E4B_203E_5652_419E_D1F4BE09D256",
 "class": "HotspotPanoramaOverlay"
},
{
 "children": [
  "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480"
 ],
 "height": "72.896%",
 "id": "Container_F59EA3FC_AC15_152A_41D3_A68AE3523ABE",
 "horizontalAlign": "center",
 "width": "100%",
 "scrollBarWidth": 10,
 "contentOpaque": true,
 "paddingRight": 0,
 "borderColor": "#000000",
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 50,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 5,
 "propagateClick": false,
 "borderSize": 2,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "data": {
  "name": "Floor Plan Container"
 },
 "layout": "vertical",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "children": [
  "this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9"
 ],
 "height": "19.78%",
 "id": "Container_8F88A174_B17F_DAF3_41E3_9385916D5A3E",
 "horizontalAlign": "center",
 "width": "100%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 10,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "data": {
  "name": "Middle"
 },
 "layout": "vertical",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "children": [
  "this.Container_8886944C_AC33_7318_41AB_EB089F4691B5"
 ],
 "height": "5.25%",
 "id": "Container_8E56560D_B147_6613_41E3_B9F30B1AF2C2",
 "horizontalAlign": "center",
 "width": "100%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 10,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "data": {
  "name": "Bottom"
 },
 "layout": "vertical",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "id": "ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856",
 "itemThumbnailShadow": true,
 "left": "10%",
 "itemLabelFontFamily": "Arial",
 "right": "0.18%",
 "horizontalAlign": "left",
 "itemHorizontalAlign": "center",
 "itemOpacity": 1,
 "itemThumbnailShadowVerticalLength": 3,
 "backgroundOpacity": 0,
 "itemBorderRadius": 0,
 "class": "ThumbnailList",
 "itemThumbnailShadowHorizontalLength": 3,
 "minHeight": 20,
 "itemLabelPosition": "bottom",
 "verticalAlign": "top",
 "playList": "this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist",
 "itemPaddingLeft": 3,
 "itemThumbnailBorderRadius": 50,
 "itemThumbnailShadowSpread": 1,
 "paddingLeft": 20,
 "minWidth": 20,
 "borderSize": 0,
 "itemPaddingTop": 3,
 "propagateClick": false,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "rollOverItemBackgroundOpacity": 0,
 "itemVerticalAlign": "middle",
 "rollOverItemLabelFontWeight": "normal",
 "scrollBarMargin": 2,
 "itemBackgroundOpacity": 0,
 "selectedItemLabelFontSize": "0.72vw",
 "shadow": false,
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontColor": "#FFCC00",
 "itemThumbnailHeight": 60,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": "0.84vw",
 "itemPaddingRight": 3,
 "paddingRight": 20,
 "top": "0%",
 "bottom": "10%",
 "rollOverItemLabelFontSize": "0.78vw",
 "scrollBarWidth": 10,
 "borderRadius": 5,
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailShadowBlurRadius": 8,
 "itemBackgroundColorDirection": "vertical",
 "itemLabelFontColor": "#FFFFFF",
 "gap": 5,
 "itemThumbnailShadowOpacity": 0.54,
 "scrollBarColor": "#FFFFFF",
 "paddingTop": 10,
 "itemLabelGap": 9,
 "scrollBarOpacity": 0.5,
 "itemPaddingBottom": 3,
 "itemThumbnailShadowColor": "#000000",
 "itemLabelFontStyle": "normal",
 "data": {
  "name": "ThumbnailList35762"
 },
 "paddingBottom": 10,
 "itemLabelHorizontalAlign": "center",
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "selectedItemLabelFontWeight": "bold",
 "itemMode": "normal"
},
{
 "children": [
  "this.IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
  "this.IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
  "this.IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96"
 ],
 "height": "100%",
 "id": "Container_A7977343_B17D_3EDA_41C0_F47328C07981",
 "horizontalAlign": "center",
 "width": "11.36%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 20,
 "gap": 4,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "hidden",
 "scrollBarColor": "#000000",
 "minWidth": 20,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "data": {
  "name": "Container27666"
 },
 "layout": "vertical",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3881D432_2002_AA3C_4170_06D029F10D31",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF343D3_2001_AEAB_41A7_F181A93C3B06_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_36F6A2AB_2006_AED8_41B1_F2FCAA887018",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_38B73C11_2002_F9F7_41A8_9025A59CBB9F",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CCC7888_2001_BAA5_41A8_559D8ED1868C_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_38B74C11_2002_F9F7_41B6_37D53ADA6888",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_372617AF_2002_5628_41AD_056F69AB0D78",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF73B8A_2001_FEA5_41AD_22BA359A0B97_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_365921C9_2007_AA55_417F_0C654BCDF65B",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_36F5A2AC_2006_AED8_41A2_BF34A0AB398B",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CEE8F3E_2001_D7DC_41B9_399CFD57AA4E_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_36F512AC_2006_AED8_41A1_4B476BA9A6CC",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_373847B0_2002_5638_41BC_1D4654DB2A8F",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF88D67_2001_DA6B_41BB_F28443D9D5C0_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3739F7B1_2002_5638_41A8_321D93F97793",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2D4ED2A3_2001_AEEB_41B9_FE015D85BFA0_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_37734A1D_2002_B9CA_41A8_77DADF9F3AFB",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3724B7AD_2002_5628_41B2_378C0F4D1BD8",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF73E42_2001_B9A5_4153_89191441DBC6_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_38B4D201_2003_A9D7_41B4_7A8536079612",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_365A81C8_2007_AA53_41BC_24CCB9105005",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CEF2519_2001_EBA4_41B6_A9DBA77C37D0_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_36F4B2AC_2006_AED8_41A7_053A71516429",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3738E7B0_2002_5638_41A6_18ABFF4C5238",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF69760_2001_D665_41BB_0B483A7501C9_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_365801CA_2007_AA57_4175_D68488841B86",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_36F602AB_2006_AED8_419B_E4BCC07B2543",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CF259C5_2001_DAAF_4199_08F3090CBB13_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3EA8AE97_2002_B6ED_41B3_4E73F58FACD1",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3659F1C9_2007_AA55_41BD_29335412D5E4",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2CFBE15E_2001_EA5D_419A_87C8879AC8A4_0_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_3659B1C9_2007_AA55_41B6_3529613A2332",
 "colCount": 4,
 "class": "AnimatedImageResource"
},
{
 "visible": false,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "id": "ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480",
 "toolTipFontWeight": "normal",
 "playbackBarHeadWidth": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "width": "100%",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "class": "ViewerArea",
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontFamily": "Arial",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "paddingLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "progressLeft": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "transitionDuration": 500,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "height": "100%",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "shadow": false,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "click": "if(!this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, true, 0, null, null, false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, false, 0, null, null, false) }",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBottom": 0,
 "paddingTop": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "0.6vw",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "toolTipTextShadowBlurRadius": 3,
 "data": {
  "name": "Floor Plan Viewer"
 }
},
{
 "children": [
  "this.IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E",
  "this.Container_23BF7E02_AC1D_72AA_41DA_22E1695AF185"
 ],
 "height": "100%",
 "id": "Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9",
 "horizontalAlign": "center",
 "width": "100%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 3,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "Contact Us Compo"
 },
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "children": [
  "this.IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829",
  "this.Button_B5551DB1_A8AE_1192_41E0_9815EC3E8FD9",
  "this.Button_BAFF9AB7_AC6D_3778_41DD_EF9D1C21D15E",
  "this.Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709"
 ],
 "height": "66.667%",
 "id": "Container_8886944C_AC33_7318_41AB_EB089F4691B5",
 "horizontalAlign": "center",
 "width": "100%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 5,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "data": {
  "name": "Button CU and FP"
 },
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "id": "IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E",
 "maxHeight": 616,
 "maxWidth": 900,
 "horizontalAlign": "center",
 "width": "81.529%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "100%",
 "click": "if(!this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9.get('visible')){ this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, false, 0, null, null, false) }",
 "minWidth": 1,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Contact"
 },
 "pressedIconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "children": [
  "this.IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48",
  "this.IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2",
  "this.IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300"
 ],
 "height": "100%",
 "id": "Container_23BF7E02_AC1D_72AA_41DA_22E1695AF185",
 "horizontalAlign": "center",
 "width": "20%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "minHeight": 1,
 "gap": 12,
 "propagateClick": false,
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "data": {
  "name": "Left Contact Us"
 },
 "layout": "vertical",
 "scrollBarMargin": 2,
 "shadow": false
},
{
 "id": "IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829",
 "horizontalAlign": "center",
 "width": "13%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 0,
 "propagateClick": false,
 "borderSize": 0,
 "pressedRollOverIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_pressed_rollover.png",
 "click": "if(!this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0.get('visible')){ this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, false, 0, null, null, false) }",
 "minWidth": 0,
 "paddingTop": 0,
 "height": "100%",
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Button27669"
 },
 "pressedIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "layout": "horizontal",
 "iconWidth": 0,
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "fontColor": "#FFFFFF",
 "pressedFontSize": "1vw",
 "id": "Button_B5551DB1_A8AE_1192_41E0_9815EC3E8FD9",
 "pressedBackgroundColorRatios": [
  0
 ],
 "pressedBackgroundOpacity": 1,
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "width": "44.1%",
 "rollOverShadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderColor": "#FFFFFF",
 "class": "Button",
 "shadowSpread": 1,
 "backgroundOpacity": 0.15,
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#003366"
 ],
 "pressedRollOverBackgroundColor": [
  "#003366"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "iconHeight": 0,
 "label": "CONTACT US",
 "backgroundColorRatios": [
  0
 ],
 "mode": "push",
 "paddingLeft": 0,
 "fontSize": "1vw",
 "iconBeforeLabel": true,
 "gap": 15,
 "propagateClick": false,
 "borderSize": 2,
 "click": "if(!this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9.get('visible')){ this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, true, 0, this.effect_2745EDF7_ACED_1161_41CE_8D7449621D35, 'showEffect', false) } else { this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, false, 0, this.effect_2745FDF7_ACED_1161_41D1_B5EC4D857875, 'hideEffect', false) }",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#003366"
 ],
 "minWidth": 1,
 "paddingTop": 0,
 "borderRadius": 5,
 "height": "85.65%",
 "paddingBottom": 0,
 "data": {
  "name": "Button Contact Info info"
 },
 "textDecoration": "none",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "cursor": "hand",
 "fontWeight": "bold",
 "shadow": false
},
{
 "layout": "horizontal",
 "iconWidth": 0,
 "data": {
  "name": "Button Floor Plan"
 },
 "fontColor": "#FFFFFF",
 "id": "Button_BAFF9AB7_AC6D_3778_41DD_EF9D1C21D15E",
 "pressedBackgroundColorRatios": [
  0
 ],
 "pressedBackgroundOpacity": 1,
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "width": "44.1%",
 "rollOverShadow": false,
 "shadowBlurRadius": 15,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderColor": "#FFFFFF",
 "class": "Button",
 "shadowSpread": 1,
 "backgroundOpacity": 0.15,
 "minHeight": 1,
 "pressedBackgroundColor": [
  "#003366"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "iconHeight": 0,
 "label": "FLOOR PLAN",
 "backgroundColorRatios": [
  0
 ],
 "mode": "push",
 "paddingLeft": 0,
 "fontSize": "1vw",
 "iconBeforeLabel": true,
 "gap": 5,
 "propagateClick": false,
 "borderSize": 2,
 "click": "if(!this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, true, 0, this.effect_CCD93AA4_AC7D_17DF_41BE_9DB7786D337B, 'showEffect', false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, false, 0, this.effect_CCD9DAA4_AC7D_17DF_41E2_64CF35750EE8, 'hideEffect', false) }",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#003366"
 ],
 "minWidth": 1,
 "paddingTop": 0,
 "borderRadius": 5,
 "height": "85.65%",
 "paddingBottom": 0,
 "visible": false,
 "pressedRollOverFontSize": "1vw",
 "textDecoration": "none",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "cursor": "hand",
 "fontWeight": "bold",
 "shadow": false
},
{
 "id": "Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709",
 "maxHeight": 85,
 "maxWidth": 214,
 "horizontalAlign": "center",
 "width": "30.126%",
 "url": "skin/Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709.png",
 "paddingRight": 0,
 "class": "Image",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "click": "if(!this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0.get('visible')){ this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, false, 0, null, null, false) }",
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "borderSize": 0,
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "paddingBottom": 0,
 "data": {
  "name": "CMED"
 },
 "shadow": false
},
{
 "id": "IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48",
 "maxHeight": 50,
 "maxWidth": 50,
 "horizontalAlign": "center",
 "width": "100%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "minHeight": 1,
 "propagateClick": false,
 "borderSize": 0,
 "pressedRollOverIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_pressed_rollover.png",
 "minWidth": 1,
 "paddingTop": 0,
 "height": "25%",
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Website"
 },
 "pressedIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2",
 "maxHeight": 50,
 "maxWidth": 50,
 "horizontalAlign": "center",
 "width": "100%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "25%",
 "click": "this.openLink('https://www.google.com/maps/place/CMED+Construction+Company/@11.5450478,104.9248668,15z/data=!4m5!3m4!1s0x0:0x7e215fce7b5af38c!8m2!3d11.5450478!4d104.9248668', '_blank')",
 "minWidth": 1,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Map"
 },
 "pressedIconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2_pressed.png",
 "cursor": "hand",
 "shadow": false
},
{
 "id": "IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300",
 "maxHeight": 50,
 "maxWidth": 50,
 "horizontalAlign": "center",
 "width": "100%",
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300_rollover.png",
 "mode": "push",
 "paddingLeft": 0,
 "propagateClick": false,
 "borderSize": 0,
 "height": "25%",
 "click": "this.openLink('https://www.linkedin.com/company/cmedcc/', '_blank')",
 "minWidth": 1,
 "paddingTop": 0,
 "transparencyActive": false,
 "paddingBottom": 0,
 "data": {
  "name": "Linkin"
 },
 "pressedIconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300_pressed.png",
 "cursor": "hand",
 "shadow": false
}],
 "scrollBarOpacity": 0.5,
 "mouseWheelEnabled": true,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player3105"
 },
 "vrPolyfillScale": 0.5,
 "backgroundPreloadEnabled": true,
 "shadow": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
