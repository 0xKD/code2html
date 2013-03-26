$(function(){
	// Check language item last selected:
	var $storage_lang, $storage_style;
	var $code, $lang, $style, $divstyles;

	chrome.storage.sync.get(null, function(data){
		if (data['lang']){
			$storage_lang = data['lang'];
			if($('#lang-dropdown').val() != $storage_lang){
				$('#lang-dropdown').val($storage_lang);
			}
		}
		if(data['style']){
			$storage_style = data['style'];
			if($('#style-dropdown').val() != $storage_style){
				$('#style-dropdown').val($storage_style);
			}
		}
		if (data['rounded-corners']){
			$('input#rounded-corners').attr('checked',data['rounded-corners']);
		}
		if (data['borders']){
			$('input#borders').attr('checked',data['borders']);
		}
	});
	$('div.options').on('change', function(){
		var border_radius, borders;
		$lang = $('#lang-dropdown').val();
		$style = $('#style-dropdown').val();
		$('input[type=checkbox]:checked').each(function(){
			if (this.id == 'rounded-corners'){
				border_radius = 'checked';
			}
			else if(this.id == 'borders'){
				borders = 'checked';
			}
		});
		$('input[type=checkbox]:not(:checked)').each(function(){
			if (this.id == 'rounded-corners'){
				border_radius = '';
			}
			else if(this.id == 'borders'){
				borders = '';
			}
		});
			chrome.storage.sync.set({
				'lang':$lang, 
				'style':$style, 
				'rounded-corners':border_radius,
				'borders':borders
			}, function(){
				console.log('lang:'+$lang+' style:'+$style+' rc:'+border_radius+' border:'+borders);
			});
	});
	$('button').on('click', function(){
		$code = $('div.code_container').children('textarea').val();
		$lang = $('#lang-dropdown').val();
		$style = $('#style-dropdown').val();
		$divstyles = 'padding:.2em .6em;';
		$('input[type=checkbox]:checked').each(function(){
			if (this.id == 'rounded-corners'){
				$divstyles += 'border-radius:5px;';
			}
			else if(this.id == 'borders'){
				$divstyles += 'border:solid gray;border-width:.1em .1em .1em .8em;';
			}
		});
		hilite.getCode($code,$lang,$style,$divstyles);
	});
});

var hilite = {
	getCode: function(xcode,xlang,xstyle,xdivstyles){
		$.ajax({
			type:"POST",
			url:"http://hilite.me/api",
			data:{code:xcode,lexer:xlang,style:xstyle,divstyles:xdivstyles}
		}).done(function(html){
			$('div.code_container').children('textarea').val(html);
			$(html).insertAfter('div.code_container');
			$('div._code').attr('style',function(i,style){
				style.replace(/background[^;]*white.*;/g, '');
				console.log('fired early?');
			}); 
		});
	}
}