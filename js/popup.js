$(function(){
	// Check language item last selected:
	var $storage_lang;
	var $storage_style
	chrome.storage.sync.get(null, function(data){
				if (data['lang']){
					$storage_lang = data['lang'];
					if($('#lang-dropdown').val() != $storage_lang){
						$('#lang-dropdown').val($storage_lang);
						// console.log('Storage lang:'+$storage_lang);
					}
				}
				if(data['style']){
					$storage_style = data['style'];
					if($('#style-dropdown').val() != $storage_style){
						$('#style-dropdown').val($storage_style);
						// console.log('Storage lang:'+$storage_style);
					}
				}
			});
	// This should be run after getting and inserting the code.
	// $('div._code').attr('style',function(i,style){
	// 		style.replace(/background[^;]*white.*;/g, '');
	// 		console.log('fired early?');
	// 	});

	// console.log($('*').filter(function(){
	// 	console.log($(this).css('background') == 'white');
	// }));

	// console.log($('div.code_container').next('div'));

	$('#lang-dropdown').on('change', function(){
		$lang = $('#lang-dropdown').val();
		chrome.storage.sync.set({'lang':$lang}, function(){
			console.log("Language set to "+$lang);
		});
	})

	$('#style-dropdown').on('change', function(){
		$style = $('#style-dropdown').val();
		chrome.storage.sync.set({'style':$style}, function(){
			console.log("Style set to "+$style);
		});
	})

	// To get selected item.
	// console.log($('#lang-dropdown').val());
	$('button').on('click',function(){
		// console.log('sup')

		// console.log($('select#lang-dropdown').find(':selected').val());
		var code = $('div.code_container').children('textarea').val();
		// var lang = $('select#lang-dropdown').find(':selected').text().toLowerCase();
		var lang = $('#lang-dropdown').val();
		var style = $('#style-dropdown').val();
		// console.log(lang);
		// console.log(code);
		// $(code).val('AH!');
		pygments.getCode(code,lang,style);
		// console.log('fired!');
		
		// pygments.editCSS();
	});
});

var pygments = {
	getCode: function(xcode,xlang,xstyle){
		// console.log('works!'+code);

		// Some AJAX
		$.ajax({
			type:"POST",
			url:"http://hilite.me/api",
			data:{code:xcode,lexer:xlang,style:xstyle,divstyles:'color:black;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;border-radius:5px;'}
		}).done(function(html){
			$('div.code_container').children('textarea').val(html);
			// $('div.code_container').insertAfter(html);
			// Inserting after:
			$(html).insertAfter('div.code_container');
			console.log('Fired!');
			$('div._code').attr('style',function(i,style){
					style.replace(/background[^;]*white.*;/g, '');
					console.log('fired early?');
				});	
			// console.log(this);
			// $('')
		});
	},
	editCSS: function(){
		// ======= TODO ===== : Try to select new generated div and add a class/properties to it.
		// console.log($('div.code_container').next('div'));
		// console.log($('div.code_container'));
		// console.log($('pre').parent('div'));
	}
}