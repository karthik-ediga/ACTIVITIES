let un=document.createElement('ul');			
let btn=document.querySelector('button');		
let inp=document.querySelector('input');		
btn.insertAdjacentElement('afterend',un);
btn.addEventListener('click',function(){	
    if(inp.value.trim()!==''){	
let item=document.createElement('li');			
item.innerText=inp.value;				
let delbtn=document.createElement('button');		
delbtn.innerText='delete';				
item.appendChild(delbtn);				
// delbtn.addEventListener('click',function(){		
//     let par=this.parentElement;              (or)
//     par.remove();					
// });							
un.appendChild(item);					
inp.value='';	
    }				
});				

un.addEventListener('click',function(event){		
    if(event.target.nodeName=='BUTTON'){		
        let par=event.target.parentElement;		
        par.remove();					
    }							
})							