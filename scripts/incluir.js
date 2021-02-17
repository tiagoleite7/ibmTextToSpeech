let txtComentario = document.getElementById("txtComentario")
let form = document.getElementById("form")
var ajax = new XMLHttpRequest()


form.addEventListener("submit", async function (event) {
    try {
        event.preventDefault();
        ajax.open("POST", "http://localhost:3000/comentario/incluir")
        let comentarioCriado = {
            comentario: txtComentario.value.replace('\n', ' ')
        }
        ajax.setRequestHeader('Content-Type', 'application/json')
        ajax.send(JSON.stringify(comentarioCriado))
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                atualizarTabela(JSON.parse(ajax.response))
            }
        }
        txtComentario.value= ''
    } catch (error) {
        console.log(error)
    }
})

function atualizarTabela(comentario) {
    let table = document.getElementById('tblComentario')
    var linha = `
        <tr> 
            <td> ${comentario.mensagem}</td>
            <td><div class="col-mb-2"><button type="button" class="btn btn-primary mb-2" onClick ="criarEReproduzirAudio('${comentario.mensagem}', '${comentario.id}')" >Ouvir</button></div></td>
        </tr>
        `
    table.innerHTML += linha
}


function criarEReproduzirAudio(mensagem, id) {
    ajax.open("POST", "http://localhost:3000/comentario/criarAudio")
    ajax.setRequestHeader('Content-Type', 'application/json')


    let comentarioCriado = {
        comentario: mensagem,
        nomeArquivo: id
    }
    ajax.send(JSON.stringify(comentarioCriado))
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) { 
            var mediaElement = new Audio(`./audio/${id}.wav`)
            setTimeout(mediaElement.play(),2000)
        }
    }
} 