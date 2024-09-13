/***************************************
*                Menu.js.              *
*   Copyright 2004 Maido Production    *
*       http://www.maido-prod.com      *
*     Compatible : Ie5,Ns4,Ns6,Opera   *
***************************************/

/*---------------les layer s'appelle toujour "menu"+numero de menu----------------*/
/*------------------------les numero de menu commence a 1-------------------------*/
/*---------------les td des ss menu s'appelle toujour "ssmenu"+numero de ssmenu----------------*/
/*---------------------les numero de ssmenu commence a 1 et se suivent------------------------*/
//var tab=new Array();
/*tableau du nombre de souscategorie par menu , l'index du tableau = numero du menu*/
//tab[1]=3;
//tab[2]=1;

//var largeur_menu="150";
//var hauteur_menu="77";
//var decalageMenuTop=0; //Inutile
//var decalageMenuLeft=0; //Inutile
//var taille_ligne_tableau=25;
//var couleur_de_fond="#FF00FF";
//var couleur_de_rollover="#FFFFFF"

//Variable globale
var X=0;
var Y=0;
//le flag permet de savoir quand la souris est encore sur le menu flottant (pour ne pas le fermer) : 0=faux, 1=vrai
var flag_menu="0";
var nav=cherchenav();


var mnuAtionOpen=new Array()

function ActivemnuAtionOpen(num_menu){
for (i=1; i < tab.length; ++i){
if (i==num_menu){mnuAtionOpen[i]=true}else{mnuAtionOpen[i]=false}
}
}



//gestion des fondus de menu
var timer = 0;
var iOpacity = 0;
function FadeInOn(id) {
iOpacity = 0
if (timer == 0 && timer_menu_fade>0) {
timer = setInterval("FadeIn('"+id+"')", timer_menu_fade);
}
}
function CancelFade() {
if (timer == 0) return;
clearInterval(timer);
timer = 0;
}
function FadeIn(id) {
var elem = document.getElementById(id);
if (elem){
	iOpacity += 1;
	elem.style.opacity = iOpacity/10;
	elem.style.MozOpacity = iOpacity/10;
	elem.style.KhtmlOpacity = iOpacity/10;
	elem.style.filter = "alpha(opacity=" + iOpacity * 10 + ")";
	if (iOpacity>=10){CancelFade()}
}
}
function FadeOff(id) {
if (timer_menu_fade>0) {
var elem = document.getElementById(id);
if (elem){
	CancelFade()
	elem.style.opacity = 0;
	elem.style.MozOpacity = 0;
	elem.style.KhtmlOpacity = 0;
	elem.style.filter = "alpha(opacity=0)";
}
}
}
//gestion des fondus de menu




//Initailisation des evenements  pour nescape 4 et 6 :
//   - mouvement de la souris
//   - mouvement de la mouseover et mouse out sur le menu flottant
function init_menu()
{
	var i=0;
	if (nav=="ns4")
	{ 
		document.captureEvents(Event.MOUSEMOVE);
		document.onmousemove = souris_ns;
		for (i=1; i < tab.length; ++i)
		{
			document.layers["menu"+i].captureEvents(Event.MOUSEOVER);
			document.layers["menu"+i].onmouseover = flagActif;
			
			document.layers["menu"+i].captureEvents(Event.MOUSEOUT);
			document.layers["menu"+i].onmouseout = flagInactif_ns4;
		}
	}
	else
	{
		if (nav=="ns6")
		{
		window.addEventListener('mousemove',souris_ns,false);
		}
		
	}
	if (nav=="ie4")
	{
	var Elem=document.getElementsByTagName('body')//
	Elem.onmousemove=sourie_ie();
	}
}	


//fonction de recherche du navigateur	
function cherchenav()
{
	var nav;
	var ns4=document.layers;
	var ie4=document.all;
	var ns6=document.getElementById&&!document.all;
	var op = window.opera;
	if (ns6) 
	{ 
	  // Navigateur Netscape 5 et plus et DOM-1.
	 nav="ns6";
	} 
	else if (ns4) 
	{ 
	  // Navigateur Netscape 4.7 et moins. 
	 nav="ns4";
	} 
	else if (op) 
	{
	nav="opera";
	}
	else if (ie4) 
	{ 
	  // Internet Explorer et Opera
	 nav="ie4";
	}	
	return nav;
}




//fonction de recuperation des coordonne de la souris pour ie et opera
function sourie_ie()
{ 
	try
	{
		if (nav=="ie4" || nav=="opera")
		{
			X=window.event.clientX;
			Y=window.event.clientY;
		}
	}
	catch (ex){}
}




//fonction de recuperation des coordonne de la souris pour ns4 et ns6
function souris_ns(e) //pour Netscape
{
	try
	{
		if (nav=="ns6")
		{
			X=e.clientX;
			Y=e.clientY;
		}
		else
		{
			X=e.x;
			Y=e.y;
		}
	}
	catch (ex){}
}


function flagActif(e)
{
	flag_menu="1";
}

//fonction de gestion du flag_menu sous ns4
function flagInactif_ns4()
{
	var menu_actif;
	flag_menu="0";
	menu_actif=this.id;
	menu_actif=menu_actif.replace("menu", "");
	PauseEffaceMenu(menu_actif);
}	

//fonction de gestion du flag_menu sous ie, opera,ns6
function flagInactif(num_menu)
{
	if (nav=="ie4" || nav=="opera"|| nav=="ns6")
	{
		flag_menu="0";
		//document.formul.flag.value=flag_menu;
		PauseEffaceMenu(num_menu);
	}
}


//fonction de positionnement du menu flottant suivant la largeur de la fenetre et la position de la souris
function positionneLayer(num_menu)
{ 
	var menu;
	var largeur_page=window.innerWidth;
	var decalage=5;
	if (nav=="ie4" || nav=="opera")
	{
		if (nav=="ie4")
		{
			largeur_page=document.body.clientWidth;
		}
		menu=eval("document.all.menu"+num_menu);
		menu.style.pixelTop=window.document.body.scrollTop+Y+decalage;
		if (X<(largeur_page-largeur_menu))
		{
			menu.style.pixelLeft=X+decalage;
		}
		else
		{
			menu.style.pixelLeft=(X-largeur_menu)-decalage;
		}

	}
	else
	{ 
		if (nav=="ns4")
		{
			menu=document.layers["menu"+num_menu];
			menu.y=window.scrollY+Y+decalage;
			if (X<(largeur_page-largeur_menu))
			{
				menu.x=X+decalage;
			}
			else
			{
				menu.x=(X-largeur_menu)-decalage;
			}

		}
		else
		{
			menu=document.getElementById("menu"+num_menu);
			menu.style.top=window.scrollY+Y+decalage;
			if (X<(largeur_page-largeur_menu))
			{
				menu.style.left=X+decalage;
			}
			else
			{
				menu.style.left=(X-largeur_menu)-decalage;
			}

		}
	}
}

//fonction de redimentionnement du menu suivant le nombre de sous categorie du menu
function redimentionne(num_menu)
{

hauteur_menu="100";
var menu;
if (nav=="ie4" || nav=="opera")
	{
	menu=eval("document.all.menu"+num_menu);
	menu.style.width =largeur_menu;
	menu.style.height =tab[num_menu]*taille_ligne_tableau;
	}
	else
	{
		if (nav=="ns4")
		{
			menu=document.layers["menu"+num_menu];
			menu.clip.width=largeur_menu;
			menu.clip.height=tab[num_menu]*taille_ligne_tableau+2;
		}
		else
		{
			menu=document.getElementById("menu"+num_menu);
			menu.width=largeur_menu;
			menu.height=tab[num_menu]*taille_ligne_tableau+2;
		}
	}

}





//fonction qui permet d'ajouter un delai d'attente avnt la fermeture du menu flottant
function PauseEffaceMenu(num_menu)
{
ActivemnuAtionOpen(-1);
setTimeout('EffaceMenu('+num_menu+')', 100) 
}

function EffaceMenu(num_menu)
{
	var menu;
	if (flag_menu=="0")
	{
		if (nav=="ie4" || nav=="opera")
		{
			
			menu=eval("document.all.menu"+num_menu);
			if (menu)
			{
				menu.style.visibility='hidden';
			}
		}
		else
		{
			if (nav=="ns4")
			{
				menu=document.layers["menu"+num_menu];
				menu.visibility = "hide";
			}
			else
			{
				menu=document.getElementById("menu"+num_menu);
				menu.style.visibility = "hidden";
			}
		}
	}
}


//fonction qui permet d'ajouter un delai d'attente avant l'ouverture du menu flottant
function PauseAfficheMenu(num_menu)
{
if (mnuAtionOpen[num_menu]!=true){
	ActivemnuAtionOpen(num_menu);
	setTimeout('AfficheMenu('+num_menu+')', 200) 
}
}


//fonction d'affichage du menu
function AfficheMenu(num_menu)
{	
var menu;
if (mnuAtionOpen[num_menu]==true && X>0 && Y>0){
if (nav=="ie4" || nav=="opera")
	{
	FadeOff("menu"+num_menu)
	redimentionne(num_menu);
	positionneLayer(num_menu);
	menu=eval("document.all.menu"+num_menu);
	menu.style.visibility='visible';
	menu.style.backgroundColor=couleur_de_fond;
	FadeInOn("menu"+num_menu)
	}
	else
	{
		if (nav=="ns4")
		{
			redimentionne(num_menu);
			positionneLayer(num_menu);
			menu=document.layers["menu"+num_menu];
			menu.visibility = "show";
			menu.bgColor=couleur_de_fond;
		}
		else
		{
			FadeOff("menu"+num_menu)
			redimentionne(num_menu);
			positionneLayer(num_menu);
			menu=document.getElementById("menu"+num_menu);
			menu.style.visibility='visible';
			menu.style.backgroundColor=couleur_de_fond;
			FadeInOn("menu"+num_menu)
		}
	}
}
}

//fonction de gestion des rollover sur les sous categorie (ne fonctionne pas pour ns4
function roll_ssmenu_over(num_ssmenu,test)
{	
	if (nav=="ie4" || nav=="opera")
	{
		ssmenu=eval("document.all.ssmenu"+num_ssmenu);
		ssmenu.style.backgroundColor=couleur_de_rollover;
	}
	if (nav=="ns6")
	{
		ssmenu=document.getElementById("ssmenu"+num_ssmenu);
		ssmenu.style.backgroundColor=couleur_de_rollover;
	}
}

//fonction de gestion des rollover sur les sous categorie (ne fonctionne pas pour ns4
function roll_ssmenu_out(num_ssmenu)
{	
	if (nav=="ie4" || nav=="opera")
	{
		ssmenu=eval("document.all.ssmenu"+num_ssmenu);
		ssmenu.style.backgroundColor=couleur_de_fond;
	}
	if (nav=="ns6")
	{
		ssmenu=document.getElementById("ssmenu"+num_ssmenu);
		ssmenu.style.backgroundColor=couleur_de_fond;
	}	
}

