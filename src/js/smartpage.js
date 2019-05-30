

$(document).ready(function() 
{
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

	Vvveb.Builder.init('themees/creative/index.html', function() {
		//run code after page/iframe is loaded
	});

	Vvveb.Gui.init();
	Vvveb.FileManager.init();
	Vvveb.FileManager.addPages(
	[
		{name:"creative", title:"Creative",  url: "themes/creative/index.html", assets: ['themes/css/creative.min.css']},
		{name:"landing", title:"Landing",  url: "themes/landing/index.html", assets: ['themes/landing/css/landing-page.min.css']},
		//uncomment php code below and rename file to .php extension to load saved html files in the editor
		/*
		<?php 
		   $htmlFiles = glob("*.html");
		   foreach ($htmlFiles as $file) { 
			   if (in_array($file, array('new-page-blank-template.html', 'editor.html'))) continue;//skip template files
			   $pathInfo = pathinfo($file);
		?>
		{name:"<?php echo ucfirst($pathInfo['filename']);?>", title:"<?php echo ucfirst($pathInfo['filename']);?>",  url: "<?php echo $pathInfo['basename'];?>"},
		<?php } ?>
		*/
	]);
	
    Vvveb.FileManager.loadPage("creative");
        

    /*     BEGIN: PHOTOBLOCK INTEGRATION       */
    let photoBlockContainerId = "photoblock-container";
    let photoBlock = new PhotoBlock(photoBlockContainerId, { horizontal: true });
    photoBlock.registerContext(KlaytnContext);
    photoBlock.registerContext(EthereumContext);
    photoBlock.registerContext(BitcoinContext);
    photoBlock.registerContext(WebContext);

    photoBlock.on(PhotoBlock.eventTypes().CREATE, () => console.log('PhotoBlock was created'));
    photoBlock.on(PhotoBlock.eventTypes().HIDE, () => console.log('PhotoBlock modal was hidden'));
    photoBlock.on(PhotoBlock.eventTypes().LOAD, () => console.log('PhotoBlock photo was loaded'));
    photoBlock.on(PhotoBlock.eventTypes().LOCK, () => console.log('PhotoBlock was locked'));
    photoBlock.on(PhotoBlock.eventTypes().NEW, () => console.log('New photo was loaded'));
    photoBlock.on(PhotoBlock.eventTypes().SHOW, () => console.log('PhotoBlock modal was displayed'));
    photoBlock.on(PhotoBlock.eventTypes().UNLOCK, (account) => {
        console.log('PhotoBlock was unlocked', account);
    }); 

    /*    render() method is called each time demo context changes in updateContexts()      */
    /*    END: PHOTOBLOCK INTEGRATION     */



    function updateContexts(contexts, callback) {
        select.innerHTML = '';
        contexts.map((key) => {
            let option = document.createElement('option');
            option.innerText = key;
            select.appendChild(option);
        })
        select.addEventListener('change', (e) => {
            photoBlock.render(e.target.value, () => {
                console.log('PhotoBlock is ready');
            });
        })
        callback();
    }
       
    let select = document.getElementById("context-switch");
    let contexts = photoBlock.getContextNames();
    updateContexts(contexts, () => {
        select.value = 'Klaytn';
        select.dispatchEvent(new Event('change'));    
    });    
    
});




