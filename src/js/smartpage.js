
import Caver from 'caver-js';

let currentContext = 'Klaytn';

$(document).ready(function() 
{
    $('#blockchain-klaytn').on('click', () => {
        photoBlock.render('Klaytn', () => {
            console.log('PhotoBlock is ready for Klaytn blockchain');
            currentContext = 'Klaytn';
            setWelcomeText(currentContext);
        });
    });

    $('#blockchain-ethereum').on('click', () => {
        photoBlock.render('Ethereum', () => {
            console.log('PhotoBlock is ready for Ethereum blockchain');
            currentContext = 'Ethereum';
            setWelcomeText(currentContext);
        });
    });

    /*     BEGIN: PHOTOBLOCK INTEGRATION       */
    let photoBlockContainerId = "photoblock-container";
    let photoBlock = new PhotoBlock(photoBlockContainerId, { horizontal: true });
    photoBlock.registerContext(KlaytnContext);
    photoBlock.registerContext(EthereumContext);
    photoBlock.registerContext(BitcoinContext);
    photoBlock.registerContext(WebContext);

    photoBlock.on(PhotoBlock.eventTypes().HIDE, () => console.log('PhotoBlock modal was hidden'));
    photoBlock.on(PhotoBlock.eventTypes().LOAD, () => console.log('PhotoBlock photo was loaded'));
    photoBlock.on(PhotoBlock.eventTypes().SHOW, () => console.log('PhotoBlock modal was displayed'));
    photoBlock.on(PhotoBlock.eventTypes().NEW, () => console.log('New photo was loaded'));
    photoBlock.on(PhotoBlock.eventTypes().CREATE, () => console.log('PhotoBlock was created', account));

    //curl "https://baobab.klaytnwallet.com/api/faucet/?address=
    photoBlock.on(PhotoBlock.eventTypes().UPDATE, (account, callback) => 
    { 
        console.log('Account update requested.', account); 
        let html = '';
        let acct = null;
        let caver = new Caver('https://api.baobab.klaytn.net:8651/');
        acct = Object.values(account)[0]; 
        caver.klay.getBalance(acct).then((info) => {
            html =         
                    `
                    <div style="color:#ffffff;">
                    <div>Account Balance (KLAY):</div>
                    <div style="font-weight:100;font-size:60px;line-height:60px;margin:20px 0;text-align:center;">${parseFloat(caver.utils.fromPeb(info)).toFixed(4)}</div>
                    <div style="margin-top:40px;">Account Address: <a href="https://baobab.klaytnscope.com/account/${acct}" target="_blank" title="${acct}">${acct.substr(0, 6)}...${acct.substr(36,4)}</a> (Baobab)</div>
                    </div>
                    `; 
            callback(html);
        });
    });

    /*


    */
    photoBlock.on(PhotoBlock.eventTypes().LOCK, (account) => {
        $('#unauth-content,#auth-content').toggle();
        console.log('PhotoBlock was locked', account);
    }); 

    photoBlock.on(PhotoBlock.eventTypes().UNLOCK, (account) => {
        $('#unauth-content,#auth-content').toggle();
        console.log('PhotoBlock was unlocked', account);
        fetch(`https://baobab.klaytnwallet.com/api/faucet/?${account.address}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(JSON.stringify(data));
                });
    }); 
    
    photoBlock.render(currentContext, () => {
        console.log(`PhotoBlock is ready for ${currentContext} blockchain`);
        setWelcomeText(currentContext);
    });

        /*    render() method is called each time demo context changes in updateContexts()      */
        /*    END: PHOTOBLOCK INTEGRATION     */
    
    
	//if url has #no-right-panel set one panel demo
	if (window.location.hash.indexOf("no-right-panel") != -1)
	{
		$("#vvveb-builder").addClass("no-right-panel");
		$(".component-properties-tab").show();
		Vvveb.Components.componentPropertiesElement = "#left-panel .component-properties";
	} else
	{
		$(".component-properties-tab").hide();
	}

	Vvveb.Builder.init('themes/creative/index.html', function() {
		//run code after page/iframe is loaded
	});

	Vvveb.Gui.init();
	Vvveb.FileManager.init();
	Vvveb.FileManager.addPages(
	[
		{name:"creative", title:"Creative",  url: "themes/creative/index.html", assets: ['themes/css/creative.min.css']},
		{name:"landing", title:"Landing",  url: "themes/landing/index.html", assets: ['themes/landing/css/landing-page.min.css']},
		{name:"portfolio", title:"Portfolio",  url: "themes/portfolio/index.html", assets: ['themes/portfolio/css/freelancer.min.css']},
		{name:"product", title:"Product",  url: "themes/product/index.html", assets: ['themes/product/css/grayscale.min.css']},
		{name:"promotional", title:"Promotional",  url: "themes/promotional/index.html", assets: ['themes/promotional/css/new-age.min.css']},
		{name:"wildcard", title:"Wildcard",  url: "themes/wildcard/index.html", assets: ['themes/wildcard/css/one-pagee-wonder.min.css']},
		{name:"home", title:"Home",  url: "themes/home/index.html", assets: ['themes/home/css/agency.min.css']}
	]);
	
    Vvveb.FileManager.loadPage("creative");

    function setWelcomeText(blockchain) {
        $('#welcome').html('').append('<h1 style="font-size:48px;">Hello!</h1>');
        $('#welcome').append(`<h3 style="margin:30px;">SmartPage is ready for you on the ${blockchain} blockchain.</h3>`);
        $('#welcome').append('<img src="img/smartpage-square-white.svg" style="width:200px;margin:30px;" />');
        $('#welcome').append('<p>Sign in with PhotoBlock and start using SmartPage.</p>');

    }
        
});




