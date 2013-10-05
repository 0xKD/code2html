function copy(str) {
	// $('#sandbox').removeAttr('display');
	var sandbox = $('#sandbox').val(str).select();
	document.execCommand('copy');
	$('#sandbox').val('');
	$('#sandbox').css('display','none');
}

function clear_code(){
	$('#code_area').val('').focus()
}

$(function(){
	// Check language item last selected:
	var stored_lang, stored_style;
	var code, lang, style, $divstyles;

	chrome.storage.sync.get(null, function(data){
		if (data['lang']){
			stored_lang = data['lang'];
			if($('#lang-dropdown').val() != stored_lang){
				$('#lang-dropdown').val(stored_lang);
			}
		}
		if(data['style']){
			stored_style = data['style'];
			if($('#style-dropdown').val() != stored_style){
				$('#style-dropdown').val(stored_style);
			}
		}
		if (data['rounded-corners']){
			$('#rounded-corners').attr('checked',data['rounded-corners']);
		}
		if (data['borders']){
			$('#borders').attr('checked',data['borders']);
		}
	});

	$('div.options').on('change', function(){
		var border_radius, borders;
		lang = $('#lang-dropdown').val();
		style = $('#style-dropdown').val();
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
			'lang':lang, 
			'style':style, 
			'rounded-corners':border_radius,
			'borders':borders
		}, function(){
			console.log('[+] chrome.storage.sync.set');
		});
	});

	$('#clip').on('click', function(){
		$('#sandbox').css('display','inline');
		var code = $('#code_area').val();
		copy(code);
		clear_code();
	});

	$('#clear').on('click', clear_code);

	$('#hglt').on('click', function(){
		code = $('#code_area').val();
		lang = $('#lang-dropdown').val();
		style = $('#style-dropdown').val();
		$divstyles = 'padding:.2em .6em;';
		$('input[type=checkbox]:checked').each(function(){
			if (this.id == 'rounded-corners'){
				$divstyles += 'border-radius:5px;';
			}
			else if(this.id == 'borders'){
				$divstyles += 'border:solid gray;border-width:.1em .1em .1em .8em;';
			}
		});
		hilite.getCode(code,lang,style,$divstyles);
	});

});

var hilite = {
	getCode: function(xcode,xlang,xstyle,xdivstyles){
		$.ajax({
			type:"POST",
			url:"http://hilite.me/api",
			data:{code:xcode,lexer:xlang,style:xstyle,divstyles:xdivstyles}
		}).done(function(html){
			$('#code_area').val(html);
			$(html).insertAfter('div.code_container');
			$('div._code').attr('style',function(i,style){
				style.replace(/background[^;]*white.*;/g, '');
			}); 
		});
	}
}