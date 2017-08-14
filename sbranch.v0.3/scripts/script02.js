    //window.onload = function () {
    (function (jQuery, Firebase, Path) {
            "use strict";

            var _conventionIP = 1,                                          // conventionIP
                _lat = void 0,                                              // lat
                _lng = void 0,                                              // lng
                _latlng = void 0,                                           // latlng
                _geocoder = void 0,                                         // geocoder
                _apiUrlBase = void 0,                                       // apiUrlBase
                _routeMap = {
                    '#/': {
                        form: 'frmGiftAidersList',
                        controller: 'giftaiderslist'
                    },
                    '#/donations': {
                        form: 'frmDonationsList',
                        controller: 'donationslist'
                    },
                    '#/itemsshopfloor': {
                        form: 'frmItemsShopFloorList',
                        controller: 'itemsshopfloorlist'
                    },
                    '#/staff': {
                        form: 'frmStaffList',
                        controller: 'stafflist'
                    },
                    '#/resume': {
                        form: 'frmResumeList',
                        controller: 'resumelist'
                    },
                    '#/login': {
                        form: 'frmLogin',
                        controller: 'login'
                    },
                    '#/about': {
                        form: 'frmAbout',
                        controller: 'about'
                    },
                    //'#/languages': {
                    //    form: 'frmLanguages',
                    //    controller: 'languages'
                    //},
                    '#/logout': {
                        form: 'frmLogout',
                        controller: 'logout'
                    },
                    '#/register': {
                        form: 'frmRegister',
                        controller: 'register'
                    },
                    '#/adminCompanies': {
                        form: 'frmAdminCompanies',
                        controller: 'adminCompanies',
                        authRequired: true,
                        group: 'admin'
                    },
                    '#/adminAdministrative': {
                        form: 'frmAdminAdministrative',
                        controller: 'adminAdministrative',
                        authRequired: true,
                        group: 'admin'
                    }
                },
                getScript = function (p) {
                    $.ajaxSetup({ async: false });
                    var result = "";
                    if (p !== "") {
                        $.getJSON(_sbResourcesUrl + p + ".json?auth=" + _e + _d).success(function (a) {
                            if (a != "" && a != null) {
                                result = a.converti();
                                if (result.indexOf("+idiomas+") > 0) {
                                    var str = '<li><a rel="nofollow" href="#/" class="idioma yy">xxxxxxxx</a></li>',
                                        colletion = "";
                                    for (var i = 0; i < _languagesCod.length; i++) {
                                        colletion = colletion + str.replace('yy', _languagesCod[i].substring(0, 2)).replace('xxxxxxxx', _languagesDef[i]);
                                    }
                                    result = result.replace("+idiomas+", colletion);
                                }
                            };
                            //console.log("script: " + result);
                        }).then(function () {
                            if (result !== "")
                                console.log("load successful script");
                        });
                    }
                    $.ajaxSetup({ async: true });
                    return result;
                },
                getImage = function (p) {
                    $.ajaxSetup({ async: false });
                    var result = "";
                    if (p !== "") {
                        $.getJSON(_sbResourcesUrl + p + ".json?auth=" + _e + _d).success(function (a) {
                            if (a != "" && a != null) {
                                result = a;
                            };
                            //console.log("img: " + result);
                        }).then(function () {
                            if (result !== "")
                                console.log("load successful image");
                        });
                    }
                    $.ajaxSetup({ async: true });
                    return result;
                },
                getLangCurrently = function () {
                    return _languagesCod.toString().substring(_languagesCod.toString().indexOf("," + _userLang) + 1, _languagesCod.toString().indexOf("," + _userLang) + 6);
                },
                routeTo = function (route) {
                    window.location.href = '#/' + route;
                },

            /// activeForm 
            /// store the active view (form) shown on the page
                activeForm = null,

            /// getList (id)
            /// - captura lista desde firebase
                getList = function (o, p) {
                    $.ajaxSetup({ async: false });

                    var result = "",
                        path = _branchId + "/" + o + "/";

                    path += (p != "" && p != null) ? p + "/" : "";

                    $.getJSON(_sbDataUrl + path + ".json?auth=" + _e + _d).success(function (a) {
                        result = (a != "" && a != null) ? a : null;
                    }).then(function () {
                        if (result !== "" && result !== null) {

                            console.log("load successful data")
                        } else { console.log(path + ": load no successful data") };
                    });

                    $.ajaxSetup({ async: true });
                    return result;
                },

            /// Cookie fields
            /// name:
            ///     "sb"
            /// value: (separados por "¦")
            ///     [0] user.Id
            ///     [1] user.CompanyId
            ///     [2] user.Category
            ///     [3] user.NameDisplay
            ///     [4] user.MobileNumber
            ///     [5] user.Email
            ///     [6] user.Twitter
            ///     [7] user.DefaultLenguage
            ///     [8] user.UserSecretKey
            ///     [9] user.License_sb

            /// setAccessToken(value)
            ///  set user cookie
            ///
                setAccessToken = function (a) {
                    var t = new Date;
                    t.setTime(t.getTime() + 864e5);
                    var e = "expires=" + t.toUTCString();
                    document.cookie = "sb=" + a + "; " + e;
                },

            /// getAccessToken()                            -
            ///   get user cookie
            ///   return user data
                getAccessToken = function () {
                    for (var a = "sb=", t = document.cookie.split(";"), e = 0; e < t.length; e++) {
                        for (var n = t[e];
                            " " == n.charAt(0) ;) n = n.substring(1);
                        if (0 == n.indexOf(a)) return n.substring(a.length, n.length)
                    }
                    return ""
                },

            /// voiceMsg (lang, msg)
            ///
            ///
                voiceMsg = function (t, e) {
                    _synth = window.speechSynthesis;

                    var s;
                    try {
                        s = new RobotSpeaker
                    } catch (a) {
                        s = null;
                        console.log("status: " + a);
                    }

                    // Old method
                    //if (s) {
                    //    t = _languagesCod.toString().substr(_languagesCod.toString().indexOf(t), 5);
                    //    navigator.userAgent.toLowerCase().search(/android/) > -1 && (t = t.replace("-", "_"));
                    //
                    //    var _voi = void 0;
                    //    var langCurrently = getLangCurrently();
                    //    for (var v in _synth.getVoices()) {
                    //        if (_synth.getVoices()[v].lang === langCurrently) {
                    //            _voi = _synth.getVoices()[v]; 
                    //            console.log("lang: " + _voi.lang + " -- name: " + _voi.name);
                    //        }
                    //    }
                    //    s.u.voice = _voi;
                    //
                    //    s.speak(t, e)             // <-----
                    //}

                    var _utterThis = new SpeechSynthesisUtterance(e);
                    var _voi = void 0;
                    var langCurrently = getLangCurrently();
                    for (var v in _synth.getVoices()) {
                        if (_synth.getVoices()[v].lang === langCurrently) {
                            _voi = _synth.getVoices()[v];
                            console.log("lang: " + _voi.lang + " -- name: " + _voi.name);
                        }
                    }

                    _utterThis.voice = _voi;
                    _utterThis.lang = langCurrently;
                    _synth.speak(_utterThis)
                },

            /// voiceGet (lang, targe)
            ///
            ///
                voiceGet = function (t, e) {
                    //var s;
                    //try {
                    //    s = new AudioListener
                    //} catch (a) {
                    //    s = null
                    //}
                    //if (s) {
                    //    t = _languagesCod.toString().substr(_languagesCod.toString().indexOf(t), 5),
                    //    navigator.userAgent.toLowerCase().search(/android/) > -1 && (t = t.replace("-", "_")),
                    //    s.listen(t, function (t) {
                    //        document.getElementById(e).value = t
                    //    })
                    //}
                    var s;
                    try { s = new AudioListener } catch (a) { s = null }
                    if (s) {
                        var t = "en-UK";
                        navigator.userAgent.toLowerCase().search(/android/) > -1 && (t = t.replace("-", "_"));
                        s.listen(t, function (snap) {
                            document.getElementById(e).value = snap
                        })
                    }
                },

            /// setUbicacion (position)
            ///
            ///
                setUbicacion = function (t) {
                    _lat = t.coords.latitude, _lng = t.coords.longitude;
                    var e = getAccessToken().split("¦");
                    if (logFile) {
                        var s = _lat + ", " + _lng,
                            a = e[0] + "  IP " + _conventionIP + "  latlng " + s;
                        logFile = !1;
                    } else _latlng = new google.maps.LatLng(_lat, _lng), flagDemo ? (_lat = _routeMap.lat, _lng = _routeMap.lng, _latlng = new google.maps.LatLng(_lat, _lng), _addressOrig = _routeMap.adr) : geocoder.geocode({
                        latLng: _latlng
                    }, function (t, e) {
                        e === google.maps.GeocoderStatus.OK ? t[0] ? _addressOrig = t[0].formatted_address : $("#mapCanvas").append("<br/>  " + _dictionary.w193) : $("#mapCanvas").append("<br/>  " + _dictionary.w194 + ": " + e)
                    })
                },

            /// codeAddress (address)
            /// - antes _fn019
            ///
                codeAddress = function (t) {
                    var e;
                    return geocoder = new google.maps.Geocoder, geocoder.geocode({
                        address: t
                    }, function (t, e) {
                        e == google.maps.GeocoderStatus.OK ? coordendas = t[0].geometry.location : console.log("Geocode was not successful for the following reason: " + e)
                    }), e
                },

            /// geoError (error_codes)
            /// - antes _fn020
            ///
                geoError = function (t) {
                    switch (t) {
                        case "NOT_SUPPORTED":
                            console.log(_dictionary.w195);
                            break;
                        case "PERMISSION_DENIED":
                            console.log(_dictionary.w196);
                            break;
                        case "POSITION_UNAVAILABLE":
                            console.log(_dictionary.w197);
                            break;
                        case "TIMEOUT":
                            console.log(_dictionary.w198);
                            break;
                        case "UNKNOWN_ERROR":
                            console.log(_dictionary.w199)
                    }
                },

            /// thirdPartyLogin(provider)
            ///  Handle third party login providers
            ///  returns a promise
                thirdPartyLogin = function (provider) {
                    var deferred = $.Deferred();
                    _rootRef.authWithOAuthPopup(provider, function (err, user) {
                        if (err) { deferred.reject(err); }
                        if (user) { deferred.resolve(user); }
                    });
                    return deferred.promise();
                },

            /// authWithPassword(userObj)
            ///  Handle Email/Password login
            ///  returns a promise
                authWithPassword = function (userObj) {
                    var deferred = $.Deferred();
                    console.log(userObj);
                    _rootRef.authWithPassword(userObj, function onAuth(err, user) {
                        if (err) { deferred.reject(err); }
                        if (user) { deferred.resolve(user); }
                    });
                    return deferred.promise();
                },

            /// createUser(userObj)
            ///  create a user but not login
            ///  returns a promsie
                createUser = function (userObj) {
                    var deferred = $.Deferred();
                    _rootRef.createUser(userObj, function (err) {
                        if (!err) {
                            deferred.resolve();
                        } else {
                            deferred.reject(err);
                        }
                    });

                    return deferred.promise();
                },

            /// createUserAndLogin(userObj)
            ///  create a user and then login in
            ///  returns a promise
                createUserAndLogin = function (userObj) {
                    return createUser(userObj)
                        .then(function () {
                            return authWithPassword(userObj);
                        });
                },

            /// authAnonymously()
            ///  authenticate anonymously
            ///  returns a promise
                authAnonymously = function () {
                    var deferred = $.Deferred();
                    _rootRef.authAnonymously(function (err, authData) {
                        if (authData) { deferred.resolve(authData); }
                        if (err) { deferred.reject(err); }
                    });

                    return deferred.promise();
                },

            /// handleAuthResponse(promise, route)
            ///  route to the specified route if sucessful
            ///  if there is an error, show the console.log
                handleAuthResponse = function (promise, route) {
                    $.when(promise)
                        .then(function (authData) {

                            // route
                            routeTo(route);

                        }, function (err) {
                            console.log(err);
                            // pop up error
                            showAlert({
                                title: err.code,
                                detail: err.message,
                                className: 'console.log-danger'
                            });

                        });
                },

            /// rad
            /// -
                rad = function (t) {
                    return t * Math.PI / 180
                },

            /// getDistance
            ///
                getDistance = function (t, e) {
                    var s = 6378137,
                        a = rad(e.lat() - t.lat()),
                        n = rad(e.lng() - t.lng()),
                        r = Math.sin(a / 2) * Math.sin(a / 2) + Math.cos(rad(t.lat())) * Math.cos(rad(e.lat())) * Math.sin(n / 2) * Math.sin(n / 2),
                        i = 2 * Math.atan2(Math.sqrt(r), Math.sqrt(1 - r)),
                        o = s * i;
                    return o
                },

            /// showAlert(opts)
            ///  options for showing the console.log box
            ///
                showAlert = function (opts) {
                    var title = opts.title;
                    var detail = opts.detail;
                    var className = 'console.log ' + opts.className;

                    //               console.logBox.removeClass().addClass(className);     //Uncaught TypeError: Cannot read property 'removeClass' of undefined
                    //               console.logBox.children('#console.log-title').text(title);
                    //               console.logBox.children('#console.log-detail').text(detail);
                },

            /// getMenu(tipou)
            ///  options for showing the menu box
            ///  userType
                getMenu = function (usertype) {
                    var strN1 = "",
                        strN2 = "",
                        html = [];

                    // menú Cabecera
                    if (getAccessToken() != "") {
                        strN1 = (getAccessToken().split("¦")[3]);
                        strN2 = strN1.indexOf(" ") > 0 ? strN1.substring(0, strN1.indexOf(" ")).capitalize() : strN1.substring(0).capitalize();
                    }

                    //try {
                    //    $.ajax({
                    //        type: "GET",
                    //        cache: !1,
                    //        async: "true",
                    //        url: _sbBaseUrl + "/sbForms/Menu/Cabecera/.json",
                    //        data: "",
                    //        contentType: "application/json; charset=utf-8",
                    //        dataType: "json",
                    //        processData: !1,
                    //        success: function (a, t, e) {
                    //            //a = a.replace("+imgLogo2+", companyData.ilg2).replace("+strN1+", strN1).replace("+strN2+", strN2);
                    //            a = a.replace("+imgLogo2+", getImage("/img/logo2")).replace("+strN1+", strN1).replace("+strN2+", strN2);
                    //            html.push(a);
                    //        },
                    //        error: function (a, t, e) {
                    //            //w = y;
                    //            w = '';
                    //        }
                    //    })
                    //} catch (s) {
                    //    //console.log(s.message)
                    //    return;
                    //}

                    //var a = getScript("/html/menu/head/");
                    var a = getScript("html/menu/head/");
                    //a = a.replace("+imgLogo2+", companyData.ilg2).replace("+strN1+", strN1).replace("+strN2+", strN2);
                    a = a.replace("+imgLogo2+", getImage("/img/logo2")).replace("+strN1+", strN1).replace("+strN2+", strN2);
                    html.push(a);

                    // menú Opciones según usertype
                    a = getScript("html/menu/options/" + usertype);
                    html.push(a);

                    return html.join("");
                },

            /// getForm(formName)
            ///  script for showing the form
            ///
                getForm = function (formName) {
                    // cargar form en div.id="container"
                    var html = [];

                    var a = getScript("html/" + formName);
                    html.push(a);

                    // -- ALERT BOX --
        //            if (formName !== "frmAbout")
        //                html.push("<hr />\n<div id=\"console.log\" class=\"console.log\" role=\"console.log\">\n<h4 id=\"console.log-title\">You are not logged in</h4>\n<p id=\"console.log-detail\"></p>\n</div>\n");

                    // -- FOOTER --
                    if (formName === "frmLogin" || formName === "frmAbout") {
                        var dtAhora = new Date();
                        html.push("<hr /><footer><p>&copy;" + dtAhora.getFullYear() + "&nbsp;<img src=\"" + getImage("/img/logo1") + "\" width=\"70\" height=\"30\" /> &nbsp;&nbsp; <span style=\"font-size:9; color: gray\">Powered By <span style=\"font-size:13; color: blue\"><i>scope</i></span></span></p></footer></div>\n");
                    }
                    return html.join("");
                };


            /// registerProcess  
            /// -
            function _fn010() {
                var t = {
                        Id: "",
                        Username: null == $("#UserName").val() ? "" : $("#UserName").val(),
                        Password: null == $("#Password").val() ? "" : $("#Password").val(),
                        IdERP: "",
                        CompanyId: null == $("#Company").val() ? "" : $("#License").val(),
                        OverseeId: "",
                        StarDate: null,
                        Category: null == $("#Category").val() ? ""[0] : $("#Category").val()[0],
                        NameDisplay: null == $("#NameDisplay").val() ? "" : $("#NameDisplay").val(),
                        DNI: null == $("#DNI").val() ? "" : $("#DNI").val(),
                        MobileNumber: null == $("#MobileNumber").val() ? "" : $("#MobileNumber").val(),
                        Imei: "",
                        Email: null == $("#Email").val() ? "" : $("#Email").val(),
                        Twitter: null == $("#Twitter").val() ? "" : $("#Twitter").val(),
                        DefaultLenguage: _userLang,
                        ActivationDate: null,
                        DeactivationDate: null,
                        UserSecretKey: "",
                        LastTokenDate: null
                    },
                    e = "/api/accounts";

                if (_ob001("POST", e, t), !_ob000.Result) {
                    var s = "Error: 498 - Expired or invalid token" == _ob000.Message ? "Usuario no activado." : _dictionary.w172;
                    return void $("#sbPopupMsg").bPopup({
                        autoClose: 3500,                        //Auto closes after 3500ms/3.5sec
                        onOpen: function () {
                            var t = [],
                                e = s;
                            t.push('<span class="buttonX b-close"><span><img src="./Images/btnClose.png"/></span></span>\n'),
                            t.push('<img src="./Images/msgbox_error.png" /><br/>\n'),
                            t.push(e),
                            t.push('<script type="text/javascript">\n'),
                            t.push('_fn002("' + _userLang + '", "' + e + '");\n'),
                            t.push("&lt;/script>\n"),
                            this.html(t.join(""))
                        },
                        position: [50, 100],
                        positionStyle: "absolute",
                        speed: 450,
                        transition: "slideDown",
                        onClose: function () {
                            this.html("")
                        }
                    })
                }
                _ob000 = {},
                tdC = void 0,
                window.location.reload()
            }

            /// setLoginS
            /// -
            function _fn011() {
                if ($("#navegation").html(_fn005("login")), $("#container").html(""), void 0 == tdB || _switchL) {
                    var t = [],
                    //e = "/?_screenType=setLoginS&_language=" + _userLang + "&_roll=&_user=" + _fn992();
                    e = "/?_screenType=setLoginS&_language=" + _userLang + "&_roll=";
                    _ob001("GET", e, "", "/Home/GetScreenTemplete"),
                    t.push(_ob000.Data),
                    tdB = t
                }
                $("#container").html(tdB.join("")),
                $("#container").attr("data-sbcontent", "login");

                //_ob003.init("");
                _ob003.init();
            }

            /// LoginProcess
            ///
            function _fn012() {
                //
                // return string: _user.Id + "¦" + _user.CompanyId + "¦" + _user.Category + "¦" + _user.NameDisplay + "¦" + _user.MobileNumber + "¦" + _user.Email + "¦" + _user.Twitter + "¦" + _user.DefaultLenguage + "¦" + _user.UserSecretKey + "¦" + _user.Lisence_sb;
                //
                //      [0] Id
                //      [1] CompanyId
                //      [2] Category
                //      [3] NameDisplay
                //      [4] MobileNumber
                //      [5] Email
                //      [6] Twitter
                //      [7] DefaultLanguage
                //      [8] UserSecretKey
                //      [9] Lisence_sb
                //
                var t = "",
                e = "/api/accounts/" + $("#UserName").val() + "/" + $("#Password").val();
                if (_ob001("GET", e, t), !_ob000.Result) {
                    var s = "Error: 498 - Expired or invalid token" == _ob000.Message ? "Usuario y contraseña aún no autorizado o bloqueado" : _dictionary.w172;
                    return void $("#sbPopupMsg").bPopup({
                        autoClose: 3500,
                        onOpen: function () {
                            var t = [],
                            e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + s;
                            t.push('<span class="buttonX b-close"><span><img src="./Images/btnClose.png" /></span></span>\n'), t.push('<img src="./Images/msgbox_error.png" /><br />\n'), t.push(e), t.push('<script type="text/javascript">\n'), t.push('_fn002("' + _userLang + '", "' + s + '");\n'), t.push("<&lt;script>\n"), this.html(t.join(""))},
                        position: [50, 100],
                        positionStyle: "absolute",
                        speed: 450,
                        transition: "slideDown",
                        onClose: function () {
                            this.html("")
                        }
                    })
                }
                ("" == _ob000.Data.split("¦")[7] || _userLang != _ob000.Data.split("¦")[7]) && (x = _ob000.Data.split("¦"), x[7] = _userLang, _ob000.Data = x.join("¦")), _fn991(_ob000.Data), _ob003.init(), _ob000 = {}, window.location.reload()
                //("" == _ob000.Data.split("¦")[7] || _userLang != _ob000.Data.split("¦")[7]) && (x = _ob000.Data.split("¦"), x[7] = _userLang, _ob000.Data = x.join("¦")), _fn991(_ob000.Data), _ob003.init(_ob000.Data.split("¦")[9]), _ob000 = {}, window.location.reload()
            }

            /// LogOut
            /// -
            function _fn013() {
                _fn991(""),
                tdA = void 0,
                tdB = void 0,
                tdC = void 0,
                lat = void 0,
                lng = void 0,
                latlng = void 0,
                geocoder && (geocoder = new google.maps.Geocoder),
                _addressOrig = void 0,
                _addressDest = void 0,
                map = void 0,
                dirService = void 0,
                dirRenderer = void 0,
                route = void 0,
                waypts = [],
                bounds = void 0,
                query = void 0,
                panning = !1,
                markerArray = [],
                tdPed = void 0,
                _sbList = [],
                tdWOrd = void 0,
                tdWOList = [],
                facProcess = !0,
                _switchL = !1,
                _bandera = !0,
                _position = void 0,
                $("#container").attr("data-sbcontent", ""),
                _fn011()
            }

            /// showRoute
            /// -
            function _fn014() {
                $(window).width() < 994 && ($("#mapa").show(), $("#rutas").hide()), r = parseInt(rutaActual.replace("tit", "")) - 1, routeQuery = {
                    origin: route.legs[r].start_address,
                    destination: route.legs[r].end_address,
                    travelMode: query.travelMode
                }, dirService.route(routeQuery, function (t, e) {
                    if (e == google.maps.DirectionsStatus.OK) {
                        for (var s = 0; s < markerArray.length; s++) markerArray[s].setMap(null);
                        markerArray = [];
                        dirRenderer.setDirections(t), bounds = new google.maps.LatLngBounds, bounds.extend(t.routes[0].overview_path[0]);
                        var a = t.routes[0].overview_path.length;
                        bounds.extend(t.routes[0].overview_path[a - 1]), panning = !0, map.panTo(bounds.getCenter());
                        var n = t.routes[0].legs[0];
                        _fn015(n)
                    }
                })
            }

            /// showSteps (dirResult)
            /// -
            function _fn015(t) {
                for (var e = t, s = 0; s < e.steps.length; s++) {
                    var a = new google.maps.Marker({
                        position: e.steps[s].start_location,
                        map: map
                    }),
                    n = s + 1,
                    r = n + ". - " + e.steps[s].instructions + "<br />" + _dictionary.w042 + ": " + e.steps[s].distance.text + "<br />" + _dictionary.w043 + ": " + e.steps[s].duration.text;
                    _fn016(a, r), markerArray[s] = a
                }
            }

            /// attachInstructionText (marker, text)
            /// -
            function _fn016(t, e) {
                google.maps.event.addListener(t, "click", function () {
                    stepDisplay.setContent(e), stepDisplay.open(map, t)
                })
            }

            /// getHour (object)
            /// -
            function _fn023(t) {
                var e = "div" + t.id,
                s = new Date,
                a = s.getHours(),
                n = s.getMinutes(),
                r = s.getSeconds(),
                i = "";
                if (10 > a && (a = "0" + a), 10 > n && (n = "0" + n), 10 > r && (r = "0" + r), i = a + ":" + n, "divEnd_" === e) {
                    var o = -1,
                    p = route.waypoint_order.length;
                    if (p > -1) {
                        for (var d = p; d > -1; d--)
                            if (null != tdWOrd.Ruta.Ways[d].Star && null == tdWOrd.Ruta.Ways[d].End) {
                                p = d;
                                break
                            }
                        tdWOrd.Ruta.Ways[p].End = s;
                        var l = s,
                        u = tdWOrd.Ruta.Ways[p].Star,
                        c = new Date,
                        h = new Date;
                        c.setHours(l.getHours(), l.getMinutes(), l.getSeconds()), h.setHours(u.getHours(), u.getMinutes(), u.getSeconds()), c.setHours(c.getHours() - h.getHours(), c.getMinutes() - h.getMinutes(), c.getSeconds() - h.getSeconds());
                        var g = (tdWOrd.Ruta.Ways[p].End - tdWOrd.Ruta.Ways[p].Star) / 1e3,
                        b = (c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds()).split(":"),
                        m = b[0] > 0 ? b[1] > 0 ? parseInt(b[0]) + " hr " + parseInt(b[1]) + " min" : parseInt(b[0]) + " hr " : b[1] > 0 ? parseInt(b[1]) + " min" : "";
                        tdWOrd.Ruta.Ways[p].Duration.real.text = "" != m ? m : null, tdWOrd.Ruta.Ways[p].Duration.real.value = "" != m ? parseInt(g).toString() : null
                    }
                    tdWOrd.Status = "C";
                    for (var f = "", v = $(".inicioRuta"), y = 0; y < v.length; ++y) -1 === v[y].innerHTML.search("<input ") && " " ===f && (f=v[y].innerHTML); "" !=f && ($("#" + e).html(" &nbsp;t.Hs <b>" + calcularHoras({ t1: f, t2: i}) + '</b> &nbsp;<span style="color: red;">' + i + "</span>"), _fn030("rutas"))
                } else {
                    $("#" + e).html(i), $("#End_").prop("disabled", !1);
                    var o = parseInt(e.substr(e.length - 2)) - 2,
                    p = -1 == o ? o : route.waypoint_order[o],
                    _ = parseInt(e.substr(e.length - 2)) - 1,
                    x = _ == route.waypoint_order.length ? _ : route.waypoint_order[_];
                    if (p > -1) {
                        tdWOrd.Ruta.Ways[p].End = s;
                        var l = s,
                        u = tdWOrd.Ruta.Ways[p].Star,
                        c = new Date,
                        h = new Date;
                        c.setHours(l.getHours(), l.getMinutes(), l.getSeconds()), h.setHours(u.getHours(), u.getMinutes(), u.getSeconds()), c.setHours(c.getHours() - h.getHours(), c.getMinutes() - h.getMinutes(), c.getSeconds() - h.getSeconds());
                        var g = (tdWOrd.Ruta.Ways[p].End - tdWOrd.Ruta.Ways[p].Star) / 1e3,
                        b = (c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds()).split(":"),
                        m = b[0] > 0 ? b[1] > 0 ? parseInt(b[0]) + " hr " + parseInt(b[1]) + " min" : parseInt(b[0]) + " hr " : b[1] > 0 ? parseInt(b[1]) + " min" : "";
                        tdWOrd.Ruta.Ways[p].Duration.real.text = "" != m ? m : null,
                        tdWOrd.Ruta.Ways[p].Duration.real.value = "" != m ? parseInt(g).toString() : null
                    }
                    tdWOrd.Ruta.Ways[x].OriginAddress = route.legs[_].start_address,
                    tdWOrd.Ruta.Ways[x].Star = s,
                    tdWOrd.Ruta.Ways[x].End = null,
                    tdWOrd.Ruta.Ways[x].Duration.deal.text = null,
                    tdWOrd.Ruta.Ways[x].Duration.deal.value = null,
                    tdWOrd.Ruta.Ways[x].Duration.real.text = null,
                    tdWOrd.Ruta.Ways[x].Duration.real.value = null,
                    tdWOrd.Ruta.Ways[x].Distance.deal.text = null,
                    tdWOrd.Ruta.Ways[x].Distance.deal.value = null,
                    tdWOrd.Ruta.Ways[x].Distance.real.text = null,
                    tdWOrd.Ruta.Ways[x].Distance.real.value = null,
                    tdWOrd.Ruta.Ways[x].Duration.deal.text = route.legs[_].duration.text,
                    tdWOrd.Ruta.Ways[x].Duration.deal.value = route.legs[_].duration.value,
                    tdWOrd.Ruta.Ways[x].Distance.deal.text = route.legs[_].distance.text,
                    tdWOrd.Ruta.Ways[x].Distance.deal.value = route.legs[_].distance.value
                }
                _fn046(),
                lat = void 0 == lat ? _ob003.lat : lat,
                lng = void 0 == lng ? _ob003.lng : lng,
                tdWOrd.Ruta.GPSGeolocalization = new google.maps.LatLng(lat, lng).toString().replace("(", "").replace(")", ""),
                _fn034(),
                "divEnd_" === e && (map = void 0, dirService = void 0, dirRenderer = void 0, route = void 0, waypts = [], bounds = void 0, query = void 0, markerArray = [], infowindow = void 0, tdPed = void 0, pedidoClaveActual, _sbList = [], tdWOrd = void 0, _funcion = "setRutListaS", loadMap())
            }

            /// gpsShow
            ///
            function _fn024() {
                document.getElementById("gpsImg").src.search("/Images/btnGPS.png") > -1 ? document.getElementById("gpsImg").src = "./Images/btnGPS-slash.png" : document.getElementById("gpsImg").src = "./Images/btnGPS.png"
            }

            /// addMarker (location, map)
            /// - Adds a marker to the map and push to the array.
            ///
            function _fn025(t, e) {
                var s = new google.maps.Marker({
                    position: t,
                    map: e
                });
                markerArray.push(s)
            }

            /// setMapOnAll (map)
            /// - Sets the map on all markers in the array.
            function _fn026(t) {
                for (var e = 0; e < markerArray.length; e++) markerArray[e].setMap(t)
            }

            /// clearMarkers
            /// - Removes the markers from the map, but keeps them in the array.
            function _fn027() {
                _fn026(null)
            }

            /// showMarkers
            /// - Shows any markers currently in the array.
            function _fn028() {
                _fn026(map)
            }

            /// deleteMarkers
            /// - Deletes all markers in the array by removing references to them.
            function _fn029() {
                _fn027(), markerArray = []
            }

            /// createWorkingReport (elementHTML)
            /// -
            function _fn030(t) {
                var ilg1;
                _ob001("GET", "", "", "/Home/GetLogo/?x=1"),
                ilg1 = JSON.parse(_ob000.Data).imglogo, _ob000 = {}

                for (
                    var e = new Date,
                    s = e.getDate(),
                    a = e.getMonth(),
                    n = e.getFullYear(),
                    r = (_fn069(s, 2) + "/" + _fn069(a + 1, 2) + "/" + _fn069(n, 4), _fn992().split("¦")),
                    i = $("#" + t)[0],
                    o = i.cloneNode(!0),
                    p = o.querySelectorAll(".c13"),
                    d = 0;
                    d < p.length;
                    d++)
                    p[d].removeAttribute("style");
                p = o.querySelectorAll(".inicioRuta");
                for (var d = 0; d < p.length; d++) p[d].innerHTML = -1 === p[d].innerHTML.search("<input ") ? " Inicio " + p[d].innerHTML : "" ;
                o.querySelector("#divEnd_").innerHTML=o.querySelector("#divEnd_").innerHTML.replace("t.Hs:", "total horas:" ), p=o.getElementsByTagName("script");
                for (var l=p.length, d=0; l> d; d++) p[0].parentNode.removeChild(p[0]);
                var u = o.innerHTML.substring(o.innerHTML.search("wrEnd") + 18),
                c = u.substring(u.search("ks: "), u.search("divEnd_") - 9).replace("<b>", "").replace("</b>", "").replace("<b>", "").replace("</b>", ""),
                h = c.substring(c.search("hs: ") + 4).split(":"),
                g = h[0] > 0 ? h[1] > 0 ? parseInt(h[0]) + " hr " + parseInt(h[1]) + " min" : parseInt(h[0]) + " hr " : h[1] > 0 ? parseInt(h[1]) + " min" : "";
                c = "Estimado: " + (c.substring(0, c.search("hs: ")) + g).replace("ks: ", "").replace(" - ", "km - ");
                var b = u.substring(u.search("&nbsp;") + 6, u.search("</span>")).replace("<b>", "").replace("</b>", "").replace('&nbsp;<span style="color: red;">', "      Fin: ");
                h = b.substring(b.search(": ") + 2, b.search("   Fin:")).split(":"), g = h[0] > 0 ? h[1] > 0 ? parseInt(h[0]) + " hr " + parseInt(h[1]) + " min" : parseInt(h[0]) + " hr " : h[1] > 0 ? parseInt(h[1]) + " min" : "", b = "Duración: " + g + b.substring(b.search("   Fin:"));
                var m = tdWOrd,
                f = new jsPDF;
                //f.addImage(_ob003.ilg1, "JPEG", 10, 5, 45, 15), f.setFontSize(22), f.text(70, 20, "Parte de Trabajo"), f.setFontSize(14), f.text(158, 20, "Nº " + m.Id), f.setFontSize(12), f.setFontStyle("bold"), f.text(20, 25, r[3]), f.setFontStyle("normal"), f.text(167, 25, getFormattedDate(m.WorkOrderDate)), f.setLineWidth(.1), f.line(20, 28, 190, 28);
                f.addImage(ilg1, "JPEG", 10, 5, 45, 15), f.setFontSize(22), f.text(70, 20, "Parte de Trabajo"), f.setFontSize(14), f.text(158, 20, "Nº " + m.Id), f.setFontSize(12), f.setFontStyle("bold"), f.text(20, 25, r[3]), f.setFontStyle("normal"), f.text(167, 25, getFormattedDate(m.WorkOrderDate)), f.setLineWidth(.1), f.line(20, 28, 190, 28);
                var v = 0;
                $.each(m.Ruta.Ways, function (t, e) {
                    f.setLineWidth(.1), f.line(20, 30 + 5 * v, 190, 30 + 5 * v), v++, v > 40 && (v = 0, f.addPage());
                    var s = _fn069(t + 1, 2),
                        a = $("#tit" + s).html(),
                        n = a.substring(49, a.search("</b></span>")).replace("&nbsp;", " "),
                        r = "Inicio: " + a.substring(a.search('; margin-right: 3%;">') + 21, a.search("</div><br>"));
                    a.search('<input id="Begin') > -1 && (r = " ");
                    var i=a.substring(a.search('</div><br><span style="font-size: 10pt;"><b>') + 44, a.search("</b></span> <i>")),
                        o = a.substring(a.search("</b></span> <i>") + 15, a.search("</i>; <span style=") + 6).replace("</i>; ", "; "),
                        p = a.substring(a.search('</i>; <span style="font-size: 10pt;"><b>') + 40, a.search("</i><br><b>")),
                        d = p.substring(p.search("</b></span> <i>") + 15);
                    p = p.substring(0, p.search("</b></span> <i>"));
                    var l = a.substring(a.search("</i><br><b>") + 11, a.search("</b><br><br>")).replace("</b> - <b>", " - ");
                    f.setTextColor(255, 0, 0), f.setFontSize(8), f.text(20, 35 + 5 * v, n), f.setTextColor(0, 0, 255), f.setFontSize(11), f.setFontStyle("bold"), f.text(146, 35 + 5 * v, r), f.setFontStyle("normal"), f.setFontSize(12), f.setTextColor(0, 0, 0), v++, v > 40 && (v = 0, f.addPage());
                    var u = i + " " + o + " " + p + " " + d;
                    f.setFontStyle("italic"), u.length < 95 ? f.text(20, 35 + 5 * v, u) : (f.text(20, 35 + 5 * v, u.substring(0, 94)), v++, v > 40 && (v = 0, f.addPage()), f.text(20, 35 + 5 * v, u.substring(94))), f.setFontStyle("normal"), v++, v > 40 && (v = 0, f.addPage()), f.text(20, 35 + 5 * v, l), v += 2, v > 40 && (v = 0, f.addPage()), $.each(e.Orders, function (e, s) {
                        var a = void 0;
                        if ("A" == s.Status) {
                            a = _dictionary.w045, tdWOrd.Ruta.Ways[t].Orders[e].Status = "O";
                            _fn032(s.Id, t, e);
                            tdWOrd.Ruta.Ways[t].Orders[e].Status = "A"
                        } else a = _dictionary.w044;
                        f.text(20, 35 + 5 * v, s.CustomerName), f.text(110, 35 + 5 * v, s.Id), "A" == s.Status ? f.setTextColor(102, 204, 102) : f.setTextColor(204, 51, 0), f.text(140, 35 + 5 * v, a), f.setTextColor(0, 0, 0), v++, v > 40 && (v = 0, f.addPage()), f.setFontSize(8), f.text(20, 35 + 5 * v, s.Address), f.setFontSize(12), v += 2, v > 40 && (v = 0, f.addPage())
                    })
                }), f.setLineWidth(.1), f.line(20, 30 + 5 * v, 190, 30 + 5 * v), v++, v > 40 && (v = 0, f.addPage()), f.text(20, 35 + 5 * v, "Totales: "), v++, v > 40 && (v = 0, f.addPage()), f.text(20, 35 + 5 * v, c), f.setTextColor(0, 0, 255), f.setFontSize(11), f.setFontStyle("bold"), f.text(136, 35 + 5 * v, b), f.output("dataurlnewwindow")
            }

            /// takePhotoInvoice (pedidoClave)
            ///
            function _fn031(t) {
                // t.split("¦")[0]      núemro de orden del trayecto en Ways
                // t.split("¦")[1]      número de orden de la factura en Orders
                // t.split("¦")[2]      Identificación de Factura
                // t.split("¦")[3]      segmento número
                var e = (_fn992().split("¦"), t.split("¦")[0], t.split("¦")[1], t.split("¦")[2]),
                    s = (t.split("¦")[3], "");
                $("#sbPopupMsg").bPopup({
                    onOpen: function () {
                        var t = '<span style="color: gray;">' + _dictionary.w063 + ' Nº</span> <b>' + e + "</b>",
                        s = [];
                        s.push('<span id="btnCancel" class="button b-close"><span>X</span></span>\n'),
                        s.push('<div id="header"><p id="mp1" style="text-align: center; font-size: 20px;">' + t + "</p></div>\n"),
                        s.push('<div id="mainbody" style="display: inline;"><table border="0"><tbody>\n'), s.push('<tr><td valign="top">\n'),
                        s.push('<div style="font-size: 14px;"><input type="file" accept="image/*;capture=camera" class="filestyle" onchange="javascript: _fn035(this.files);" /></div><br />\n'),
                        s.push("</td></tr>\n"),s.push('<tr><td><div id="result" width="240px" align="left">- ' + _dictionary.w066 + ' -</div><br /></td></tr>\n'),
                        s.push('<tr><td><input id="btnAceptar" class="btn btn-info b-close" type="button" value="' + _dictionary.w159 + '" disabled="disabled" /><br/></td></tr>\n'),
                        s.push("<tr><td><br />\n"),
                        s.push('<div><img id="photoInvoice" src="#" alt="' + _dictionary.w063 + '" style="display: none; width: 240px; height: 320px;" /></div>\n' ),
                        s.push('<div style="display: none;"><canvas id="out-canvas" width="320" height="240"></canvas></div>\n'),
                        s.push("</td></tr>\n"),
                        s.push("</tbody></table></div>\n"),
                        s.push('<canvas id="qr-canvas" width="800" height="600" style="display: none; width: 800px; height: 600px;"></canvas>\n'),
                        this.html(s.join("")),
                        _fn039() && window.File && window.FileReader ? (_fn036(800, 600), qrcode.callback = _fn038, document.getElementById("mainbody").style.display = "inline", _fn040()) : (document.getElementById("mainbody").style.display = "inline", document.getElementById("mainbody").innerHTML = '<p id="mp1">QR code scanner for HTML5 capable browsers</p><br><br><p id="mp2">sorry your browser is not supported</p><br><br><p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png" /></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif" /></a> or <a href="http://www.opera.com"><img src="Opera-logo.png" /></a></p>')
                    },
                    position: [30, 25],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        "btnAceptar" === s && _fn033(t),
                        $("#divRutas").show(),
                        $("#divPedido").hide()
                    }
                }),
                $(".b-close").click(function () {
                    s = this.id
                })
            }

            /// updateOrder (orderId, way, order)
            ///
            function _fn032(t, e, s) {
                var a = "/api/orders/" + t;
                if (_ob001("GET", a, null), !_ob000.Result) return $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;factura No existente";
                        t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                }), _ob000.Result;
                var n = JSON.parse(_ob000.Data);
                return n.Status = tdWOrd.Ruta.Ways[e].Orders[s].Status, "A" == n.Status && (n.WorkOrderId = tdWOrd.Id), "O" == n.Status && (n.WorkOrderId = ""), a = "/api/orders/" + n.Id, _ob001("PUT", a, n), _ob000.Result || $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;factura " + n.Id + "NO procesada";
                        t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                }), _ob000.Result
            }

            /// InvoiceDeliveryProcess (pedidoClave)
            ///
            function _fn033(t) {
                var e = (_fn992().split("¦"), t.split("¦")[0]),
                s = t.split("¦")[1],
                a = t.split("¦")[2];
                t.split("¦")[3];
                tdWOrd.Ruta.Ways[e].Orders[s].Status = "C",
                tdWOrd.Ruta.Ways[e].Orders[s].DeliveryDate = new Date;
                var n = document.getElementById("photoInvoice"),
                r = 50,
                i = "jpg",
                o = jic.compress(n, r, i).src;
                if (tdWOrd.Ruta.Ways[e].Orders[s].DocumentImage = o, _fn032(a, e, s)) {
                    var p = '<span style="color: #CC3300">' + _dictionary.w044 + "</span>";
                    $("#sta" + a).html(p),
                    _fn046(),
                    lat = void 0 == lat ? _ob003.lat : lat,
                    lng = void 0 == lng ? _ob003.lng : lng,
                    tdWOrd.Ruta.GPSGeolocalization = new google.maps.LatLng(lat, lng).toString().replace("(", "").replace(")", ""),
                    _fn034()
                }
            }

            /// updateWorkOrder
            ///
            function _fn034() {
                var t = "/api/workorders/" + tdWOrd.Id;
                return _ob001("PUT", t, tdWOrd), _ob000.Result ? void (_ob000 = {}) : void $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order de trabajo No existente";
                        t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                })
            }

            /// handleFiles (file)
            ///
            function _fn035(t) {
                for (var e = 0; e < t.length; e++) {
                    var s = new FileReader;
                    s.onload = function (t) {
                        return function (t) {
                            document.getElementById("photoInvoice").setAttribute("src", t.target.result);
                            var e = document.getElementById("photoInvoice").getAttribute("src");
                            document.getElementById("photoInvoice").setAttribute("src", e), document.getElementById("photoInvoice").style.display = "inline", gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height), qrcode.decode(t.target.result)
                        }
                    }(t[e]), s.readAsDataURL(t[e])
                }
            }

            /// initCanvas (width, height)
            ///
            function _fn036(t, e) {
                gCanvas = document.getElementById("qr-canvas"), gCanvas.style.width = t + "px", gCanvas.style.height = e + "px", gCanvas.width = t, gCanvas.height = e, gCtx = gCanvas.getContext("2d"), gCtx.clearRect(0, 0, t, e)
            }

            /// htmlEntities (string)
            ///
            function _fn037(t) {
                return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            }

            /// read (image)
            ///
            function _fn038(t) {
                var e = _fn037(t);
                if (e.indexOf("BEGIN:VCARD") > -1) {
                    var s = e.replace("BEGIN:VCARD", "").replace("\r", "").replace("\n", "");
                    s.indexOf("VERSION") > -1 && (s = s.replace("VERSION:2.1", "").replace("\r", "").replace("\n", "")), s.indexOf("TITLE") > -1 ? dataFact = s.replace("N:", "").replace("\r", "").replace("TEL;HOME;VOICE:", "").replace("EMAIL:", "").replace("\r", "").replace("TITLE:", "").replace("\r", "").replace("ADR:", "").replace("\r", "").replace("URL:", "").replace("\r", "").replace("https://td.dyndns.info:8443/invoices/?data=", "").replace("END:VCARD", "").replace("\r", "").split("\n") : dataFact = s.replace("N:", "").replace("\r", "").replace("TEL;HOME;VOICE:", "").replace("EMAIL:", "").replace("\r", "").replace("ORG:", "").replace("\r", "").replace("ADR:", "").replace("\r", "").replace("URL:", "").replace("\r", "").replace("https://td.dyndns.info:8443/invoices/?data=", "").replace("END:VCARD", "").replace("\r", "").split("\n");
                    var a = document.getElementById("photoInvoice").getAttribute("src"),
                    n = document.getElementById("mp1").innerText;
                    void 0 === dataFact[5] || -1 == n.indexOf(dataFact[5]) ? (void 0 != dataFact[5] && (dataFact[0] = " factura incorrecta!!!"), document.getElementById("result").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: red;'><b>" + dataFact[0] + "</b></span>", dataFact = []) : (dataFact[6] = a, document.getElementById("result").innerHTML = "<span style='font-size: 10px;'>" + _dictionary.w063 + ": <b>" + dataFact[5] + "</b><br />Nombre: <b>" + dataFact[0] + "</b><br />Telefono: <b>" + dataFact[1] + "</b><br />Email: <b>" + dataFact[2] + "</b><br />Cliente: <b>" + dataFact[3] + "</b><br />Dirección: <b>" + dataFact[4] + "</b></span>", $("#btnAceptar").prop("disabled", !1))
                } else if (e.indexOf("/invoices/Collection/?data=") > -1) {
                    var r = "black";
                    dataFact[0] = e.substring(e.indexOf("/invoices/Collection/?data=") + 27, e.length).replace(" ", ""), 0 == dataFact[0].length && (r = "red", dataFact[0] = _dictionary.w208), "black" == r && ($("#btnAceptar").prop("disabled", !1), $("#btnAceptar").attr("data-remesa", dataFact[0])), dataFact[0] = "<span style='font-size: 10px; color: " + r + ";'>" + _dictionary.w065 + ": <b>" + dataFact[0] + "</b></span>", document.getElementById("result").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<span><b>" + dataFact[0] + "</b></span>", dataFact = []
                } else dataFact[0] = "<span style='font-size: 10px; color: red;'> " + _dictionary.w208 + "</b></span>", document.getElementById("result").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<span><b>" + dataFact[0] + "</b></span>"
            }

            /// isCanvasSupported
            ///
            function _fn039() {
                var t = document.createElement("canvas");
                return !(!t.getContext || !t.getContext("2d"))
            }

            /// functions setimg
            ///
            function _fn040() {
                document.getElementById("result").innerHTML = "", 2 != stype && (stype = 2)
            }

            /// GetStoragePedido (pedidoClave)
            /// - DURA MUCHO AL CARGAR FOTO (consultas)
            function _fn041(t) {
                var e = _fn992().split("¦"),
                s = void 0,                 // legs consecutivo from pedidoClave - t.split("¦")[0]
                a = void 0,                 // orderWO consecutivo from pedidoClave - t.split("¦")[1]
                n = void 0,                 // orderWO Id from pedidoClave - t.split("¦")[2]
                r = void 0,
                i = void 0,                 // CompanyName
                o = void 0,                 // NameDisplay
                p = void 0,                 // legs consecutivo + 1 from pedidoClave (formato 00) - t.split("¦")[3]
                d = "rutLista" == $("#container").attr("data-sbcontent") ? !0 : !1;
                d ? (s = t.split("¦")[0], a = t.split("¦")[1], n = t.split("¦")[2], p = t.split("¦")[3]) : n = t;
                _dictionary.w138;
                pedidoClaveActual = t;
                var l = [];
                d && l.push('<span class="buttonX b-close" style="margin-top: 10px; margin-right: 3%;" onclick="javascript: $(\'#divRutas\').show(); $(\'#divPedido\').hide();"><span><img src="./Images/btnClose.png" /></span></span>'),
                $(window).width() < 994 && !d && (
                l.push('<span class="buttonX b-close" style="margin-top: 10px; margin-right: 3%;" onclick="javascript: $(\'#facturas\').show(); $(\'#factura\').hide();"><span><img src="./Images/btnClose.png" /></span></span>'),
                $("#factura").show(),
                $("#facturas").hide()
                ),
                l.push('<p class="c14 c8"><span></span></p>'),
                l.push('<p class="c14 c8"><span></span></p>');
                var u = void 0;
                if (d) u = tdWOrd.Ruta.Ways[s].Orders[a];
                else {
                    var c, h = void 0;
                    for (c = 0, len = _sbList.length; c < len; c++)
                        if (_sbList[c].Id == t) {
                            u = _sbList[c], "" != u.WorkOrderId && (h = parseInt(u.WorkOrderId));
                            break
                        }
                    if (void 0 != h) {
                        var g = "",
                        b = "/api/workorders/" + h;
                        if (_ob001("GET", b, g), _ob000.Result) {
                            var m = JSON.parse(_ob000.Data);
                            if ($.each(m.Ruta.Ways, function (e, s) {
                            $.each(s.Orders, function (e, s) {
                            return s.Id == t ? void (r = s) : void 0
                            }),
                            void 0 != r
                            }),
                            g = "",
                            b = "/api/companies/" + m.DeliveryCompanyId,
                            _ob001("GET", b, g),
                            _ob000.Result) {
                                var f = JSON.parse(_ob000.Data);
                                i = f.CompanyName
                            }
                            if ("" != m.DeliverymanId && (g = "", b = "/api/accounts/" + m.DeliverymanId, _ob001("GET", b, g), _ob000.Result)) {
                                var v = JSON.parse(_ob000.Data);
                                o = v.NameDisplay
                            }
                        }
                    }
                }
                if (l.push('<span style="margin-left: 3%">'),
                    l.push('<table class="ListadoTr" style="width: 100%;" data-idPedido="' + u.Id + '">'),
                    l.push('<tr><td style="width: 70%;"><span style="font-size: 9pt;">' + _dictionary.w063 + ':</span> <i><b>' + u.Id + "</b></i><br /><i><b>" + u.CustomerName + '</b></i><br /><i><b><span style="font-size: 8pt;">' + u.Address + "</span></b></i></span></td>"),
                    l.push('<td style="width: 30%;"><span style="margin-right: 3%"><i><b>' + getFormattedDate(u.OrderDate) + '</b></i></span><br /><span style="margin-left: 3%"><span style="font-size: 9pt;">' + _dictionary.w046 + ":</span> <i><b>" + u.CustomerId + "</b></i></span></td></tr></table></span>"),
                    l.push('<p class="c14 c8"><span></span></p>'),
                    l.push('<span style="margin-left: 3%"><table style="width: 100%; border-collapse: separate;">'),
                    l.push('<thead><tr style="color: #2B91AF; font-size: 9pt;"><th>' + _dictionary.w049 + "&nbsp;</th><th>" + _dictionary.w019 + "&nbsp;</th><th>" + _dictionary.w047 + "&nbsp;</th><th>" + _dictionary.w022 + "&nbsp;</th><th>" + _dictionary.w023 + "&nbsp;</th><th> &nbsp; </th></thead></tr></thead>"),
                    $.each(u.OrderDetails, function (t, e) {
                        l.push('<tr class="pedDet">'),
                        l.push('<td style="width: 8%;">' + e.LineId + "</td>"),
                        l.push('<td style="width: 12%;">' + e.IdArticle + "</td>"),
                        l.push('<td style="width: 34%;">' + e.Description + "</td>"),
                        l.push('<td style="width: 12%;">' + e.Quantity.Requested + "</td>"),
                        l.push('<td style="width: 17%;"> &nbsp; </td>')
                }),
                    l.push("</table></span>"),
                    l.push('<p class="c14 c8"><span></span></p>'),
                    l.push('<hr style="margin-top: 10px; margin-bottom: 10px; border-top-color: grey;" />'),
                    void 0 != r && (l.push('<span style="margin-left: 3%"><div style="width: 50%; float:left;"><table style="width: 100%; border-collapse: separate;"><tbody>'),
                    l.push('<tr><td colspan="2"> Transportista: </td></tr>'),
                    l.push('<tr><td colspan="2"><i><b> &nbsp;' + i + "</b></i></td></tr>"),
                    void 0 == o ? l.push('<tr><td colspan="2"> &nbsp; </td></tr>') : l.push('<tr><td colspan="2"><i><b> &nbsp;' + o + "</b></i></td></tr>"),
                    l.push('<tr><td colspan="2"> &nbsp; </td></tr>'),
                    "" != r.DocumentImage && null != r.DocumentImage ? l.push('<tr><td style="width: 5px;"> Fecha de entrega: </td><td style="width: 10px;"><b><i>' + getFormattedDate(r.DeliveryDate) + "</i></b></td></tr>") : l.push('<tr><td colspan="2"> &nbsp; </td></tr>'),
                    l.push("</tbody></table>"),
                    l.push('</div><div style="width: 50%; float:right;">'),
                    "" != r.DocumentImage && null != r.DocumentImage && l.push('<img width="220" height="340" alt="" src="' + r.DocumentImage + '">'), l.push("</div>")), d) {
                    var y = document.getElementById("divBegin" + p), _ = y.getElementsByTagName("input");
                    "D" == e[2] && 0 == _.length && "A" == u.Status && (l.push('<div style="float:right; margin-right: 50%;"><p align="center">'), l.push('<input id="confirmPed" class="btn btn-info" type="button" value="' + _dictionary.w148 + '" onclick="javascript: _fn031(\' ' + t + "')\" />"), l.push("</p></div>"))
                }
                l.push('<script type="text/javascript">\n'),
            l.push('$(".QuantityItem").change( function() {\n'),
            l.push("importe_total = 0;\n"),
            l.push('$(".QuantityItem").each(\n'),
            l.push("function (index, value) {"),
            l.push("valor = (eval($(this).val()) == undefined) ? 0 : eval($(this).val());\n"),
            l.push("importe_total = importe_total + valor;\n"),
            l.push("});\n"),
            l.push("});\n"),
            l.push("&lt;/script>"),
            tdPed = l,
            d ? $("#pedido").html(tdPed.join("")) : ($("#factura").html(tdPed.join("")),$(window).width() > 993 && $("#factura").css({ position: "fixed", left: 661, top: 75})),
            $("table tr.pedDet:nth-child(even)").addClass("alternativo"),
            d && ($("#divRutas").hide(), $("#divPedido").show())
            }

            /// setRutas (rutas)
            /// -
            function _fn042(t) {
                var e = 0,                          // tDist
                s = 0,                              // tDuraH
                a = 0,                              // tDuraM
                n = [];                             // html
                n.push('<p class="c14 c8"><span class="wrTitle"></span></p>'),
                $.each(t.legs, function (r, i) {
                    var o = r + 1;                  // routeSegment
                    n.push('<p class="c14"><div id="tit' + _fn069(o, 2) + '" class="c6">'),
                    n.push('<span style="color: #e84c3d; font-size: 8pt;"><b>' + _dictionary.w140 + " &nbsp;" + _fn069(o, 2) + "</b></span>"),
                    n.push('<div id="divBegin' + _fn069(o, 2) + '" class="inicioRuta" style="float:right; margin-right: 3%;">&nbsp;'),
                    n.push('<input id="Begin' + _fn069(o, 2) + '" class="btn btn-info" type="button" value="' + _dictionary.w038 + '" onclick="_fn023(this);" /></div><br/>' ),
                    n.push('<span style="font-size: 10pt;"><b>' + _dictionary.w040 + "</b></span> "),
                    n.push("<i>" + i.start_address + '</i>; <span style="font-size: 10pt;"><b>' + _dictionary.w041 + "</b></span> "),
                    n.push("<i>" + i.end_address + "</i><br />"),
                    n.push("<b>" + i.distance.text + "</b> - <b>" + i.duration.text + "</b><br /><br />"),
                    n.push("</div></p>");
                    var p = t.legs[r].duration.text.search("h"),                    // posision de la h
                        d = t.legs[r].duration.text.substring(0, p),                // hora
                        l = t.legs[r].duration.text.substring(p + 1);               // minuto
                    s += "" == d ? 0 : parseInt(d / 100),
                    a += "" == l ? 0 : parseInt(l),
                    e += parseFloat(t.legs[r].distance.text.replace(",", ".")),
                    n.push('<a href="#" name="0"></a>'),
                    n.push('<div class="c13" id="det' + _fn069(o, 2) + '">'),
                    n.push('<table cellpadding="0" cellspacing="0" class="c7" border="0">'),
                    n.push('<thead style="visibility: hidden;"><tr style="color: #2B91AF; font-size: 8pt;"><th style="width: 80%;"> Nombre </th><th style="width: 10%;"> ' + _dictionary.w063 + ' </th><th style="width: 10%;"> Estado </th></tr></thead>'),
                    n.push("<tbody>");
                    var u = r == t.legs.length - 1 ? r : t.waypoint_order[r];
                    if ($.each(tdWOrd.Ruta.Ways[u].Orders, function (t, e) {
                    var s = "A" == e.Status ? '<span style="color: #66CC66">' + _dictionary.w045 + "</span>" : '<span style="color: #CC3300">' + _dictionary.w044 + "</span>";
                    n.push('<tr><td class="c5" colspan="1" rowspan="1" style="width: 80%;">'),
                            n.push('<p class="c14"><span class="c4" style="font-size: 10pt;">' + e.CustomerName + '</span> <br /><i><b><span style="font-size: 7pt;">' + e.Address + "</span></b></i> </p>"),
                            n.push("</td>"),
                        n.push('<td class="c5" colspan="1" rowspan="1" style="width: 10%;">'),
                            n.push('<p class="c14">'),
                                n.push('<span id="' + e.Id + '" class="c1" style="font-size: 10pt;" onClick="_fn041(\'' + u + " ¦" + t + "¦" + e.Id + "¦" + _fn069(o, 2) + "')\">"),
                                    n.push('<a "class=" c3" href="#">' + e.Id + "</a>"),
                                    n.push("</span></p></td>"),
                        n.push('<td class="c5" colspan="1" rowspan="1" style="width: 10%;">'),
                            n.push('<p class="c14"><span id="sta' + e.Id + '" class="c4" style="font-size: 10pt;">' + s + "</span></p>"),
                            n.push("</td></tr>")
                    }),
                    n.push("</tbody>"),
                n.push("</table>"),
                n.push("</div>"),
                a > 60) {
                        var p = parseInt((a / 60).toFixed(0));
                        s += p, a -= 60 * p
                    }
                    n.push('<p class="c14 c8"><span></span></p>')
                }),
                n.push('<p class="c14 c8"><span class="wrEnd"></span></p>'),
                n.push("ks: <b>" + e.toFixed(1) + "</b> - hs: <b>" + s + ":" + a.toFixed(0) + '</b><div id="divEnd_" style="float:right; margin-right: 3%;"><input id="End_" type="button" value="' + _dictionary.w039 + '" class="btn btn-info" onclick="_fn023(this);" disabled="disabled"/></div><br/><br/>\n' ),
                n.push('<script type="text/javascript">\n'), n.push("var rutaActual;\n"),
                n.push('$(".c6").' + ($(window).width() < 994 ? "click(" : "mouseenter(\n")),
                n.push("function () {\n"), n.push('$(".c6").css("background-color", "#fff");\n'),
                n.push('$(".c13").css("display", "none");\n'),
                n.push('$("#" + this.id.replace("tit", "det")).css("display", "block");\n'),
                n.push('$("#" + this.id).css("background-color", "rgba(0, 0, 0, 0.05)");\n'),
                n.push('$("#" + this.id).css("cursor", "hand");\n'),
                n.push("rutaActual = this.id;\n"),
                n.push("_fn014();\n"),
                n.push("});\n"),
                n.push("$(document).ready(function () {\n"),
                n.push("$(function() {\n"),
                n.push('$.getJSON("https://api.ipify.org?format=jsonp&callback=?",\n'),
                n.push("function(json) {\n"),
                n.push("conventionIp = json.ip;\n"),
                n.push("logFile = true;\n"),
                n.push("navigator.geolocation.getCurrentPosition(_fn018, _fn020);\n"),
                n.push("});\n"),
                n.push("});\n"),
                n.push("});\n"),
                n.push("&lt;/script>\n"),
                $("#rutas").html(n.join("")),
                $(window).width() < 994 && ($("#mapa").hide(), $("#rutas").show())
            }

            /// GetOrdenTrabajo
            /// - captura orden de trabajo
            function _fn043() {
                var t = _fn992().split("¦"),
                e = "";
                waypts = [], tdWOrd = void 0;
                var s = "",
                a = "/api/workorders/" + e + "/" + t[0];
                if (_ob001("GET", a, s), _ob000.Result && (tdWOrd = JSON.parse(_ob000.Data), "C" == tdWOrd.Status && (waypts = [], tdWOrd = void 0, _ob000.Result = !1)), !_ob000.Result) return void $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order de trabajo No existente";
                        t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                });
                _ob000 = {};
                var n = tdWOrd.Ruta.Waypoints.length - 1;
                return _addressDest = tdWOrd.Ruta.Waypoints[n].Geolocalization, $.each(tdWOrd.Ruta.Waypoints, function (t, e) {
                    n > t && waypts.push({
                        location: new google.maps.LatLng(e.Geolocalization.split(",")[0], e.Geolocalization.split(",")[1]),
                        stopover: !0
                    })
                }), waypts.length === permitidos ? void (waypts = []) : void 0
            }

            /// setRutListaS
            ///
            function _fn044() {
                if ($("#container").attr("data-sbcontent", ""), $("#container").html(""), void 0 != tdWOrd) {
                    var t = [];
                    t.push('<div id="divRutas" class="row">'), t.push('<div id="rutas" class="col-md-6"><button class="btn btn-lg btn-info"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button></div>'), t.push('<div id="mapa" class="col-md-6"><div id="mapCanvas" class="mapCanvas"></div>');
                    var e = 6;
                    $(window).width() < 994 && (t.push('<span class="buttonX b-close" style="margin-top: 10px; margin-right: ' + e + '%;" onclick="javascript: $(\'#rutas\').show(); $(\'#mapa\').hide();"><span><img src="./Images/btnClose.png" /></span></span>'), e += 5), t.push('<span class="buttonX b-close" style="margin-top: 10px; margin-right: ' + e + '%;" onclick="javascript: _fn024();"><span><img id="gpsImg" src="./Images/btnGPS-slash.png" /></span></span>'), t.push('</div></div><div id="divPedido" class="row"><div id="pedido" class="col-md-6"></div></div>'), $("#container").html(t.join("")), $("#divPedido").hide(), geocoder = new google.maps.Geocoder, _fn046(), lat = void 0 == lat ? _ob003.lat : lat, lng = void 0 == lng ? _ob003.lng : lng;
                    var s = _fn992().split("¦");
                    if (logFile) {
                        var a = lat + ", " + lng,
                        n = s[0] + "  IP " + conventionIp + "  latlng " + a;
                        logFile = !1;
                        try {
                            $.ajax({
                                type: "POST",
                                cache: !1,
                                async: "false",
                                url: "/Home/SaveLogFile",
                                data: JSON.stringify({
                                    mensaje: n
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                processData: !1,
                                success: function (t, e, s) {
                                    _ob000 = t
                                },
                                error: function (t, e, s) { }
                            })
                        } catch (r) {
                            console.log(r.message)
                        }
                    } else latlng = new google.maps.LatLng(lat, lng), flagDemo ? (lat = _ob003.lat, lng = _ob003.lng, latlng = new google.maps.LatLng(lat, lng), _addressOrig = _ob003.adr) : geocoder.geocode({
                        latLng: latlng
                    }, function (t, e) {
                        e === google.maps.GeocoderStatus.OK ? t[0] ? _addressOrig = t[0].formatted_address : $("#mapCanvas").append("<br />  " + _dictionary.w193) : $("#mapCanvas").append("<br />  " + _dictionary.w194 + ": " + e)
                    });
                    query = {
                        origin: _addressOrig,
                        destination: _addressDest,
                        waypoints: waypts,
                        optimizeWaypoints: !0,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, dirService = new google.maps.DirectionsService, dirRenderer = new google.maps.DirectionsRenderer({
                        preserveViewport: !0
                    });
                    var i = [{
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }],
                    o = {
                        center: new google.maps.LatLng(lat, lng),
                        zoom: 12,
                        streetViewControl: !1,
                        panControl: !1,
                        mapTypeControl: !1,
                        scrollwheel: !0,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: i
                    };
                    map = new google.maps.Map(document.getElementById("mapCanvas"), o);
                    var p = {
                        map: map
                    };
                    dirRenderer = new google.maps.DirectionsRenderer(p), dirRenderer.setMap(map), stepDisplay = new google.maps.InfoWindow, google.maps.event.addListener(map, "idle", function () {
                        panning && (map.fitBounds(bounds), panning = !1)
                    }), dirService.route(query, function (t, e) {
                        "OK" == e && (route = t.routes[0], _fn042(route))
                    })
                }
            }

            /// getRemesaS
            ///
            function _fn045() {
                $("#container").attr("data-sbcontent", ""), $("#container").html("");
                var e = [];

                //var t = "<b> Captura de Remesa </b>"
                //e.push('<div id="header"><p id="mp1" style="font-size: 20px;">' + t + "</p></div>\n"),
                //e.push('<div id="mainbody" style="display: inline;"><table border="0"><tbody>\n'),
                //e.push('<tr><td valign="top">\n'),
                //e.push('<div style="font-size: 14px;"><input type="file" accept="image/*;capture=camera" class="filestyle" onchange="javascript: _fn035(this.files);" /></div><br />\n'),
                //e.push("</td></tr>\n"),
                //e.push('<tr><td><div id="result" width="240px" align="left">- scanning -</div><br /></td></tr>\n'),
                //e.push("<tr><td>\n"),
                //e.push('<input id="btnAceptar" class="btn btn-info b-close" type="button" value="aceptar foto" data-remesa="" disabled="disabled" />\n'),
                //e.push("<br /></td></tr>\n"),
                //e.push("<tr><td><br />\n"),
                //e.push('<div><img id="photoInvoice" src="#" alt="your invoice" style="display: none; width: 240px; height: 320px;" /></div>\n'),
                //e.push('<div style="display: none;"><canvas id="out-canvas" width="320" height="240"></canvas></div>\n'),
                //e.push("</td></tr>\n"),
                //e.push("</tbody></table></div>\n"),
                //e.push('<canvas id="qr-canvas" width="800" height="600" style="display: none; width: 800px; height: 600px;"></canvas>\n'),
                //e.push('<script type="text/javascript">\n'),
                //e.push('$("#btnAceptar").click( function() {\n'),
                //e.push('var url = "/Invoices/Collection2";\n'),
                //e.push('var datos = "";\n'),
                //e.push('var parametros = "/?data=" + $("#btnAceptar").attr("data-remesa");\n'),
                //e.push('_ob001("GET", parametros, datos, url);\n'),
                //e.push('var _str = document.getElementById("result").innerHTML;\n'),
                //e.push('document.getElementById("result").innerHTML = _str + " - " + _ob000.Message;\n'),
                //e.push("});\n"),
                //e.push("&lt;/script>");

                //var s = "/?_screenType=getRemesaS&_language=" + _userLang + "&_roll=&_user=";
                var s = "/?_screenType=getRemesaS&_language=" + _userLang + "&_roll=";
                _ob001("GET", s, "", "/Home/GetScreenTemplete"),
                e.push(_ob000.Data);

                $("#container").html(e.join("")),
                $("#container").attr("data-sbcontent", "remesa"),
                _fn039() && window.File && window.FileReader ? (_fn036(800, 600), qrcode.callback = _fn038, document.getElementById("mainbody").style.display = "inline", _fn040()) : (document.getElementById("mainbody").style.display = "inline", document.getElementById("mainbody").innerHTML = '<p id="mp1">QR code scanner for HTML5 capable browsers</p><br><br><p id="mp2">sorry your browser is not supported</p><br><br><p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png" /></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif" /></a> or <a href="http://www.opera.com"><img src="Opera-logo.png" /></a></p>')
            }

            /// getGeolocation
            ///
            function _fn046() {
                lat = void 0,
                lng = void 0,
                navigator.geolocation.getCurrentPosition(_fn047)
            }

            /// getGeoPosition (position)
            ///
            function _fn047(t) {
                lat = t.coords.latitude,
                lng = t.coords.longitude
            }

            /// setWOListaS
            ///
            function _fn048(t) {
                $("#container").attr("data-sbcontent", ""),
                $("#container").html(""),

                $("#container").html("Lista de Ordenes de Trabajo, no activada.")
            }

            /// setOverseeListaS
            ///
            function _fn049() {
                $("#container").attr("data-sbcontent", ""),
                $("#container").html(""),

                $("#container").html("Lista de Supervisores, no activada.")
            }

            /// setCompanyListaS
            ///
            function _fn050() {
                $("#container").attr("data-sbcontent", ""),
                $("#container").html(""),

                $("#container").html("Lista de Empresas, no activada.")
            }

            /// setDeliveryMenListaS
            ///
            function _fn051() {
                $("#container").attr("data-sbcontent", ""),
                $("#container").html(""),

                $("#container").html("Lista de transportistas, no activada.")
            }

            /// preSelectFact (id)
            /// -  preselección de facturas
            function _fn052(t) {
                for (var e, s = 0, a = _sbList.length; a > s; s++) {
                    if ("O" == _sbList[s].Status) {
                        var n = $("#tit" + _sbList[s].Id),
                        r = -1 == n.attr("style").search("display") ? !0 : -1 == n.attr("style").search("none") ? !0 : !1;
                        r && (markerArray[s].setMap(null), markerArray[s].setIcon("./Images/_red5.png"), markerArray[s].setMap(map))
                    }
                    _sbList[s].Id == t && (e = s)
                }
                void 0 != e && "O" == _sbList[e].Status && (markerArray[e].setMap(null), markerArray[e].setIcon("./Images/_yellow5.png"), markerArray[e].setMap(map))
            }

            /// selectAllFact
            /// - selección de todas facturas
            function _fn053() {
                for (var t = document.getElementById("divFacturas"), e = t.getElementsByClassName("pedidoChe"), s = !0, a = 0; a < e.length; a++) {
                    var n = e[a].getAttribute("id").substring(3);
                    "000" != n ? "none" != document.getElementById("tit" + n).style.display && (s ? (_fn054(n), $("#che" + n).prop("checked", !0), $("#che" + n).attr("checked", "checked")) : (_fn055(n), $("#che" + n).removeProp("checked"), $("#che" + n).removeAttr("checked"))) : void 0 == $("#che000").attr("checked") ? ($("#che000").prop("checked", !0), $("#che000").attr("checked", "checked"), s = !0) : ($("#che000").removeProp("checked"), $("#che000").removeAttr("checked"), s = !1)
                }
                $("#filterControlgroup-input").val().length > 0 && _fn056()
            }

            /// selectFact (id)
            /// - seleccion de facturas
            function _fn054(t) {
                $("#tit" + t).css("color", "blue"), $("#tit" + t).attr("data-selected", "1"), $("#tit" + t).attr("class", "c6 facSelected");
                var e = document.getElementById("tit" + t),
                s = e.getElementsByTagName("td");
                for (a = 0; a < s.length; a++) s[a].style.color = "blue";
                var a;
                for (a = 0, len = _sbList.length; a < len; a++)
                    if (_sbList[a].Id == t) {
                        _sbList[a].Status = "B";
                        var n = document.getElementById("sta" + t);
                        n.style.color = "#CC3300", n.innerHTML = _dictionary.w071;
                        break
                    }
                markerArray[a].setMap(null), markerArray[a].setIcon("./Images/_blue5.png"), markerArray[a].setMap(map), $.grep(_sbList, function (t) {
                    return "B" == t.Status
                }).length > 0 && $("#remesa").prop("disabled", !1)
            }

            /// deselectFact
            /// - separar facturas de la selección previa
            function _fn055(t) {
                $("#tit" + t).css("color", "#616161"), $("#tit" + t).removeAttr("data-selected"), $("#tit" + t).attr("class", "c6");
                var e = document.getElementById("tit" + t),
                s = e.getElementsByTagName("td");
                for (a = 0; a < s.length; a++) s[a].style.color = "#616161";
                var a;
                for (a = 0, len = _sbList.length; a < len; a++)
                    if (_sbList[a].Id == t) {
                        _sbList[a].Status = "O";
                        var n = document.getElementById("sta" + t);
                        n.style.color = "#66CC66", n.innerHTML = _dictionary.w072;
                        break
                    }
                markerArray[a].setMap(null), markerArray[a].setIcon("./Images/_red5.png"), markerArray[a].setMap(map), 0 == $.grep(_sbList, function (t) {
                    return "B" == t.Status
                }).length && $("#remesa").prop("disabled", !0)
            }

            /// filterGiftAiders
            /// - filtrado de giftaiders
  //          function _fn056() {
  //              console.log("filter-paso01");
  //              var t = $("#filterControlgroup-input").val().toLowerCase().split("|"),
  //              e = document.getElementById("giftaiders"),
  //              s = e.getElementsByTagName("div");
  //              for (i = 0; i < s.length; i++) {
  //                  if ("tit" == s[i].id.substring(0, 3)) {
  //                      s[i].style.display = "none", document.getElementById(s[i].id.replace("tit", "det")).style.display = "none";
  //                      var a, n = s[i].id.substring(3);
  //                      for (a = 0, len = _sbList.length; a < len && _sbList[a].Id != n; a++);
  //                      //facProcess && markerArray[a].setMap(null);
  //                      var r = s[i].getElementsByTagName("td"),
  //                      o = "";
  //                      for (j = 0; j < r.length; j++) "" != o && (o += "¦"), o += r[j].innerText.toLowerCase();
  //                      for (var p = !1, d = 0; d < t.length; d++) p = o.indexOf(t[d]) > -1 && 0 == d ? !0 : o.indexOf(t[d]) > -1 && p ? !0 : !1;
  //                      p && (s[i].style.display = "block")  /*, facProcess && markerArray[a].setMap(map))*/
  //                  }
  //                  console.log("filter-paso02-"+i);
  //              }
  //          }

            /// createRemesaReport (WorkOrderId)
            /// - creación del reporte de remesa
            function _fn057(t) {
                var ilg1;
                _ob001("GET", "", "", "/Home/GetLogo/?x=1"), ilg1 = JSON.parse(_ob000.Data).imglogo, _ob000 = {}

                var e = "",
                s = "/api/workorders/" + t;
                if (_ob001("GET", s, e), !_ob000.Result) return void $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _dictionary.w204;
                        t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                });
                var a = JSON.parse(_ob000.Data);
                _ob000 = {};
                var e = "",
                s = "/api/companies/" + a.DeliveryCompanyId;
                if (_ob001("GET", s, e), !_ob000.Result) return void $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _dictionary.w192;
                        t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                });
                var n = JSON.parse(_ob000.Data);
                _ob000 = {};
                var r = window.location.origin + "/invoices/Collection/?data=" + a.Id,
                i = new jsPDF;
                //i.addImage(_ob003.ilg1, "JPEG", 10, 5, 45, 15), i.setFontSize(22), i.text(70, 20, _dictionary.w160), i.setFontSize(14), i.text(158, 20, "Nº " + a.Id), i.setFontSize(12), i.text(167, 25, getFormattedDate(a.WorkOrderDate)), i.setLineWidth(.1), i.line(20, 28, 190, 28);
                i.addImage(ilg1, "JPEG", 10, 5, 45, 15), i.setFontSize(22), i.text(70, 20, _dictionary.w160), i.setFontSize(14), i.text(158, 20, "Nº " + a.Id), i.setFontSize(12), i.text(167, 25, getFormattedDate(a.WorkOrderDate)), i.setLineWidth(.1), i.line(20, 28, 190, 28);
                var o = 0,
                p = 0;
                $.each(a.Ruta.Ways, function (t, e) {
                    $.each(e.Orders, function (t, s) {
                        i.setLineWidth(.1), i.line(20, 30 + 23 * o, 190, 30 + 23 * o), i.setFontSize(11), i.text(20, 35 + 23 * o, "Nº: " + s.Id), i.text(170, 35 + 23 * o, getFormattedDate(s.OrderDate)), i.text(20, 40 + 23 * o, s.CustomerName), i.text(168, 40 + 23 * o, "Id.: " + s.CustomerId);
                        var n = s.Address + ", " + s.City + ", " + s.Zip + ", " + s.Region;
                        i.setFontSize(9), n.length < 95 ? i.text(20, 45 + 23 * o, s.Address) : (i.text(20, 45 + 23 * o, s.Address.substring(0, 94)), i.text(20, 50 + 23 * o, s.Address.substring(94))), o++, (o > 10 || o > 9 && (e.Orders.length < 11 || 20 == e.Orders.length)) && (i.addPage(), i.addImage(c, "JPEG", 10, 5, 45, 15), i.setFontSize(22), i.text(70, 20, _dictionary.w160), i.setFontSize(14), i.text(158, 20, "Nº " + a.Id), i.setFontSize(12), i.text(165, 25, getFormattedDate(a.WorkOrderDate)), i.setLineWidth(.1), i.line(20, 28, 190, 28), o = 0), p++
                    })
                });
                var d = document.createElement("div");
                d.setAttribute("id", "qrcode"), d.style.display = "none", document.getElementsByTagName("body")[0].appendChild(d);
                var l = new QRCode("qrcode");
                l.makeCode(r);
                var u = d.getElementsByTagName("canvas"), c = u[0].toDataURL("image/png");
                i.addImage(c, "PNG", 150, 250, 40, 40), i.rect(20, 249, 171, 42), i.setFontSize(12), i.setTextColor(136, 136, 136), i.text(21, 255, _dictionary.w162), i.setTextColor(0, 0, 0), i.text(58, 255, n.CompanyName.substring(0, 44)), i.setTextColor(136, 136, 136), i.text(21, 260, _dictionary.w163), i.setTextColor(0, 0, 0), i.text(57, 260, " " + p), i.line(50, 285, 120, 285), i.setFontSize(8), i.text(80, 288, _dictionary.w073), d.outerHTML = "",
                //              delete d,
                i.output("dataurlnewwindow")
            }

            /// createWays
            /// - crear trayectos (leggs)
            function _fn058() {
                var t = $.grep(_sbList, function (t) {
                    return "B" == t.Status
                });
                waypts = [];
                var e, s = {
                    StartAddresse: "",
                    EndAddresse: "",
                    GPSGeolocalization: "",
                    Waypoints: [],
                    Ways: []
                };
                return $.each(t, function (t, a) {
                    var n = a.Address + ", " + a.City + ", " + a.Zip + ", " + a.Region,
                    r = {
                        Id: a.Id,
                        InternId: a.InternId,
                        OrderDate: a.OrderDate,
                        CustomerId: a.CustomerId,
                        CustomerName: a.CustomerName,
                        Address: n,
                        Geolocalization: a.Geolocalization,
                        Status: "A",
                        OrderDetails: a.OrderDetails,
                        DeliveryDate: a.DeliveryDate,
                        CodeCaptcha: a.CodeCaptcha,
                        DocumentImage: a.DocumentImage,
                        WaypointNumberId: null,
                        WayNumberId: null
                    },
                    i = new google.maps.LatLng(a.Geolocalization.split(",")[0], a.Geolocalization.split(",")[1]),
                    o = !1;
                    waypts.length > 0 ? ($.each(waypts, function (t, e) {
                        var s = getDistance(e.location, i);
                        return 200 > s ? (r.WaypointNumberId = t, r.WayNumberId = t, void (o = !0)) : void 0
                    }), o || (r.WaypointNumberId = waypts.length, r.WayNumberId = waypts.length, s.Waypoints.push({
                        NumberId: r.WaypointNumberId,
                        Address: r.Address,
                        Geolocalization: r.Geolocalization
                    }), waypts.push({
                        location: i,
                        stopover: !0
                    }))) : (r.WaypointNumberId = t, r.WayNumberId = t, s.Waypoints.push({
                        NumberId: r.WaypointNumberId,
                        Address: r.Address,
                        Geolocalization: r.Geolocalization
                    }), waypts.push({
                        location: i,
                        stopover: !0
                    })), o || (void 0 != e && (e.NumberId = s.Ways.length, s.Ways.push(e)), e = {
                        NumberId: null,
                        NumberIdCalc: "",
                        OriginAddress: "",
                        OriginGeolocalization: "",
                        DestinationAddress: r.Address,
                        DestinationGeolocalization: r.Geolocalization,
                        Star: null,
                        End: null,
                        Duration: {
                            deal: {
                                text: null,
                                value: null
                            },
                            real: {
                                text: null,
                                value: null
                            }
                        },
                        Distance: {
                            deal: {
                                text: null,
                                value: null
                            },
                            real: {
                                text: null,
                                value: null
                            }
                        },
                        Orders: [],
                        Interruptions: []
                    }), e.Orders.push(r)
                }), void 0 != e && (e.NumberId = s.Ways.length, s.Ways.push(e)), s
            }

            /// createConsignmentI
            /// - crear consigna de documentos I
            function _fn059() {
                var t = $.grep(_sbList, function (t) {
                    return "B" == t.Status
                });
                if (0 == t.length) {
                    var e = _dictionary.w205;
                    return void $("#sbPopupMsg").bPopup({
                        autoClose: 3500,
                        onOpen: function () {
                            var t = [],
                                s = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + e;
                            t.push('<span class="buttonX b-close"><span><img src="./Images/btnClose.png" /></span></span>\n'),
                            t.push('<img src="./Images/msgbox_error.png" /><br />\n'),
                        t.push(s),
                        t.push('<script type="text/javascript">\n'),
                        t.push('_fn002("' + _userLang + '", "' + e + '");\n'),
                        t.push("&lt;/script>\n"), this.html(t.join(""))
                        },
                        position: [50, 100],
                        positionStyle: "absolute",
                        speed: 450,
                        transition: "slideDown",
                        onClose: function () { this.html("") }
                    })
                }
                Company = void 0;
                var s = "",
                a = "/api/companies";
                if (_ob001("GET", a, s), !_ob000.Result) return $("#sbPopupMsg").bPopup({
                    autoClose: 3500,
                    onOpen: function () {
                        var t = [],
                        e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _dictionary.w192;
                        t.push('<span class="button b-close"><span>X</span></span>'),
                        t.push('<img src="./Images/msgbox_error.png" /><br />'),
                        t.push(e),
                        this.html(t.join(""))
                    },
                    position: [50, 100],
                    positionStyle: "absolute",
                    speed: 450,
                    transition: "slideDown",
                    onClose: function () {
                        this.html("")
                    }
                }), _Company;
                var n = JSON.parse(_ob000.Data);
                _ob000 = {}, $("#sbPopupMsg").bPopup({
                    onOpen: function () {
                        var e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _dictionary.w164,
                            s = [];
                        s.push('<span class="button b-close"><span>X</span></span>\n'),
                        s.push("<h3>" + e + "</h3>\n"),
                        s.push("<hr />\n"),
                        s.push("<p>" + _dictionary.w165 + ": " + t.length + "</p><br />\n"),
                        s.push("<p>" + _dictionary.w074 + ":\n"),
                        s.push('<select id="Company">\n'),
                        s.push('<option value=""> </option>\n');
                        var a;
                        for (a = 0, len = n.length; a < len; a++)
                            s.push('<option value="' + n[a].Id + '">' + n[a].CompanyName + "</option>\n");
                        s.push("</select>\n"), s.push("<hr />\n"),
                        s.push('<input id="crearRemesa" class="btn btn-info b-close" type="button" value="' + _dictionary.w170 + '" /&lt;\n'),
                        this.html(s.join(""))
                    },
                    position: [50, 150], positionStyle: "absolute", speed: 450, transition: "slideDown", onClose: function () {
                        var t = document.querySelector("#Company").selectedIndex;
                        t > 0 ? Company = n[t - 1].Id + "¦" + n[t - 1].CompanyName : Company = void 0, _fn060()
                    }
                })
            }

            /// createConsignmentII
            /// - crear consigna de documentos II
            function _fn060() {
                var t = $.grep(_sbList, function (t) {
                    return "B" == t.Status
                });
                if (void 0 != Company) {
                    var e = new Date,
                    s = e.toLocaleString(),
                    a = (s.split(" ")[0], {
                        Id: _fn070(),
                        DeliverymanId: "",
                        DeliveryCompanyId: Company.split("¦")[0],
                        ExternalDeliveryman: !0,
                        WorkOrderDate: e,
                        DeactivationDate: null,
                        Status: "O",
                        Ruta: _fn058()
                    }),
                    n = a,
                    r = "/api/workorders";
                    if (_ob001("POST", r, n), !_ob000.Result) return void $("#sbPopupMsg").bPopup({
                        autoClose: 3500,
                        onOpen: function () {
                            var t = [],
                            e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _dictionary.w206;
                            t.push('<span class="button b-close"><span>X</span></span>'), t.push('<img src="./Images/msgbox_error.png" /><br />'), t.push(e), this.html(t.join(""))
                        },
                        position: [50, 100],
                        positionStyle: "absolute",
                        speed: 450,
                        transition: "slideDown",
                        onClose: function () {
                            this.html("")
                        }
                    });
                    $.each(t, function (t, e) {
                        var s;
                        $.each(_sbList, function (t, n) {
                            if (e.Id === n.Id) {
                                n.Status = "A", n.WorkOrderId = a.Id;
                                var r = "/api/orders/" + n.Id;
                                return _ob001("PUT", r, n), $("div").remove("#tit" + n.Id), $("div").remove("#det" + n.Id), void (s = t)
                            }
                        }), _sbList.splice(s, 1)
                    }),
                    _fn029(),
                    _ob000 = {},
                    0 == $.grep(_sbList, function (t) {
                        return "B" == t.Status
                    }).length && $("#remesa").prop("disabled", !0),
                    _fn057(a.Id),
                    _fn062()
                }
            }

            //function filterList(m) {
            //  var t = $("#filterControlgroup-input").val().toLowerCase().split("|"),
            //      e = document.getElementById(m),
            //      s = e.getElementsByTagName("div");
            //  for (i = 0; i < s.length; i++) {
            //    if ("tit" == s[i].id.substring(0, 3)) {
            //      s[i].style.display = "none", document.getElementById(s[i].id.replace("tit", "det")).style.display = "none";
            //      var a = 0, n = s[i].id.substring(3);
            //      for (a = 0, len = Object.keys(_sbList).length; a < len && Object.keys(_sbList)[a].toString() != n; a++);
            //      var r = s[i].getElementsByTagName("td"),
            //      o = "";
            //      for (j = 0; j < r.length; j++) "" != o && (o += "¦"), o += r[j].innerText.toLowerCase();
            //      for (var p = !1, d = 0; d < t.length; d++) p = o.indexOf(t[d]) > -1 && 0 == d ? !0 : o.indexOf(t[d]) > -1 && p ? !0 : !1;
            //      p && (s[i].style.display = "block")
            //    }
            //  }
            //}

        /// setResumeList
        /// - Resume's grid
            function setResumeList(_list) {
                var sbList = _list;
                //$("#container").attr("data-sbcontent", ""),
                //$("#container").html("");

                activateTab(4);

                var t = [];
            }

        /// setStaffList
        /// - Donations's grid
            function setStaffList(_list) {
                var sbList = _list;
                //$("#container").attr("data-sbcontent", ""),
                //$("#container").html("");

                activateTab(3);

                var t = [];
            }

        /// setItemsShopFloorList
        /// - Items Shop Floor's grid
            function setItemsShopFloorList(_list) {
                var sbList = _list;
                //$("#container").attr("data-sbcontent", ""),
                //$("#container").html("");

                activateTab(2);

                var t = [];
            }

        /// setDonationsList
        /// - Donations's grid
            function setDonationsList(_list) {
                var sbList = _list;
                //$("#container").attr("data-sbcontent", ""),
                //$("#container").html("");

                activateTab(1);

                var t = [];
            }

            /// setGiftAidersList
            /// - GiftAiders's grid
            function setGiftAidersList(_list) {
                var sbList = _list,
                    s = void 0;
                //$("#container").attr("data-sbcontent", ""),
                //$("#container").html("");

                activateTab(0);

                var s;
                try { s = new AudioListener } catch (a) { s = null }
                
                var t = [];
                t.push('<div style="display: inline;" class="row">'),
                t.push('<div class="ui-input-search ui-body-inherit ui-corner-all ui-shadow-inset ui-input-has-clear" style="border:0;">'),
                t.push('<input data-type="search" id="filterControlgroup-input" style="border:0;">'),
                t.push('<a href="#" tabindex="-1" aria-hidden="true" class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-input-clear-hidden" title="Clear text" style="border:0;">Clear text</a>');
                t.push('</div>');
                if (s) t.push('<span onclick="voiceGet(\'filterControlgroup-input\')" style="cursor: pointer; position: relative; right: -95%; top: -40px;"><img src="' + getImage("/img/mic") + '" width="40" height="40" /></span>');
                t.push('</div>\n'),
                t.push('<div id="giftaiders" class="col-md-6" data-role="controlgroup" data-filter="true" data-input="#filterControlgroup-input"></div>\n'),
                $("#container").html(t.join(""));

                t = [];
                t.push('<span class="buttonAdd newData">+</span>\n'),
                t.push('<p class="c14 c8"><span class="wrTitle"></span></p>\n');

                $.each(sbList, function (ele, s) {              
                    var a = void "",
                        n = s.firstname + " " + s.surname,
                        d = (s.deactivated !== "" && s.deactivated !== null) ? getFormattedDate(s.deactivated) : "",
                        b = s.title ? s.title : "",
                        c = s.firstname ? s.firstname : "",
                        e = s.surname ? s.surname : "",
                        f = s.postcode ? s.postcode : "",
                        g = s.barcode ? s.barcode : "",
                        h = (s.deactivated !== "" && s.deactivated !== null) ? "checked" : "";

                    t.push('<p class="c14">\n'),
                    t.push('<div id="tit' + ele + '" class="c6" data-idGiftAider="' + ele + '">\n'),
                    t.push('<table class="ListadoTr" style="width: 100%;" data-idGiftAider="' + ele + '">\n'),
                    t.push('<tr><td style="width: 65%;">\n'),
                    t.push('<span style="font-size: 9pt;">Nº:</span> <i><b>' + ele + "</b></i><br /><span style=\"font-size: 8pt;\">" + s.title + ". </span><i><b>" + n + "</b></i><br /><i><b>" + s.postcode + "</b></i></td>\n"),
                    t.push('<td style="width: 30%;"><br /><span style="margin-right: 3%"><i><b>&nbsp;' + getFormattedDate(s.activated) + '</b></i></span><br />\n'),
                    t.push('<span style="margin-left: 3%"><span style="font-size: 8pt;">bc:</span> <i><b>' + s.barcode + "</b></i></span><br />\n");
                    t.push('<span id="deactivated' + ele + '" style="margin-right: 3%; color: #ff0000;"><i><b>&nbsp;' + d + '</b></i></span>\n');
                    t.push("</td>\n"),
                    t.push('<td style="width: 5%;">\n');
                    if (d === "")
                        t.push('<span id="giftAid' + ele + '" class="newDonation round-button" >D</span>\n');
                    t.push('</td>\n'),
                    t.push('</tr></table>\n'),
                    t.push('</div></p>\n'),
                    t.push('<a href="#" name="0"></a>\n'),
                    t.push('<div id="det' + ele + '" class="c13" style="display: none;">\n'),
                    t.push("<div class=\"form-group\">\n"),
                    t.push("<input type=\"text\" class=\"form-control\" id=\"txtTitle" + ele + "\" placeholder=\"title\" name=\"title\" value=\"" + b + "\" />\n"),
                    t.push("</div>\n"),
                    t.push("<div class=\"form-group\">\n"),
                    t.push("<input type=\"text\" class=\"form-control\" id=\"txtFirstname" + ele + "\" placeholder=\"firstname\" name=\"firstname\" value=\"" + c + "\" />\n"),
                    t.push("</div>\n"),
                    t.push("<div class=\"form-group\">\n"),
                    t.push("<input type=\"text\" class=\"form-control\" id=\"txtSurname" + ele + "\" placeholder=\"surname\" name=\"surname\" value=\""+ e + "\" />\n"),
                    t.push("</div>\n"),
                    t.push("<div class=\"form-group\">\n"),
                    t.push("<input type=\"text\" class=\"form-control\" id=\"txtPostcode" + ele + "\" placeholder=\"postcode\" name=\"postcode\" value=\"" + f + "\" />\n"),
                    t.push("</div>\n"),
                    t.push("<div class=\"form-group\">\n"),
                    t.push("<input type=\"text\" class=\"form-control\" id=\"txtBarcode" + ele + "\" placeholder=\"barcode\" name=\"barcode\" value=\"" + g + "\" />\n"),
                    t.push("</div>\n"),
                    t.push("<div class=\"form-group\">\n"),
                    t.push('<input id="cheBox' + ele + '" type="checkbox" class="pedidoChe" title="Deactivate" ' + h + ' /> &nbsp;&nbsp;Deactivated\n'),
                    t.push("</div>\n"),
                    t.push("<button id=\"btnSave" + ele + "\" type=\"button\" class=\"btn btn-primary btn-block saveData\">Save</button>\n"),
                    t.push("</div>\n")
                }), 

                t.push('<p class="c14 c8"><span></span></p>\n'),
                t.push('<script type="text/javascript">\n');
                t.push('$(".c6").' + ($(window).width() < 994 ? "click( " : "mouseenter( ")),
                t.push("function () {\n");
                t.push('  $(".c6").css("background-color", "#fff");\n');
                t.push('  $(".c13").css("display", "none");\n');
                t.push('  $("#" + this.id).css("background-color", "rgba(0, 0, 0, 0.05)");\n');
                t.push('  $("#" + this.id.replace("tit", "det")).css("display", "block");\n');
                t.push("});\n");
                t.push('$("#filterControlgroup-input").bind("input", function () {\n'),
                t.push('  filterList("giftaiders");\n'),
                t.push("});\n"),

                t.push('$(".saveData").dblclick( function (e) {\n'),
                t.push('    e.preventDefault();\n'),
                t.push('    var l = this.id.substring(7);\n'),
                t.push('    saveData(l);\n'),
                t.push('});\n'),

                t.push('$(".newDonation").click( function (e) {\n'),
                t.push('    e.preventDefault();\n'),
                t.push('    _giftAiderId = this.id.substring(7);\n'),
                t.push('    Path.root("#/donations");\n'),
                t.push('    Path.listen();\n'),
                t.push('    location.href = "#/donations";\n'),
                t.push('});\n'),

                t.push('$(".newData").click( function (e) {\n'),
                t.push('    e.preventDefault();\n'),
                t.push('    newData("giftAiders");\n'),
                t.push('});\n'),

                t.push("</script>\n"),          // &lt;

                $("#giftaiders").html(t.join(""))
            }

            function loadMap() {
     //           _fn992().split("¦");
                $("#container").attr("data-sbcontent", ""),
                $("#container").html(""),

                //google.load("maps", "3.7",
                //{
                //    other_params: "signed_in=false&sensor=false&libraries=places&language=" + _userLang,
                //    callback: _fn064
                //})
                loadMapData();
            }

            function loadMapData() {
                $("#container").attr("data-sbcontent", ""),
                $("#container").html("");

                switch (_funcion) {
                    case "setGiftAidersList":
                        setGiftAidersList(getList("giftAiders", ""));
                        $("#container").attr("data-sbcontent", "giftAiders");
                        break;
                    case "setDonationsList":
                        setDonationsList(getList("donations", ""));
                        $("#container").attr("data-sbcontent", "donations");
                        break;
                    case "setItemsShopFloorList":
                        setItemsShopFloorList(getList("itemsShopFloor", ""));
                        $("#container").attr("data-sbcontent", "itemsShopFloor");
                        break;
                    case "setStaffList":
                        setStaffList(getList("staff", ""));
                        $("#container").attr("data-sbcontent", "staff");
                        break;
                    case "setResumeList":
                        setResumeList(getList("resume", ""));
                        $("#container").attr("data-sbcontent", "resume");
                        break;
                }
            }

            /// setPedListaS
            ///
            function _fn065() {
                _fn992().split("¦");
                pedidoClaveActual = void 0, $("#container").attr("data-sbcontent", ""), $("#container").html("");
                var t = [];
                t.push('<div class="row">'), t.push('<div id="pedidos" class="col-md-6"></div>'), t.push('<div class="col-md-6"><div id="pedido">'), t.push('<p class="c14 c8"><span></span></p>'), t.push('<p class="c14 c8"><span></span></p>'), _sbList.length > 0 && t.push("" + _dictionary.w149), t.push("</div></div>"), t.push("</div>"), $("#container").html(t.join("")), t = [], t.push('<p class="c14 c8"><span></span></p>'), $.each(_sbList, function (e, s) {
                    var a = "O" == s.DocStatus ? '<span style="color: #66CC66">' + _dictionary.w045 + '</span>' : '<span style="color: #CC3300">' + _dictionary.w044 + '</span>';
                    t.push('<p class="c14"><div id="' + s.Clave + '" class="c6" data-idPedido="' + s.Clave + '">'), t.push(' <span style="margin-left: 3%">'), t.push(' <table class="ListadoTr" style="width: 100%;" data-idPedido="' + s.Clave + '">'), t.push(' <tr><td style="width: 70%;"><span style="font-size: 9pt;">' + _dictionary.w020 + ":</span> <i><b>" + s.ClaveExterna + "</b></i><br /><i><b>" + s.CardName + "</b></i><br /><i><b>" + s.Address + "</b></i></span></td>"), t.push(' <td style="width: 30%;"><span style="margin-right: 3%"><i><b>' + s.DocDate + '</b></i></span><br /><span style="margin-left: 3%"><span style="font-size: 9pt;">' + _dictionary.w046 + ":</span> <i><b>" + s.CardCode + "</b></i></span><br />" + a + "</td></tr></table></span>"), t.push("</div></p>")
                }),
                t.push('<p class="c14 c8"><span></span></p>'),
                t.push('<script type="text/javascript">'), t.push('$(".c6").' + ($(window).width() < 994 ? "click(" : "mouseenter(")), t.push("function () {"), t.push("if (pedidoClaveActual != this.id) {"), t.push('$(".c6").css("background-color", "#fff");'), t.push('$(".c13").css("display", "none");'), t.push('$("#" + this.id.replace("tit", "det")).css("display", "block");'), t.push('$("#" + this.id).css("background-color", "rgba(0, 0, 0, 0.05)");'), t.push('$("#" + this.id).css("cursor", "hand");'), t.push("_fn041(this.id);"), t.push("}"), t.push("});"), t.push("&lt;/script>"), $("#pedidos").html(t.join("")), $("#container").attr("data-sbcontent", "pedLista")
            }

            /// GetVerificationCode (destinatario, pedido, langCod)
            ///
            function _fn066(t, e, s) {
                var a = {
                    destinatario: t,
                    pedido: e,
                    langCod: s
                };
                return _ob001("GetVerificationCode", a), _ob000
            }

            /// setPedidoNuevoS
            ///
            function _fn067() {
                var t = _dictionary.w138,
                e = [];
                e.push('<div style="max-width: 600px">'), e.push('<p class="c14 c8"><span></span></p>'), e.push('<p class="c14 c8"><span></span></p>'), e.push('<span style="margin-left: 3%">'), e.push('<table class="ListadoTr" style="width: 100%;" data-idPedido=99999999">'), e.push('<tr><td style="width: 70%;"><span style="font-size: 9pt;">' + _dictionary.w020 + ':</span> <i><b><input id="ClaveExterna" type="text" style="border-radius: 4px;" size="9" placeholder="número" /></b></i><br /><i><b><input id="CardName" type="text" class="QuantityItem" style="border-radius: 4px;" size="9" placeholder="nombre" /></b></i><br /><i><b><input id="Address" type="text" style="border-radius: 4px;" size="9" placeholder="dirección" /></b></i></span></td>'), e.push('<td style="width: 30%;"><span style="margin-right: 3%"><i><b><input id="DocDate" type="text" style="border-radius: 4px;" size="9" placeholder="fecha" /></b></i></span><br /><span style="margin-left: 3%"><span style="font-size: 9pt;">' + _dictionary.w046 + ':</span> <i><b><input id="CardCode" type="text" style="border-radius: 4px;" size="9" placeholder="código" /></b></i></span></td></tr></table></span>'), e.push('<p class="c14 c8"><span></span></p>'), e.push('<span style="margin-left: 3%"><table style="width: 100%; border-collapse: separate;">'), e.push('<thead><tr style="color: #2B91AF; font-size: 9pt;"><th>' + _dictionary.w049 + "&nbsp;</th><th>" + _dictionary.w019 + "&nbsp;</th><th>" + _dictionary.w047 + "&nbsp;</th><th>" + _dictionary.w022 + "&nbsp;</th><th>" + _dictionary.w023 + "&nbsp;</th></tr></thead>"), e.push("<tbody>"), e.push('<tr class="pedDet">'), e.push('<td style="width: 8%;"><input id="NLinea" type="text" style="border-radius: 4px;" size="9" placeholder="linea" /></td>'), e.push('<td style="width: 12%;"><input id="ItemCode" type="text" style="border-radius: 4px;" size="9" placeholder="código" /></td>'), e.push('<td style="width: 34%;"><input id="aItemName" type="text" style="border-radius: 4px;" size="9" placeholder="descripción" /></td>'), e.push('<td style="width: 12%;"><input id="OpenQuantity" type="text" style="border-radius: 4px;" size="9" placeholder="cantidad" /></td>'), e.push('<td style="width: 17%;"><input id="Price" type="text" style="border-radius: 4px;" size="9" placeholder="precio" /></td>'), e.push("</tr></tbody>"), e.push("</table></span>"), e.push('<p class="c14 c8"><span></span></p>'), e.push('<hr style="margin-top: 10px; margin-bottom: 10px; border-top-color: grey;" />'), e.push('<div style="float:right; margin-right: 50%;"><p align="center">'), e.push('<input id="UserTwitter" name="UserTwitter" class="form-control" data-val="true" data-val-required="' + t.replace(" %s", _dictionary.w012) + '" type="text" style="margin-bottom: 8px;" size="10px" value="" placeholder="' + _dictionary.w147 + '"  disabled="disabled"/>'), e.push('<input id="confirmPed" class="btn btn-info" type="button" value="' + _dictionary.w154 + '" onclick="javascript: $(\' #divRutas\').show(); $(\'#divPedido\').hide();" disabled="disabled" />'), e.push("</p></div>"), e.push("</div>"), tdPed = e, $("#container").html(tdPed.join("")), $("table tr.pedDet:nth-child(even)").addClass("alternativo"), $("#container").attr("data-sbcontent", "pedidoNuevo")
            }

            /// setPedSeleccionS
            ///
            function _fn068() {
                _fn992().split("¦");
                $("#container").html(""), $("#container").attr("data-sbcontent", ""), lBarCod = 1;
                var t = [];
                t.push('<p class="c14 c8"><span></span></p>'),
                t.push('<table id="pedBarCod" width="60%" border="1" bordercolor="#FFF" style="border-collapse: separate">'),
                t.push("<tbody>"),
                t.push('<tr style="background-color: #E0E0E0;">'),
                t.push('<td><p id="barCod01cod" class="barCode">&nbsp;</p></td>'),
                t.push('<td style="text-align: center; width: 50px;"><span id="barCod01sta" class="status" title="' + _dictionary.w056 + '"><span>&nbsp;</span></span></td>'),
                t.push('<td style="text-align: center; width: 50px;"><input id="barCod01che" type="checkbox" class="barCodeChe" /></td>'),
                t.push('<td style="width: 50px; background-color: #FFF;">&nbsp;</td>'),
                t.push("</tr>"),
                t.push("</tbody>"),
                t.push("<thead>"),
                t.push('<tr style="color: #2B91AF; font-size: 9pt;">'),
                t.push("<th>" + _dictionary.w052 + "</th>"),
                t.push('<th style="text-align: center;">' + _dictionary.w053 + "</th>"),
                t.push('<td style="text-align: center; width: 50px;">&nbsp;&nbsp; <input id="barCod00che" type="checkbox" class="barCodeChe" title="' + _dictionary.w054 + '"/><span style="font-size: 75%; vertical-align: super; color: red;"><b> *</b></span></td>'),
                t.push("<th>&nbsp;</th>"), t.push("</tr></thead>"),
                t.push("</thead>"), t.push("</table>"),
                t.push('<p class="c14 c8" style="font-size: 2%;"><span></span></p>'),
                t.push('<span id="addBarCode" class="buttonplus"><span title="' + _dictionary.w055 + '">+</span></span>'),
                t.push("<hr/>"),
                t.push('<input id="confirmSel" class="btn btn-info" type="button" value="' + _dictionary.w155 + '"/>'),
                t.push('<br/><br/><br/>______<br/><span style="font-size: 75%; color: red"><b>*</b></span><span style="font-size: 75%;"> ' + _dictionary.w151 + "</span>"),
                t.push('<script type="text/javascript">\n'),
                t.push('$("#addBarCode").click(function () {\n'),
                t.push('var Id = "barCod" + _fn069((lBarCod + 1), 2); \n'),
                t.push('var tr = document.createElement("tr"); \n'),
                t.push('tr.style.backgroundColor = "#E0E0E0"; \n'),
                t.push("for (var c = 0; c < pedBarCod.rows[0].childNodes.length; c++) { \n"),
                t.push('var td = document.createElement("td"); \n'),
                t.push("switch (c) { \n"),
                t.push("case 0: \n"),
                t.push('td.innerHTML = "<p class=barCode id=" + Id + "cod>&nbsp;</p>"; \n'),
                t.push("tr.appendChild(td); \n"), t.push("break; \n"),
                t.push("case 1: \n"),
                t.push('td.setAttribute("style", "text-align: center; width: 50px;"); \n'),
                t.push('td.innerHTML = "<span id=" + Id + "sta class=status title=escanear><span>&nbsp;</span></span>"; \n'),
                t.push("tr.appendChild(td); \n"), t.push("break; \n"),
                t.push("case 2: \n"),
                t.push('td.setAttribute("style", "text-align: center; width: 50px;");\n'),
                t.push('td.innerHTML = "<input id=" + Id + "che  type=checkbox class=barCodeChe />"; \n'),
                t.push("tr.appendChild(td); \n"), t.push("break; \n"),
                t.push("case 3: \n"),
                t.push('td.setAttribute("style", "width: 50px; background-color: #FFF;")\n'),
                t.push('td.innerHTML = "&nbsp;<span id=" + Id + "min class=buttonminus title=eliminar><span>–</span></span>"; \n'),
                t.push("tr.appendChild(td); \n"), t.push("break; \n"),
                t.push("}\n"), t.push("}\n"),
                t.push('$("#barCod00che").removeProp("checked"); \n'),
                t.push('$("#barCod00che").removeAttr("checked"); \n'),
                t.push("pedBarCod.children[0].appendChild(tr); \n"),
                t.push("lBarCod += 1; \n"), t.push("}); \n"),
                t.push(" \n"), t.push('$(document).on("click", ".barCodeChe", function () { \n'),
                t.push('if ($(this).attr("id") === "barCod00che") { \n'),
                t.push('if( $(this).attr("checked") == undefined ) { \n'),
                t.push('$(".barCodeChe").prop("checked", true); \n'),
                t.push('$(".barCodeChe").attr("checked", "checked"); \n'),
                t.push("} else { \n"),
                t.push('$(".barCodeChe").removeProp("checked"); \n'),
                t.push('$(".barCodeChe").removeAttr("checked"); \n'), t.push("} \n"),
                t.push("} else { \n"),
                t.push('if( $(this).attr("checked") == undefined ) { \n'),
                t.push('$(this).prop("checked", true); \n'), t.push('$(this).attr("checked", "checked"); \n'),
                t.push("} else { \n"), t.push('$(this).removeProp("checked"); \n'),
                t.push('$(this).removeAttr("checked"); \n'), t.push("} \n"),
                t.push('$("#barCod00che").removeProp("checked"); \n'),
                t.push('$("#barCod00che").removeAttr("checked"); \n'),
                t.push("} \n"), t.push("});\n"), t.push(" \n"),
                t.push('$(document).on("click", ".buttonminus", function () {\n'),
                t.push('$(this).closest("tr").remove();\n'),
                t.push("});\n"), t.push(" \n"),
                t.push('$(document).on("click", ".status", function () { \n'),
                t.push('idCodigoBar = $(this).attr("id").replace("sta", "cod"); \n'),
                t.push("$('#sbPopupMsg').bPopup({ \n"), t.push("onOpen: function () { \n"),
                t.push('<span class="buttonX b-close"><span><img src="./Images/btnClose.png" /></span></span>\n'),
                t.push('<img src="./Images/msgbox_question.png" /><br />\n'),
                t.push('<p id="textMensaje">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + _dictionary.w152 + "</p>\n"),
                t.push('<div id="picture" style="display: none;"><canvas width="320" height="240"></canvas></div>\n'),
                t.push('<input id="Take-Picture" type="file" accept="image/*;capture=camera" class="filestyle" data-classButton="btn btn-info" data-input="false" data-classIcon="icon-plus" data-buttonText="&nbsp;Upload ">\n'),
                t.push('<p id="textbit"></p>\n'), t.push("<hr />\n"),
                t.push('<input id="aceptarEscaneado" class="btn btn-info b-close" type="button" value="OK scanned" />\n'), t.push("}, \n"),
                t.push("position: [50, 100],\n"),
                t.push("positionStyle: 'absolute', //'fixed' or 'absolute'\n"), t.push("speed: 450,\n"),
                t.push("transition: 'slideDown',\n"),
                t.push("onClose: function () {\n"), t.push('//this.html("");\n'),
                t.push('var eMensaje = document.querySelector("#textMensaje");\n'),
                t.push('var eBit = document.querySelector("#textbit");\n'),
                t.push('var ePicture = document.querySelector("#picture");\n'),
                t.push('var eFile = document.getElementById("Take-Picture");\n'),
                t.push('eMensaje.innerHTML = "";\n'), t.push('eBit.innerHTML = "";\n'),
                t.push('ePicture.innerHTML = "";\n'), t.push("eFile.files = [];\n"),
                t.push('eFile.value = "";\n'), t.push('idCodigoBar = "";\n'), t.push('idCodigoBar = "";\n'),
                t.push('if(document.getElementsByClassName("badge")[0]) \n'),
                t.push('document.getElementsByClassName("badge")[0].innerHTML = ""; \n'),
                t.push("}\n"), t.push("});\n"), t.push("});\n"), t.push(" \n"),
                t.push('$("#confirmSel").click(function () { \n'), t.push('  $(".barCode").each( \n'),
                t.push("function (index, barC) { \n"), t.push('idCodigoBar = barC.getAttribute("id"); \n'),
                t.push("valor = barC.innerHTML; \n"), t.push('if (valor != "") { \n'),
                t.push('document.getElementById(idCodigoBar.replace("cod", "sta")).style.backgroundColor = "#00FF00"; \n'), t.push("} \n"),
                t.push("} \n"), t.push("   );\n"), t.push('console.log("' + _dictionary.w153 + '"); \n'),
                t.push("});\n"), t.push(" \n"), t.push('$("#aceptarEscaneado").click(function () { \n'),
                t.push('var codigoBar = ((document.querySelector("#textbit").innerHTML) != "" && (document.querySelector("#textbit").innerHTML).search(" : ") > 0) ?  (document.querySelector("#textbit").innerHTML).split(" : ")[1] : ""; \n'),
                t.push('if (codigoBar != "") { \n'),
                t.push("document.getElementById(idCodigoBar).innerHTML = codigoBar; \n"),
                t.push('document.getElementById(idCodigoBar.replace("cod", "sta")).style.backgroundColor = "#FFA500"; \n'),
                t.push("} \n"), t.push("});\n"), t.push("&lt;/script>\n"),
                t.push('<script type="text/javascript" src="Scripts/JOB/JOB.js">&lt;/script>\n'),
                t.push('<script type="text/javascript" src="Scripts/app/JOB.js"><&lt;/script>\n'),
                $("#container").html(t.join("")), $("#container").attr("data-sbcontent", "pedSeleccion")
            }

            /// zeroPad  (num, places)
            ///
            function _fn069(t, e) {
                var s = e - t.toString().length + 1;
                return Array(+(s > 0 && s)).join("0") + t
            }

            /// numWorkOrder
            ///
            function _fn070() {
                for (var t, e = !0; e;) {
                    var s = new Date,
                        a = s.toLocaleString(),
                        n = a.split(" "),
                        r = n[0].split("/"),
                        i = n[1].split(":");
                    t = r[2].substring(3, 4) + _fn069(r[1], 2) + _fn069(r[0], 2) + _fn069(i[0], 2) + _fn069(i[1], 2);
                    var o = "",
                        p = "/api/workorders/" + t;
                    _ob001("GET", p, o), e = _ob000.Result
                }
                return _ob000 = {}, t
            }

            /// Inicio
            /// -
            function _fn072() {
                //
                // user:  Id                string
                //        CompanyId         string
                //        Category          char
                //        NameDisplay       string
                //        MobileNumber      string
                //        Email             string
                //        Twitter           string
                //        DefaultLenguage   string
                //        UserSecretKey     string
                //        Lisence_sb       string
                //
                var t = _fn992().split("¦");
                var s = $(window).width();          //if ($(window).width() > 993)

                //_ob003.init(t[9]);
                _ob003.init();

                switch (t[2]) {
                    case "D":
                    case "X":
                        $("#navegation").html(_fn005(t[2])), _funcion = "setRutListaS", loadMap();
                        break;
                    case "A":
                        if (s > 993)
                            $("#navegation").html(_fn005(t[2])), _funcion = "setGiftAidersList", loadMap();
                        else
                            _fn013();
                        break;
                    case "O":
                        if (s > 993)
                            $("#navegation").html(_fn005(t[2])), _funcion = "setWOListaS2", loadMap();
                        else
                            _fn013();
                        break;
                    case "C":
                        $("#navegation").html(_fn005(t[2])), _fn065()
                }
            }

            /// setItem
            /// -  in localSotorage
            function _fn073(k, d) {
                localStorage.setItem(k, d);
            }

            /// getItem
            /// -  from localSotorage
            function _fn074(k) {
                return localStorage.getItem(k);
            }

            /// searchItems
            /// -localSotorage
            function _fn075(d) {
                var items = [];

                for (var i = 0; i < localStorage.length; i++) {
                    var _k = localStorage.key(i),
                        _d = _fn074(_k);
                    if (d == undefined) {
                    } else {
                        if (_d === d) {
                            (items.push(_k + "," + _d));
                        }
                    }
                }

                return items;
            }

            /// clearLocalSotorage
            /// -
            function _fn076() {
                localStorage.clear();
            }

            ////////////////////////////////////////
            /// Controllers
            ////////////////////////////////////////
            _controllers.login = function (form) {
                //voiceMsg(_userLang, _dictionary.w157);

                // Form submission for logging in
                form.on("submit", function (e) {
                    var userAndPass = $(this).serializeObject();
                    var loginPromise = authWithPassword(userAndPass);
                    e.preventDefault();
                    handleAuthResponse(loginPromise, 'profile');            //???

                    ///////////////// fv-begin ///////////////////////////////////////////////////////////
                    //
                    // return string: _user.Id + "¦" + _user.CompanyId + "¦" + _user.Category + "¦" + _user.NameDisplay + "¦" + _user.MobileNumber + "¦" + _user.Email + "¦" + _user.Twitter + "¦" + _user.DefaultLenguage + "¦" + _user.UserSecretKey + "¦" + _user.Lisence_sb;
                    //
                    //      [0] Id
                    //      [1] CompanyId
                    //      [2] Category
                    //      [3] NameDisplay
                    //      [4] MobileNumber
                    //      [5] Email
                    //      [6] Twitter
                    //      [7] DefaultLanguage
                    //      [8] UserSecretKey
                    //      [9] Lisence_sb
                    //
                    //           var t = "",
                    //               e = "/api/accounts/" + $("#UserName").val() + "/" + $("#Password").val();
                    //           if (_ob001("GET", e, t), !_ob000.Result) {
                    //               var s = "Error: 498 - Expired or invalid token" == _ob000.Message ? "Usuario y contraseña aún no autorizado o bloqueado" : _dictionary.w172;
                    //               return void $("#sbPopupMsg").bPopup({
                    //                   autoClose: 3500,
                    //                   onOpen: function () {
                    //                       var t = [],
                    //                           e = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + s;
                    //                       t.push('<span class="buttonX b-close"><span><img src="./Images/btnClose.png"/></span></span>\n'), t.push('<img src="./Images/msgbox_error.png" /><br/>\n'), t.push(e), t.push('<script type="text/javascript">\n'), t.push('_fn002("' + _userLang + '", "' + s + '");\n'), t.push("&lt;/script>\n"), this.html(t.join(""))
                    //                   },
                    //                   position: [50, 100],
                    //                   positionStyle: "absolute",
                    //                   speed: 450,
                    //                   transition: "slideDown",
                    //                   onClose: function () {
                    //                       this.html("")
                    //                   }
                    //               })
                    //           }
                    //           ("" == _ob000.Data.split("¦")[7] || _userLang != _ob000.Data.split("¦")[7]) && (x = _ob000.Data.split("¦"), x[7] = _userLang, _ob000.Data = x.join("¦")), _fn991(_ob000.Data), _ob003.init(), _ob000 = {}, window.location.reload()
                    //           //("" == _ob000.Data.split("¦")[7] || _userLang != _ob000.Data.split("¦")[7]) && (x = _ob000.Data.split("¦"), x[7] = _userLang, _ob000.Data = x.join("¦")), _fn991(_ob000.Data), _ob003.init(_ob000.Data.split("¦")[9]), _ob000 = {}, window.location.reload()

                    ///////////////// fv-end /////////////////////////////////////////////////////////////

                });

                //// Social buttons
                //form.children('.bt-social').on('click', function (e) {
                //    var $currentButton = $(this);
                //    var provider = $currentButton.data('provider');
                //    var socialLoginPromise;
                //    e.preventDefault();
                //    socialLoginPromise = thirdPartyLogin(provider);
                //    handleAuthResponse(socialLoginPromise, 'profile');
                //});
                //form.children('#btAnon').on('click', function (e) {
                //    e.preventDefault();
                //    handleAuthResponse(authAnonymously(), 'profilex');
                //});

                $(".idioma").click(function (e) {
                    e.preventDefault();
                    //var userAndPass = $(this).serializeObject();
              //      var loginPromise = authWithPassword(userAndPass);
                    //e.preventDefault();
                    //handleAuthResponse(loginPromise, 'profile');            //???

                    _userLang = $(this).attr("class").replace("idioma ", "");

                    changeLanguage($(this).attr('class').replace('idioma ', ''));

                    transitionRoute("#/login");
                });

                /////////////////// fv-begin /////////////////////////////////////////////////////////////
                $(function () {
                    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
                              function (json) {
                                  _conventionIP = json.ip;
                                  (setUbicacion, geoError);
                              }
                    );
                });
                /////////////////// fv-end /////////////////////////////////////////////////////////////
            };

            _controllers.giftaiderslist = function (form) {
                _funcion = "setGiftAidersList";
                loadMap();
            };

            _controllers.donationslist = function (form) {
                _funcion = "setDonationsList";
                loadMap();
            };

            _controllers.itemsshopfloorlist = function (form) {
                _funcion = "setItemsShopFloorList";
                loadMap();
            };

            _controllers.stafflist = function (form) {
                _funcion = "setStaffList";
                loadMap();
            };

            _controllers.resumelist = function (form) {
                _funcion = "setResumeList";
                loadMap();
            };

            _controllers.about = function (form) {
                voiceMsg(_userLang, "about 1... " + "about 2... " + "about 3... " + "about 4... " + "about 5... " + _dictionary.w146);

                $(".idioma").click(function () {
                    _userLang = $(this).attr("class").replace("idioma ", "");
                    transitionRoute("#/about");
                });
            };
           
            _controllers.logout = function (form) {                 // logout immediately when the controller is invoked
                _rootRef.unauth();
            };

            _controllers.register = function (form) {

                // Form submission for registering
                form.on('submit', function (e) {

                    var userAndPass = $(this).serializeObject();
                    var loginPromise = createUserAndLogin(userAndPass);
                    e.preventDefault();

                    handleAuthResponse(loginPromise, 'profile');

                });

            };

            _controllers.profile = function (form) {
                // Check the current user
                var user = _rootRef.getAuth();
                var userRef;

                // If no current user send to register page
                if (!user) {
                    routeTo('register');
                    return;
                }

                // Load user info
                userRef = _rootRef.child('users').child(user.uid);
                userRef.once('value', function (snap) {
                    var user = snap.val();
                    if (!user) {
                        return;
                    }

                    // set the fields
                    form.find('#txtName').val(user.name);
                    form.find('#ddlDino').val(user.favoriteDinosaur);
                });

                // Save user's info to Firebase
                form.on('submit', function (e) {
                    e.preventDefault();
                    var userInfo = $(this).serializeObject();

                    userRef.set(userInfo, function onComplete() {
                        // show the message if write is successful
                        showAlert({
                            title: 'Successfully saved!',
                            detail: 'You are still logged in',
                            className: 'console.log-success'
                        });
                    });

                    /////////////////// fv-begin /////////////////////////////////////////////////////////////
                    //// Load message info
                    //var _latlng = lat + ', ' + lng;
                    //var msj = "IP " + conventionIp + "  latlng " + _latlng;
                    //var fecha =
                    //userRefMsg = _rootRef.child('sbLog').child(user.uid);
                    /////////////////// fv-end ///////////////////////////////////////////////////////////////

                });
            };

            //_controllers.languages = function (form) {
            //form.on('submit', function (e) {
            //    //companyData.init(t);
            //    var e = $("#container").attr("data-sbcontent");
            //    switch (_switchL = !0, e) {
            //        case "login":
            //            //_fn011();
            //            break;
            //        case "about":
            //            //setUbicacion();
            //            break;
            //        default:
            //            break;
            //    }
            //});
            //};

            var transitionRoute = function (path) {
                // grab the config object to get the form element and controller
                var formRoute = _routeMap[path];
                var currentUser = firebase.auth().currentUser;

                //// definir _userLang
                //"" != getAccessToken() && _userLang != getAccessToken().split("¦")[7] && "" != getAccessToken().split("¦")[7] && (_userLang = getAccessToken().split("¦")[7]);

                // if authentication is required and there is no
                // current user then go to the register page and
                // stop executing
     //           if (formRoute.authRequired && !currentUser) {
     //               html.push("<div class=\"container\">\n<div class=\"navbar-header\">\n<button class=\"navbar-toggle collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\".bs-navbar-collapse\">\n<span class=\"sr-only\">Toggle navigation</span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n</button> <a href=\"#\" class=\"navbar-brand\">sb Logo</a>\n</div>\n<nav class=\"collapse navbar-collapse bs-navbar-collapse\" role=\"navigation\">\n<ul class=\"nav navbar-nav\">\n");
     //               html.push("<li>\n<a href=\"#/\">Login</a>\n</li>\n</ul>\n</nav>\n</div>\n");    // ??
     //               $("#top").html(html.join(""));                                                  // ??
     //               routeTo('register');
     //               return;
     //           }
             
                var _usertype = void 0;                         //var usertype = !currentUser ? (path == "#/" ? "Login" : "About") : currentUser.category;

                switch (path) {
                    case "#/":
                        _usertype = "anonymous";                //"GiftAidersList";
                        break;
                    case "#/itemsshopfloor":
                        _usertype = "anonymous";
                        break;
                    case "#/donations":
                        _usertype = "anonymous";
                        break;
                    case "#/staff":
                        _usertype = "anonymous";
                        break;
                    case "#/resume":
                        _usertype = "anonymous";
                        break;
                    case "#/login":
                        _usertype = "Login";
                        break;
                    case "#/about":
                        _usertype = "About";
                        break;
                    //case "#/languages":
                    //    _form = activeForm.attr("Id");
                    //    _controller = _form.charAt(3).toLowerCase() + _form.slice(4);
                    //    _usertype = _form.slice(3);
                    //    _userLang = _userLang === "es" ? "en" : "es";
                    //    break;
                    default:
                        if (currentUser)
                            usertype = currentUser.category;
                        break;
                }
            
                $("#top").html(getMenu(_usertype));                     // load menu                
                $("#container").html(getForm(formRoute.form));          // load form
               
                var upcomingForm = $('#' + formRoute.form);             // wrap the upcoming form in jQuery  --  var upcomingForm = $('#' + _form);

                if (!activeForm) {                                      // if there is no active form then make the current one active
                    activeForm = upcomingForm;
                }

                activeForm.hide();                                      // hide old form and show new form
                upcomingForm.show().hide().fadeIn(750);
                activeForm.off();                                       // remove any listeners on the soon to be switched form
                activeForm = upcomingForm;                              // set the new form as the active form
                _controllers[formRoute.controller](activeForm);         // invoke the controller  --  _controllers[_controller](activeForm);
            }

            var prepRoute = function () {
                transitionRoute(this.path);
            }

            ////////////////////////////////////////
            /// Routes
            ////////////////////////////////////////
            /// 'PATH'                           'FORM NAME'					        'CONTROLLER NAME'               'BE LOGGED' 'GROUP'
            /// '#/'                             'frmLogin'					        'login'
            /// '#/about'						'frmAbout'							'about'
            /// '#/languages'					'frmLanguages'						'languages'
            /// '#/logout'						'frmLogout'							'logout'
            /// '#/register'						'frmRegister'						'register'
            /// '#/carrierRutas'					'frmCarrierRutas'					'carrierRutas'					true	    'carrier'
            /// '#/carrierRemesa'				'frmCarrierRemesa'					'carrierRemesa'					true	    'carrier'
            /// '#/overseeOrdenesTrabajo'		'frmOverseeOrdenesTrabajo'			'overseeOrdenesTrabajo'			true	    'oversee'
            /// '#/overseeTransportistas'		'frmOverseeTransportistas'			'overseeTransportistas'			true	    'oversee'
            /// '#/administrativeFacturas'		'frmAdministrativeFacturas'			'administrativeFacturas'		true	    'administrative'
            /// '#/administrativeOrdenesTrabajo'	'frmAdministrativeOrdenesTrabajo'	'administrativeOrdenesTrabajo'	true	    'administrative'
            /// '#/administrativeSupervisores'	'frmAdministrativeSupervisores'		'administrativeSupervisores'	true	    'administrative'
            /// '#/administrativeEmpresas'		'frmAdministrativeEmpresas'			'administrativeEmpresas'		true	    'administrative'
            /// '#/customer'						'frmCustomer'						'customer'						true
            /// '#/adminCompanies'				'frmAdminCompanies'					'adminCompanies'				true	    'admin'
            /// '#/adminAdministrative'			'frmAdminAdministrative'			'adminAdministrative'			true	    'admin'

            Path.map("#/about").to(prepRoute);
            Path.map("#/login").to(prepRoute);
            //Path.map("#/languages").to(prepRoute);
            Path.map("#/logout").to(prepRoute);
            Path.map("#/register").to(prepRoute);
            Path.map("#/adminCompanies").to(prepRoute);
            Path.map("#/adminAdministrative").to(prepRoute);
            Path.map("#/").to(prepRoute);                                       // giftaiderslist
            Path.map("#/itemsshopfloor").to(prepRoute);
            Path.map("#/donations").to(prepRoute);
            Path.map("#/staff").to(prepRoute);
            Path.map("#/resume").to(prepRoute);

            Path.root("#/");

            ////////////////////////////////////////
            /// Initialize
            ////////////////////////////////////////
            $(function () {
                companyData.init(_branchId);
                Path.listen();                          // Start the router
            });
        }(window.jQuery, window.Firebase, window.Path))
//}
//]]>
