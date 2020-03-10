/*
* --------------------------------------------------------------------------------------------------------------------------------------
* Modification History:
* Date              Author              Modifications
* 16-APR-2018       Irene Zuniga        Creating file in order to remove inline code.
* 19-SEP-2019		Joseph Ramirez		Changed the method to access to make it compatible with IE11.
* --------------------------------------------------------------------------------------------------------------------------------------
*/

/*Code for Locale Redirect Handling. This is run at very beginning of the page load*/
var localeCookie = getCookie("locale");

                
if(localeCookie != ""){

    var url = new URL(window.location.href);
	var currentUrlLangParam = url.searchParams.get("l");

	if(localeCookie != currentUrlLangParam){
		var setParams = new URLSearchParams(window.location.search);
		setParams.set('l',localeCookie);
		var newParams = setParams.toString();
		window.location.href = window.location.href.split('?')[0] + "?" + newParams;
	}
}
				
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
/*End of Code for Locale Redirect Handling*/

/*Code for Article Feedback Handling*/
function getUrlVariable(variable)
{
    return (location.search.split(variable + '=')[1] || '').split('&')[0];
}

function storeArticleMetadata(pLocalStorageKey, pArticleVersionId)
{
    var obj = new Object();
    obj.uniqueSessionId = Math.random().toString(16).substr(2);
    obj.articleVersionId = pArticleVersionId;
    obj.voteValue = ' ';
    window.localStorage.setItem(pLocalStorageKey,JSON.stringify(obj));
}

function updateLocalStorageValue(pLocalStorageKey, pSessionValue)
{
    window.localStorage.setItem(pLocalStorageKey,pSessionValue);
}

function getUrlVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
/*End of Code for Article Feedback Handling*/


/*Code run at the beginning of the page load, when the DOM is ready*/
$(document).ready(function(){
    /*Code for Reported In Pop up message*/
	$(".blog-reported-popover")
		.click(function(e) {
			e.preventDefault();
			$(this).popover("show");
		})
		.popover({
			html : true,
			placement: function (context, source) {
				return "bottom";
			},
			content: function() {
				return $(this).next('.popover-content').children(".popover-body").html();
			},
			title: '<svg class="close" onclick="$(&quot;.blog-reported-popover&quot;).popover(&quot;hide&quot;);" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600" width="25" height="25" enable-background="new 0 0 600 600" xml:space="preserve">'+
						'<polygon style="fill: white;" points="600,-0.24 562.513,-0.24 300.104,279.038 37.695,-0.24 0.208,-0.24 281.361,299.656 0.208,599.552 37.695,599.552 300.104,320.274 562.513,599.552 600,599.552 318.848,299.656 "></polygon>'+
					'</svg>'
		})
		.on("show.bs.popover", function(){
			$(this).data("bs.popover").tip().css({"max-width":"300px"});
		});
});