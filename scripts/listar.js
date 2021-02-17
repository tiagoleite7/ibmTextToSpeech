var ajax = new XMLHttpRequest()
ajax.open("GET", "http://localhost:3000/comentario/listar")
ajax.send()

ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
        let comentarios = ajax.response
        criarTabela(JSON.parse(comentarios))
    }
}

function criarTabela(comentarios) {
    let table = document.getElementById('tblComentario')
    for (var i = 0; i < comentarios.length; i++) {
        var linha = `
        <tr> 
            <td> ${comentarios[i].comentario.replace('\n', ' ')}</td>
            <td><div class="col-mb-2"><button type="button" class="btn btn-primary mb-2" id = "btnOuvir${i}" onClick ="criarEReproduzirAudio('${comentarios[i].comentario}', '${comentarios[i].id}')" >Ouvir</button></div></td>
        </tr>
        `
        table.innerHTML += linha
    }
}
function criarEReproduzirAudio(mensagem, nomeArquivo) {
    ajax.open("POST", "http://localhost:3000/comentario/criarAudio")
    ajax.setRequestHeader('Content-Type', 'application/json')
    let comentarioCriado = {
        comentario: mensagem,
        nomeArquivo: nomeArquivo
    }

    ajax.send(JSON.stringify(comentarioCriado))
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            let criacaoDeAurio = setTimeout(function () {
                var mediaElement = new Audio(`./audio/${nomeArquivo}.wav`)
                mediaElement.play()
            }, 2000)
        }
    }
}

