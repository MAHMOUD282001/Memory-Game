document.querySelector(".control-buttons span").addEventListener('click',function(){

    let yourName = prompt("What Is Your Name?");
    
    if(yourName == null || yourName == ""){
    
        document.querySelector(".name span").innerHTML = "Unknown";
        
        document.getElementById("welcome").play();
    }
    else{
        
        document.querySelector(".name span").innerHTML = yourName;
        
        document.getElementById("success").play();
    }
    
    document.querySelector(".control-buttons").remove();
    
})

let duration = 3000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children)

let orderRange = [...Array(blocks.length).keys()]; // (=)  let orderRange = array.from(array(blocks.length).keys());


shuffle(orderRange);

blocks.forEach((block, index)=>{
    
    block.style.order = orderRange[index];
    
    // console.log(orderRange[index])
    
    block.addEventListener('click',function(){
        flipBlock(block)
    })
})



//FlipBlock Function

function flipBlock(selectedBlock){

    //Add Class is-filiped
    
    selectedBlock.classList.add('is-flipped');
    
    // collect All Flipped Cards
    
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    
    //If There Is Two Blocks Selected
    
    if(allFlippedBlocks.length === 2){
    
        //Stop Clicking Function
        
        stopClicking();
        
        //Check Match Blocks
        checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    
}

function stopClicking(){
    
    //Add Class no-clicking On Main Container
    blocksContainer.classList.add("no-clicking");
    
    setTimeout(() => {
        
        //Remove Class no-clicking On Main Container
        
        blocksContainer.classList.remove("no-clicking");
        
    },duration)
}





function checkMatchBlocks(firstBlock, secondBlock){

    let tries = document.querySelector(".tries span");
    
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        
        firstBlock.classList.remove("is-flipped");
        
        secondBlock.classList.remove("is-flipped");
        
        firstBlock.classList.add("has-match");
        
        secondBlock.classList.add("has-match");
    
        document.getElementById("success").play();
        
    }
    
    else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        
        setTimeout(() => {
        
            firstBlock.classList.remove("is-flipped");
        
            secondBlock.classList.remove("is-flipped");
            
            if(tries.innerHTML == 10){
            
                alert("Game Over, You Don't Have Any Tries Yet");
                
                tries.innerHTML = 0;
                
                console.log(shuffle(orderRange));
                
                blocks.forEach((block, index)=>{
    
                    block.style.order = orderRange[index];
                })
            }
            
        }, duration)
        
        document.getElementById("fail").play();
        
    }
}





function shuffle(array){
    let current = array.length,
        temp, random;
        
    
    while(current > 0){
        
        random = Math.floor(Math.random() * current);
        
        current --;
        
        temp = array[current];
        
        array[current] = array[random];
        
        array[random] = temp;
    }
    
    return array;
}