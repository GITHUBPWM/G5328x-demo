// "New Butterfat internationalization" (b28new.js)
//  Released under the MIT License
//	versions 3.0.0
//	$Id: b28new.js 2014-12-23 ETw $
/***********************************************************************************************
 ************************************************************************************************/

(function (window, document) {

	//定义保存翻译的字典和配置
	var MSG = {},//保存翻译的字典，（翻译文件下载然后进行格式转换后的内容（翻译字段的键值对）就放在这里）
		b28Cfg = {},//翻译配置对象，配置一些支持的语言、语言包类型、默认语言、是否用默认语言作为翻译语言(key)等。
		dateObj = new Date();//时间字符串，获取翻译路径的时候加在url后面

	MSG.extend = function (obj) {
		var name;
		for (name in obj) {
			if (obj.hasOwnProperty(name)) {
				MSG[name] = obj[name];
			}
		}
	};
	// var configLang = CONFIG_MULTI_LANGUAGE_SORFWARE;
	// var lang = configLang.split(",");
	/*********翻译配置***********/
	//配置翻译支持的所有语言，如果不支持某种语言，则以默认语言显示
	//使用前请添加所有已支持的语言到此数组中
    //ppppppppppppppppppppppppppp var configLang = top.CONFIG_MULTI_LANGUAGE_SORFWARE;

  if(document.cookie.indexOf("supportLang=")!==-1){
        let start = document.cookie.indexOf("supportLang=")+12;
        let end = (document.cookie.indexOf(';', start) !== -1) ? document.cookie.indexOf(';', start) : document.cookie.length;
        //如果是第一个cookie字段的话，后面的'；'是加不上去的，所以要区分
        b28Cfg.supportLang = document.cookie.substring(start, end).split(",");
  }else{
    b28Cfg.supportLang = [];
  }

  function setSupportLang(langStr) {
    //如果cookie没有supportLang才进行设置，有的话就则不进行任何操作。
    if ((document.cookie.indexOf("supportLang=")) === -1) {
      document.cookie = "supportLang=" + langStr +";";
      window.location.reload();
    }
  }

  // b28Cfg.supportLang = ["en","cn","zh","tr","de","ko","fr","hu","it","pl","ro","ru","pt-BR","cs","pt","es","es-419","uk","nl"];
	b28Cfg.defaultLang = 'en';
	//配置语言包文件类型 within ["xml", "json"]
	b28Cfg.fileType = "json";

	//用默认语言做id（即用节点上的显示文字来匹配语言包），此种情况要求语言和翻译之间关系是一对一，
	//否则有翻译错误。如果无法满足一一映射，可在语言包中添加额外字段映射到不同的翻译上，
	//并在要翻译的冲突节点上加上data-lang属性，然后把data-lang赋值为新添加的字段名称
	b28Cfg.idDefaultLang = true;

	//是否对要翻译文字进行trim
	b28Cfg.trimText = true;

	//默认替换节点中的文字，将其设为true可插入html
	b28Cfg.insertHTML = true;

	//是否初始化下拉框
	b28Cfg.initSelect = true;

	//时间字符串
	b28Cfg.dateStr = dateObj.getDay() + "" + dateObj.getHours() + "" + dateObj.getMinutes();


	if (b28Cfg.idDefaultLang && (',' + b28Cfg.supportLang.join(',') + ',').indexOf(b28Cfg.defaultLang) === -1) {
		b28Cfg.supportLang.push(b28Cfg.defaultLang);
	}

	var win = window,
		doc = document,
		core_version = "3.0.0",
		core_trim = core_version.trim,

		//获取语言文件相对路径(localhost8080啥啥的)
		js = document.scripts,
		langPath = js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/")+1)+'static/lang/',

		// JSON RegExp
		rvalidchars = /^[\],:{}\s]*$/,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

		// 语言包文件是否加载完成标志
		b28Loaded = false,

		// Define until function
		domReady, loadScript, ajaxLoadScript, loadJSON, loadXML, innerText, trim, _trim, parseJSON, createXHR,

		// Define a local copy of Butterlate
		Butterlate;

	trim = core_trim && !core_trim.call("\uFEFF\xA0") ?
		function (text) {
			return text == null ?
				"" :
				core_trim.call(text);
		} :
		// Otherwise use our own trimming function
		function (text) {
			if(text == null) {
				return "";
			} else {
				text += "";
			}
			var str = text.replace(/^\s+/, ""),
				end = str.length - 1,
				ws = /\s/;

			while (ws.test(str.charAt(end))) {
				end--;
			}
			return str.slice(0, end + 1);
		};

	_trim = function (str) {
		if(b28Cfg.trimText) {
			return trim(str)
		} else {
			return str;
		}
	};

	parseJSON = function (data) {
		if (window.JSON && window.JSON.parse) {
			return window.JSON.parse(data);
		}
		if (data === null) {
			return data;
		}

		if (typeof data === "string") {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = trim(data);

			if (data) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if (rvalidchars.test(data.replace(rvalidescape, "@")
						.replace(rvalidtokens, "]")
						.replace(rvalidbraces, ""))) {

					return (new Function("return " + data))();
				}
			}
		}
	}

	createXHR = function () {
		try {
			//return function() {
					return new XMLHttpRequest();
			//}
		} catch (e1) {
			try {
				//return function() {
					return new ActiveXObject("Msxml2.XMLHTTP");
				//}
			} catch (e2) {
				try {
					//return function() {
						return new ActiveXObject("Microsoft.XMLHTTP");
					//}
				} catch (e3) {
					return;
				}
			}
		}
	}

	innerText = (function () {
		if(b28Cfg.insertHTML) {
			return function(elem, str) {
				if(str) {
					elem.innerHTML = str;
					return elem;
				}
			}
		}

		var element = doc.createElement('p');
		element.innerHTML = core_version;
		return element.textContent ? function (elem, str) {
			if (str) {
				elem.textContent = str;
				return elem;
			}
			return elem.textContent;

		} : function (elem, str) {
			if (str) {
				elem.innerText = str;
				return elem;
			}
			return elem.innerText;
		};
	}());

	function assertElement(elem) {
		//支持HTMLElement
		if(typeof HTMLElement === 'object' && elem instanceof HTMLElement) {
			return true;
		}
		//ie等
		if(typeof elem === 'object' && (elem.nodeType === 1 || elem.nodeType === 9) &&
				typeof elem.nodeName === 'string') {
			return true;
		}
		return false;
	}

	function transTitle() {
		doc.title = Butterlate.gettext(_trim(doc.title));
	}

	function replaceTextNodeValue(element) {
		if (!element) {
			return;
		}
		var firstChild = element.firstChild,
			nextSibling = element.nextSibling,
			nodeType = element.nodeType,
			btnStr = "submit,reset,button",
			curValue, isInputButton;

		//handle element node
		if (nodeType === 1) {

			// Hander elements common attribute need to replace
			curValue = element.getAttribute("alt");
			if (curValue && /\S/.test(curValue)) {
				curValue = _trim(curValue);
				element.setAttribute("alt", Butterlate.gettext(curValue));
			}
			curValue = element.getAttribute("placeholder");
			if (curValue && /\S/.test(curValue)) {
				curValue = _trim(curValue);
				element.setAttribute("placeholder", Butterlate.gettext(curValue));
			}
			curValue = element.getAttribute("title");
			if (curValue && /\S/.test(curValue)) {
				curValue = _trim(curValue);
				element.setAttribute("title", Butterlate.gettext(curValue));
			}

			isInputButton = element.nodeName.toLowerCase() == "input" &&
						(btnStr.indexOf(element.getAttribute("type")) !== -1);
			if (isInputButton) {

				//data-lang属性具有较高优先级
				curValue = element.getAttribute("data-lang") || element.value;
			} else {
				curValue = element.getAttribute("data-lang");
			}

			if (curValue &&	/\S/.test(curValue)) {
				curValue = _trim(curValue);
				if (curValue) {
					if (isInputButton) {
						element.setAttribute("value", Butterlate.gettext(curValue));
					} else {
						innerText(element, Butterlate.gettext(curValue));
					}
				}
			}

		//handle textNode
		} else if (nodeType === 3 && /\S/.test(element.nodeValue)) {
			curValue = _trim(element.nodeValue);
			element.nodeValue = Butterlate.gettext(curValue);
		}
		//translate siblings
		if (nextSibling) {
			replaceTextNodeValue(nextSibling);
		}

		//translate firstChild
		//stop handle elem.child if elem has attr data-lang
		if(firstChild && !element.getAttribute("data-lang")) {
			replaceTextNodeValue(firstChild);
		}
	}

//(把传过来的这些方法全部添加到document上)(初始化语言选择下拉框 和 翻译页面）
	domReady = (function () {
		var funcs = [],
			already = false,
			len,
			i;

		function handler(e) {
			e = e || win.event;
			if (already) {
				return;
			}

			if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
				return;
			}

			for (i = 0, len = funcs.length; i < len; i++) {
				funcs[i].call(doc);
			}

			already = true;
			funcs = null;
		}

		if (doc.addEventListener) {
			doc.addEventListener("DOMContentLoaded", handler, false);
			doc.addEventListener("onreadystatechange", handler, false);
			win.addEventListener("load", handler, false);
		} else if (doc.attachEvent) {
			doc.attachEvent('onreadystatechange', handler);
			win.attachEvent('onload', handler);
		}

		// return ready() function
		return function ready(f) {
			if (already) {
				f.call(doc);
			} else {
				funcs.push(f);
			}
		};
	}());

	loadScript = (function () {
		var scripts = doc.createElement("script"),
			hasReadyState = scripts.readyState;

		return hasReadyState ? function (url, callBack) {
			var scripts = doc.createElement("script");

			scripts.onreadystatechange = function () {
				if (scripts.readyState === 'loaded' ||
					scripts.readyState === 'complete') {
					scripts.onreadystatechange = null;

					if (typeof callBack === "function") {
						callBack();
						callBack = null;
					}
				}
			};
			scripts.src = url;
			doc.getElementsByTagName("head")[0].appendChild(scripts);

		} : function (url, callBack) {
			var scripts = doc.createElement("script");

			scripts.onload = function () {
				if (typeof callBack === "function") {
					callBack();
					callBack = null;
				}
			};
			scripts.src = url;
			doc.getElementsByTagName("head")[0].appendChild(scripts);
		};
	})();

	loadJSON = function (url, callBack) {
		var request = createXHR();
		request.open("GET", url + "?" + Math.random(), false);//url是http://localhost:8080/static/lang/cn/translate.json这种
		//request.setRequestHeader("If-Modified-Since", "1");
		//request.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
		request.send(null);

		if (request.status >= 200 && request.status < 300 || request.status === 304) {
			MSG.extend(parseJSON(request.responseText));

			if (typeof callBack === "function") {
				callBack();
				callBack = null;
			}
		}
	}
	loadXML = function (url, callBack) {
		var request,
			i,
			pos,
			posLen;

		request = createXHR();
		request.open("GET", url + "?" + Math.random(), false);
		//request.setRequestHeader("If-Modified-Since", "1");
		request.send(null);

		if (request.status >= 200 && request.status < 300 || request.status === 304) {
			pos = request.responseXML.documentElement.getElementsByTagName("message");
			posLen = pos.length;
			for (i = 0; i < posLen; i++) {
				MSG[pos[i].getAttribute("msgid")] = pos[i].getAttribute("msgstr");
			}

			if (typeof callBack === "function") {
				callBack();
				callBack = null;
			}
		}
	}

	function Butterlation() {
		this.curDomain = 0;
		this.domainArr = [];
		this.options = {
			"defaultLang": b28Cfg.defaultLang,
			"support": b28Cfg.supportLang,
			"fileType": b28Cfg.fileType
		};
		this.isSupport = function (lang) {
			var support = this.options.support,
				len = support.length,
				i;

			for (i = 0; i < len; i++) {
				if (lang === support[i]) {
					return support[i];
				}
			}
		};
		this.setLang = function (lang) {

			if (lang !== undefined) {

				if (!this.isSupport(lang)) {
					lang = this.options.defaultLang;
				}
				doc.cookie = "bLanguage=" + lang + ";";
			}
			return lang;
		};

		this.getLang = function () {
			var special = {
					"zh": "cn",
					"zh-chs": "cn",
					"zh-cn": "cn",
					"zh-cht": "cn",
					"zh-hk": "zh",
					"zh-mo": "zh",
					"zh-tw": "zh",
					"zh-sg": "zh",
					"es-419":"laes",
          "pt-br":"brpt"
				},//用来匹配浏览器支持的语言（浏览器上支持的语言名称和翻译包配置的不一样，所以要转换一下）
				defLang = this.options.defaultLang,
				local, ret, start, end;

			if ((doc.cookie.indexOf("bLanguage=")) === -1) {
				local = (win.navigator.language || win.navigator.userLanguage ||
					win.navigator.browserLanguage || win.navigator.systemLanguage || defLang).toLowerCase();

				ret = special[local] || local.split("-")[0].toString();
			} else {
				if (doc.cookie.indexOf("bLanguage=") === 0) {
					start = 10;

					//incase there has cookie like: **bLanguage=cn
				} else if (doc.cookie.indexOf("; bLanguage=") !== -1) {
					start = doc.cookie.indexOf("; bLanguage=") + 12;
				}

				if (start !== undefined) {
					end = (doc.cookie.indexOf(';', start) !== -1) ?
						doc.cookie.indexOf(';', start) : doc.cookie.length;
					ret = doc.cookie.substring(start, end);
				}
			}

			return this.isSupport(ret) || this.options.defaultLang;
		};
		this.getURL = function (domain) {
			return langPath + this.lang + "/" + domain + "." + this.options.fileType + "?" + b28Cfg.dateStr;
		};

		this.setTextDomain = function (domain, lang, callBack) {
			var i, domainLen, htmlElem = doc.documentElement;

			//Hander lang is undefined
			this.lang = lang || this.getLang();//如果没有传lang值过来，就去cookie里找，
      // 如果cookie里没有（第一次访问网站），就去获取浏览器的默认语言。
			this.setLang(lang);//把cookie里的blanguage设置为lang
			this.curDomain = 0;
			if (typeof callBack === "function") {
				this.success = callBack;
			}

			htmlElem.style.display = "none";
			if(this.lang == "cn"){
                htmlElem.className = htmlElem.className + " lang-" + this.lang;
            } else if(this.lang == "zh" ){
                htmlElem.className = htmlElem.className + " lang-" + this.lang;
            } else {
                htmlElem.className = htmlElem.className + " lang-en";
            }
			if (Object.prototype.toString.call(domain) === "[object Array]") {
				domainLen = domain.length;
				this.domainArr = domain;
				for (i = 0; i < domainLen; i = i + 1) {
					this.po = this.getURL(domain[i]);
					this.loadDomain(this.po, i);
				}
			}
			else if (typeof domain === "string") {
				this.domainArr.push(domain);
				this.po = this.getURL(domain);
				this.loadDomain(this.po, 0);
			}
		};

		this.loadDomain = function (url) {
			if (b28Cfg.idDefaultLang && this.lang === b28Cfg.defaultLang) {
				b28Loaded = true;
				b28Cfg.initSelect && domReady(Butterlate.initSelectElem);
				doc.documentElement.style.display = '';
				if (typeof Butterlate.success === "function") {
					Butterlate.success();
				}
			} else {
				if(this.options.fileType === "json") {
					loadJSON(url, this.loadedDict);
				} else if(this.options.fileType === "xml") {
					loadXML(url, this.loadedDict);
				}
			}
		};
		this.loadedDict = function () {
			var len = Butterlate.domainArr.length;
			if (Butterlate.curDomain + 1 === len) {
				b28Loaded = true;
				domReady(Butterlate.translatePage);
			} else {
				Butterlate.curDomain += 1;
			}
		};
		this.isLoaded = function () {
			return b28Loaded;
		};
		this.gettext = function (key) {
			return MSG[key] !== undefined ? MSG[key] : key;
		};
		//翻译jS里的文本 :  _()
		this.getFormatText = function (key, replacements) {
			var nkey = this.gettext(key),
				index,
				count = 0;
			if(!replacements) {
				return nkey;
			}
			if (replacements instanceof Array && replacements.length !== 0) {
				while ((index = nkey.indexOf('%s')) !== -1) {
					nkey = nkey.slice(0, index) + replacements[count] +
						nkey.slice(index + 2);
					count = ((count + 1) === replacements.length) ? count : (count + 1);
				}
			} else if (typeof replacements === "string") {
				index = nkey.indexOf('%s');
				nkey = nkey.slice(0, index) + replacements + nkey.slice(index + 2);
			}
			return nkey;
		};
		//初始化语言选择下拉框
		this.initSelectElem = function () {

			var selectElem = doc.getElementById('select-lang'),
				len = b28Cfg.supportLang.length,
				newOption, lang, i;

			if (selectElem && selectElem.nodeName.toLowerCase() == "select") {
				for (i = 0; i < len; i++) {
					lang = b28Cfg.supportLang[i];
					newOption = new Option(Butterlate.langArr[lang], lang);
					selectElem.add(newOption, undefined);
				}
				selectElem.value = Butterlate.lang;

				if (doc.addEventListener) {
					selectElem.addEventListener("change", function () {
						Butterlate.setLang(doc.getElementById('select-lang').value);
						setTimeout(function () {
							window.location.reload();
						}, 24);
					}, false);

				} else if (doc.attachEvent) {
					selectElem.attachEvent('onchange', function () {
						Butterlate.setLang(doc.getElementById('select-lang').value);
						setTimeout(function () {
							window.location.reload();
						}, 24);
					});
				}

			}
		}
		this.translate = function (translateTarget) {
			var translateElem;

			if(assertElement(translateTarget)) {
				translateElem = translateTarget;
			} else if(translateTarget && typeof translateTarget === 'string') {
				translateElem = doc.getElementById(translateTarget);
			}
			translateElem = translateElem || doc.documentElement;

			//hidepage before translate
			doc.documentElement.style.display = 'none';

			replaceTextNodeValue(translateElem);

			//show page when translate complete
			doc.documentElement.style.display = '';

			if (typeof Butterlate.success === "function") {
				Butterlate.success();
			}
		};
		this.translatePage = function () {

			var bodyElem = doc.body || doc.documentElement;

			// 翻译HTML页面内容
			transTitle();

			// 初始语言选择下拉框
			b28Cfg.initSelect && Butterlate.initSelectElem();

			Butterlate.translate(bodyElem);

		};
	}

	Butterlate = new Butterlation();

	Butterlate.langArr = {
		"cn": "简体中文",
		"zh": "繁體中文",
		"de": "Deutsch", //德语
		"en": "English", //英语
    "es":"Español",//欧西
    "laes":"Esp. (Amér. Lat.)",//美西
    "nl":"Nederlands",//荷兰语
    "ko":" 한국어",//韩语
		"fr": "Français", //法国
		"hu": "Magyar", //匈牙利
		"it": "Italiano", //意大利
		"pl": "Polski", //波兰
		"ro": "Română", //罗马尼亚
		"tr": "Türkçe", //土耳其
		"ru": "Русский", //Russian	俄语
    "brpt": "Port. (Amér.Lat.)", // 巴葡
    "pt": "Português", // 欧葡
    "cs": "Čeština",//捷克语
    "uk":"Українська"//乌克兰语
	};

	//for debug use
	Butterlate.getMsg = function() {
		return MSG;
	}

	Butterlate.setMsg = function(obj) {
		return MSG.extend(obj);
	}
	//print pure translate json data
	Butterlate.exportPureJsonData = function() {
		for(attribute in Butterlate.getMsg()) {
			if(typeof MSG[attribute] !== 'function'){
				console.log('"' + attribute + '":"' + MSG[attribute] + '",');
			}
		}
	};

	//Export to window
	win.Butterlate = Butterlate;
	win.B = win.B || win.Butterlate;
	win._ = function (key, replacements) {
		return Butterlate.getFormatText(key, replacements);
	};
	win.Butterlate.loadScript = loadScript;
  win.setSupportLang = setSupportLang;
}(window, document));
