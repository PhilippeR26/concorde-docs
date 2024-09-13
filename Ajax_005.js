/***************************************
*                Ajax.js.              *
*   Copyright 2007 Maido Production    *
*       http://www.maido-prod.com      *
*     Compatible : IE7/FF			   *
***************************************/

	function LoadenvoiRequeteAjax(url,zone_tmp,couleur_fond) {
			AfficheInnerHTML("<table width='100%' height='100%' bgcolor='"+couleur_fond+"'><tr><td align='center' valign='middle'><img src='loading_006.gif' border='0'></td></tr></table>",zone_tmp)
			setTimeout("envoiRequeteAjax('"+url+"','"+zone_tmp+"')", 500);
	}

  function envoiRequeteAjax(url,zone_tmp) {

        var httpRequest = false;


        if (window.XMLHttpRequest) { 
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/html');
                    }
        }
        else if (window.ActiveXObject) { 
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
				httpRequest.setRequestHeader('charset','iso-8859-1'); 
            }
            catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
					
                }
                catch (e) {}
            }
        }

        if (!httpRequest) {
           return false;
        }
		
        httpRequest.onreadystatechange = function() { AfficheResultatAjax(httpRequest,zone_tmp); };
        httpRequest.open('POST', url, true);
		httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=iso-8859-1'); 

        httpRequest.send(null);

    }


    function AfficheResultatAjax(httpRequest,zone_tmp) {
		AfficheInnerHTML("",zone_tmp);
        if (httpRequest.readyState == 4) {
			if (httpRequest.status == 200) {
				 AfficheInnerHTML(httpRequest.responseText,zone_tmp)
			}
        }
    }


	function AfficheInnerHTML(contenu_tmp,zone_tmp) {
		if (document.getElementById) {
		
		content=document.getElementById(zone_tmp);
		}
		else {
			if (document.all) {
			content=document.all[zone_tmp];
			}
		}
		content.innerHTML  = contenu_tmp ; 
	}