$(window).load(function() {
                if ($("#wrapperSearchModal").length) {
                    $("#wrapperSearchModal").css({ "background-color": "#444", "opacity": ".95"});
                }
            });
                
            $(function() {

                var cookie = PNX.utils.Cookie,
                    wrapperName = '{!$Setup.Authentication_Wrapper__c.Application_Name__c}',
                    apiKey = '{!$Setup.Authentication_Wrapper__c.API_Key__c}',
                    locale = cookie.get("locale");
                var myCallback = function(args) {}
                
                var injectWrapper = function(data) {
                    $invisibleHeader = data[locale][
                        'invisibleHeader'
                    ],
                        $visibleHeader = data[locale][
                        'visibleHeader'
                    ],
                        $visibleFooter = data[locale][
                        'visibleFooter'
                    ];
                    //$invisibleFooter = data[locale]['invisibleFooter']; -- removed because it only contains DTM code and does't work as it loads too late
                    
                    $('head').prepend($invisibleHeader);
                    
                    $.getScript(
                        "//www.ni.com/niassets/wrapper/js/cartCount.js",
                        function() {});
                    $.getScript(
                        "//www.ni.com/niassets/wrapper/js/cookielaw.js",
                        function() {});
                    
                    $('#ni-vis-head').html($visibleHeader).fadeIn(600);
                    $('#ni-vis-foot').html($visibleFooter).fadeIn(
                        600).promise().done(function() {
                        //$('#ni-invis-foot').html($invisibleFooter).promise().done(function(){
                        setTimeout(function() {
                            $(document).trigger(
                                "navBar");
                            $(document).trigger(
                                "globalGatewayPanel"
                            );
                            $(document).trigger(
                                "myAccount");
                            $(document).trigger(
                                "globalSearch");
                            $(document).trigger(
                                "upMobileData");
                            
                            $(".gg-panel ul li").click(function(e) {
                                //debugger;
                                // If we have the attribute data-locale then we proceed to change the locale cookie
                                // This will prevent us from triggering a false positive for other anchor tags such as "more"
                                // if ($(this).attr("data-locale"))
                                //changed this to be able to activate this feature from clicking the li, rather than the a
                                if ($(this).children("a").attr("data-locale")) {
                                    e.preventDefault();
                                    // Get the locale information from the anchor tag
                                    var locale = $(this).children("a").data("locale");
                                    
                                    // Update the locale cookie with the new information
                                    var localeCookieDate = new Date;
                                    localeCookieDate.setFullYear(localeCookieDate.getFullYear() + 2);
                                    /*
                                    PNX.utils.Cookie.set("locale", locale, {
                                        "domain": ".ni.com",
                                        "path": "/",
                                        "expires": localeCookieDate.toGMTString()
                                    });
                                    */
                                    PNX.utils.Cookie.set("locale", locale);
                                    
                                    // checks to see if this is shop page other...if so, redirects to main shop page
                                    
                                    if ($('li.products').hasClass('current')) {
                                        //redirect to older shop experience
                                        location.href = "//www"  + HOST_ENVIROMENT(location.hostname) + ".ni.com/" + locale.toLowerCase() + "/shop.html"
                                        
                                    }
                                    
                                    else {
                                        var str = window.location.search;
                                        str = replaceQueryParam('l', locale, str);
                                        var loc=  window.location.pathname + str; 
                                        if (loc.substring(loc.length-1,loc.length)=='#')
                                        {
                                            location.href = loc.substring(0, loc.length-1);      
                                        }
                                        else
                                        {
                                            location.href = loc;
                                        }
                                        
                                        //location.reload();
                                    }
                                }
                            }); 
                        }, 800);
                        
                    });
                }
                
                var fallback = function() {
                    var gg = $(".global-gateway");
                    
                    // Add return path to the end of the GG link
                    gg
                    .attr("href", function(i, val) {
                        return val + "?rtrn=" +
                            encodeURIComponent(window.location
                                               .href);
                    });
                    
                    var year = new Date();
                    $('.copywriteYear').html(year.getFullYear());
                    
                    // Show the fall back wrapper
                    $('#ni-vis-head').find('.global-header').show();
                }
                
                /*
                var getWrapper = function() {
                    jQuery.ajax({
                        url: "//flux.ni.com/wrapper-markup/1/wrapper/" +
                        wrapperName + ".json?locale=" +
                        locale + "&ni-api-key=" +
                        apiKey,
                        cache: true,
                        timeout: 3000,
                        jsonp: 'callback',
                        jsonpCallback: 'injectWrapper',
                        dataType: "jsonp",
                        success: function(data) {
                            injectWrapper(data);
                        },
                        error: function() {
                            fallback();
                        }
                    });
                }
                
                //FOR GLOBAL GATEWAY ON SAAS
                if (!locale) {
                    locale = 'en-US';
                    getWrapper();                    
                } else {
                    getWrapper();
                }
                */
                
            });
            function replaceQueryParam(param, newval, search) {
                var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
                var query = search.replace(regex, "$1").replace(/&$/, '');
                
                return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
            }