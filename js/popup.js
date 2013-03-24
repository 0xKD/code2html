$(function(){
		// $('#lang-dropdown').dropdown()
		$('button').on('click',function(){
			// console.log('sup')

			// console.log($('select#lang-dropdown').find(':selected').val());
			var code = $('div.code_container').children('textarea').val();
			// var lang = $('select#lang-dropdown').find(':selected').text().toLowerCase();
			var lang = $('select#lang-dropdown').find(':selected').val();
			var style = $('select#style-dropdown').find(':selected').val();
			// console.log(lang);
			// console.log(code);
			// $(code).val('AH!');
			pygments.getCode(code,lang,style);
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
			data:{code:xcode,lexer:xlang,style:xstyle}
		}).done(function(html){
			$('div.code_container').children('textarea').val(html);
			// $('div.code_container').insertAfter(html);
			// Inserting after:
			$(html).insertAfter('div.code_container');
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