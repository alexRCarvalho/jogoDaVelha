let x = document.querySelector(".x")
let o = document.querySelector(".o")
let boxes = document.querySelectorAll(".box")
let buttons = document.querySelectorAll("#buttons-container button")
let messageContainer = document.querySelector("#message")
let messageText = document.querySelector("#message p")
let secondPlayer

//contador de jogadas

let player1 = 0
let player2 = 0

//evento para saber se são 2 players ou contra IA

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        secondPlayer = this.getAttribute('id')

        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none'
        }

        setTimeout(function(){
            let container = document.querySelector('#container')
            container.classList.remove('hide')
        }, 500)
    })
}


//Adicionando o evento de click nos box

for(let i = 0; i < boxes.length; i++) {

    //quando alguem clica na caixa
    boxes[i].addEventListener("click", function() {
        
        let el = checkEl(player1, player2)  
        
        //verifica se já tem X ou O 
        if(this.childNodes.length == 0) {

            let cloneEl = el.cloneNode(true)

            this.appendChild(cloneEl)

            if(player1 == player2) {
               player1++

               if(secondPlayer == 'ai-player') {

                //função para implementar uma jogada
                computerPlay()
                player2++
               }
            } else {
                player2++
            }
            checkWinCondition()
        }
    })
}



//computar jogada

function checkEl(player1, player2){
    if(player1 == player2) {
        // X
        el = x
    } else {
        // o
        el = o
    }

    return el
}

// ver quem ganhou

function checkWinCondition() {
    let b1 = document.getElementById("block-1")
    let b2 = document.getElementById("block-2")
    let b3 = document.getElementById("block-3")
    let b4 = document.getElementById("block-4")
    let b5 = document.getElementById("block-5")
    let b6 = document.getElementById("block-6")
    let b7 = document.getElementById("block-7")
    let b8 = document.getElementById("block-8")
    let b9 = document.getElementById("block-9")

    //horizontal
    if(b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
        let b1child = b1.childNodes[0].className
        let b2child = b2.childNodes[0].className
        let b3child = b3.childNodes[0].className

        if(b1child == b2child && b1child == b3child) {
            //x
            declareWinner(b1child)
        }
    }

    if(b4.childNodes.length > 0 && b5.childNodes.length > 0 && b6.childNodes.length > 0) {
        let b4child = b4.childNodes[0].className
        let b5child = b5.childNodes[0].className
        let b6child = b6.childNodes[0].className

        if(b4child == b5child && b4child == b6child) {
            //x
            declareWinner(b4child)
        }
    }

    if(b7.childNodes.length > 0 && b8.childNodes.length > 0 && b9.childNodes.length > 0) {
        let b7child = b7.childNodes[0].className
        let b8child = b8.childNodes[0].className
        let b9child = b9.childNodes[0].className

        if(b7child == b8child && b7child == b9child) {
            //x
            declareWinner(b7child)
        } 
    }

    //vertical

    if(b1.childNodes.length > 0 && b4.childNodes.length > 0 && b7.childNodes.length > 0) {
        let b1child = b1.childNodes[0].className
        let b4child = b4.childNodes[0].className
        let b7child = b7.childNodes[0].className

        if(b1child == b4child && b1child == b7child) {
            //x
            declareWinner(b1child)
        } 
    }

    if(b2.childNodes.length > 0 && b5.childNodes.length > 0 && b8.childNodes.length > 0) {
        let b2child = b2.childNodes[0].className
        let b5child = b5.childNodes[0].className
        let b8child = b8.childNodes[0].className

        if(b2child == b5child && b2child == b8child) {
            //x
            declareWinner(b2child)
        } 
    }

    if(b3.childNodes.length > 0 && b6.childNodes.length > 0 && b9.childNodes.length > 0) {
        let b3child = b3.childNodes[0].className
        let b6child = b6.childNodes[0].className
        let b9child = b9.childNodes[0].className

        if(b3child == b6child && b3child == b9child) {
            //x
            declareWinner(b3child)
        }
    }

    //diagonais
    if(b1.childNodes.length > 0 && b5.childNodes.length > 0 && b9.childNodes.length > 0) {
        let b1child = b1.childNodes[0].className
        let b5child = b5.childNodes[0].className
        let b9child = b9.childNodes[0].className

        if(b1child == b5child && b1child == b9child) {
            //x
            declareWinner(b1child)
        } 
    }

    if(b3.childNodes.length > 0 && b5.childNodes.length > 0 && b7.childNodes.length > 0) {
        let b3child = b3.childNodes[0].className
        let b5child = b5.childNodes[0].className
        let b7child = b7.childNodes[0].className

        if(b3child == b5child && b3child == b7child) {
            //x
            declareWinner(b3child)
        }
    }

    //deu velha
    let counter = 0

    for(let i = 0; i < boxes.length; i++) {
        if(boxes[i].childNodes[0] != undefined) {
            counter++
        }
    }

    if(counter ==9) {
        declareWinner('Deu Velha')
    }

}

//limpa o jogo, declara o vencedor e atualiza o placar

function declareWinner(winner){

    let scoreboardX = document.querySelector('#scoreboard-1')
    let scoreboardY = document.querySelector('#scoreboard-2')
    let msg = ''

    if(winner == 'x') {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1
        msg = "O Jogador 1 Venceu!"
    } else if (winner == 'o') {
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1
        msg = "O Jogador 2 Venceu!"
    } else {
        msg = "Deu Velha!"
    }
    
    //exibe mensagem    

    messageText.innerHTML = msg
    messageContainer.classList.remove("hide")


    //esconder mensagem e reiniciar o jogo

    setTimeout(function() {
        messageContainer.classList.add('hide')
    }, 3000)

    //zerar as jogadas

    player1 = 0
    player2 = 0


    //remover x e o
    let boxToRemove = document.querySelectorAll(".box div")

    for(let i = 0; i < boxToRemove.length; i++) {
        boxToRemove[i].parentNode.removeChild(boxToRemove[i])
    }
}

//logica da jogada da CPU

function computerPlay() {
    let cloneO = o.cloneNode(true)
    counter = 0
    filled = 0

    for(let i = 0; i < boxes.length; i++) {
        let randomNumber = Math.floor(Math.random() * 5)

        //só preencher se o filho estiver vazio

        if(boxes[i].childNodes[0] == undefined) {
            if(randomNumber <= 1) {
                boxes[i].appendChild(cloneO)
                counter++
                break
            }

            //verificar quantas estão preenchidas
            
        } else {
            filled++
        }
    }

    if(counter ==0 && filled < 9) {
        computerPlay()
    }
}