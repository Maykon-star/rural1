
    function limparResultados() {
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('input').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input3').value = '';
    document.getElementById('input4').value = '';
 }

function obterLocalizacao() {
    const status = document.getElementById('status-loc');
    
    if (!navigator.geolocation) {
        status.innerText = 'Navegador não suporta geolocalização.';
        return;
    }

    status.innerText = 'Buscando sua localização...';

    navigator.geolocation.getCurrentPosition(
        (posicao) => {
            const lat = posicao.coords.latitude;
            const lon = posicao.coords.longitude;
            status.innerText = 'Localização encontrada! Carregando previsão...';
            buscarPrevisao(lat, lon);
        },
        (erro) => {
            status.innerText = 'Erro ao obter localização. Permita o acesso GPS.';
        }
    );
}

function buscarPrevisao(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=auto`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            preencherTabela(data.daily);
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            document.getElementById('status-loc').innerText = 'Erro ao carregar dados do tempo.';
        });
}

function preencherTabela(dados) {
    const tbody = document.getElementById('dados-previsao');
    tbody.innerHTML = ''; // Limpa tabela anterior

    for (let i = 0; i < dados.time.length; i++) {
        const dataPartes = dados.time[i].split('-');
        const dataFormatada = `${dataPartes[2]}/${dataPartes[1]}/${dataPartes[0]}`;

        const min = Math.round(dados.temperature_2m_min[i]);
        const max = Math.round(dados.temperature_2m_max[i]);
        const chuva = dados.precipitation_probability_max[i] || 0;
        const vento = Math.round(dados.windspeed_10m_max[i]);

        const linha = `
            <tr>
                <td>${dataFormatada}</td>
                <td>${min}°C / ${max}°C</td>
                <td>${chuva}%</td>
                <td>${vento} km/h</td>
            </tr>
        `;
        tbody.innerHTML += linha;
    }

    document.getElementById('status-loc').innerText = 'Previsão atualizada!';
    document.getElementById('tabela-previsao').classList.remove('oculto');
}
function escondertemp() {
    const bloco = document.getElementById('bloco-previsao');
    if (bloco.classList.contains('oculto')) {
        bloco.classList.remove('oculto');
    } else {
        bloco.classList.add('oculto');
    }
 }
 function alternarTema() {
    const body = document.body;
    const btnTema = document.getElementById('tema');
    body.classList.toggle('dark-mode');
    const ehModoEscuro = body.classList.contains('dark-mode');
    btnTema.innerText = ehModoEscuro ? "☀️" : "🌙";
    localStorage.setItem('tema', ehModoEscuro ? 'escuro' : 'claro');
}
function carregarTema() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-mode');
       if (btnTema) btnTema.innerText = "Tema Claro";
    }
}
document.addEventListener('DOMContentLoaded', carregarTema);

function salvarCampo(campoId) {
    const elemento = document.getElementById(campoId);
    if (elemento) {
        localStorage.setItem(campoId, elemento.value);
    }
}
function carregarCampoSalvo() {
    const campos = ['input', 'input2', 'input3', 'input4', 'inputp1', 'inputp2', 'inputp3', 'inputp4', 'inputarea', 'inputlargura', 'dist-covas', 'dist_larg', 'sementes_covas'];
    campos.forEach(campoId => {
        const valorSalvo = localStorage.getItem(campoId);
        const elemento = document.getElementById(campoId);
        if (elemento && valorSalvo !== null) {
            elemento.value = valorSalvo;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
 carregarCampoSalvo();
 carregarTema();
});

    function limparResultadosp() {
    document.getElementById('resultadop').innerHTML = '';
    document.getElementById('inputp1').value = '';
    document.getElementById('inputp2').value = '';
    document.getElementById('inputp3').value = '';
    document.getElementById('inputp4').value = '';
 }

    function limparResultadosSementes() {
    document.getElementById('resultado-sementes').innerHTML = '';
    document.getElementById('inputarea').value = '';
    document.getElementById('inputlargura').value = '';
    document.getElementById('dist-covas').value = '';
    document.getElementById('dist_larg').value = '';
    document.getElementById('sementes_covas').value = '';
 }

 function alternarModos() {
    const metodo = document.getElementById('metodo-calculo').value;
    document.getElementById('secao-area-simples').style.display = (metodo === "adubo_area") ? "block" : "none";
    document.getElementById('secao-dose-rec').style.display = (metodo === "adubo_dose") ? "block" : "none";
}

function limparResultadosAdubo() {
    // Limpa todos os inputs
    const ids = ['input-adubo-area', 'dose-simples-valor', 'input-adubo-hectares', 'input-adubo-m2'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    document.getElementById('Resultado-adubo').innerText = "";
}

// Função de suporte para os campos que aparecem/somem
function medidaadubacao() {
    const tipo = document.getElementById('tipo-medida-adubacao').value;
    document.getElementById('input-adubo-hectares').style.display = (tipo === "kg_por_hectare") ? "block" : "none";
    document.getElementById('input-adubo-m2').style.display = (tipo === "g_por_m2") ? "block" : "none";
}

// Essa é a função que o seu botão chama no HTML
function conversao_area() {
    calcularconvercoes();
}
function limparResultadosConversao() {
    document.getElementById('resultado_conversao').innerHTML = '';
    document.getElementById('inputvalor').value = '';
}

function limparResultadosVeneno() {
    document.getElementById('Resultado-veneno').innerHTML = '';
    document.getElementById('input-veneno-area').value = '';
    document.getElementById('input-veneno-dose').value = '';
}

const itensPrincipais = document.querySelectorAll('.tem-sub > a');

itensPrincipais.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const subMenu = this.nextElementSibling;

        document.querySelectorAll('.sub-menu').forEach(sub => {
            if (sub !== subMenu) sub.classList.remove('aberto');
        });

        subMenu.classList.toggle('aberto');
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.tem-sub')) {
        document.querySelectorAll('.sub-menu').forEach(sub => {
            sub.classList.remove('aberto');
        });
    }
});

// Inicializa o mapa
var map = L.map('map').setView([-21.23, -54.78], 15); // Coordenadas aproximadas

// Camada de Satélite (Esri World Imagery)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
}).addTo(map);

// Configuração da ferramenta de desenho
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    draw: {
        polygon: {
            allowIntersection: false,
            shapeOptions: { color: '#39FF14' } // Cor neon para combinar
        },
        polyline: false, rectangle: false, circle: false, marker: false, circlemarker: false
    },
    edit: { featureGroup: drawnItems }
});
map.addControl(drawControl);

// Função para calcular área quando o desenho terminar
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
    
    // Cálculo da área usando a API do Leaflet (em metros quadrados)
    var areaM2 = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    var hectares = areaM2 / 10000;

    document.getElementById('area-resultado').innerHTML = `Área: ${hectares.toFixed(2)} hectares (${areaM2.toFixed(0)} m²)`;
});
function focarLocalizacao() {
    console.log("A tentar obter localização...");
    
    if (!navigator.geolocation) {
        alert("O teu navegador não suporta geolocalização.");
        return;
    }

    // Configurações para maior precisão (ideal para zonas rurais)
    const options = {
        enableHighAccuracy: true, // Usa o GPS se disponível
        timeout: 15000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log("Localizado:", lat, lng);

            map.setView([lat, lng], 18);
            
            // Adiciona um marcador que brilha no teu estilo neon
            L.circleMarker([lat, lng], {
                radius: 10,
                color: '#39FF14',
                fillColor: '#39FF14',
                fillOpacity: 0.8
            }).addTo(map).bindPopup("Estás aqui!").openPopup();
        },
        (error) => {
            // Isto vai dizer-nos exatamente por que falhou
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("Erro: Negaste a permissão de localização no navegador.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Erro: Informação de localização indisponível (GPS desligado?).");
                    break;
                case error.TIMEOUT:
                    alert("Erro: O tempo de espera para obter a localização expirou.");
                    break;
                default:
                    alert("Ocorreu um erro desconhecido ao procurar a localização.");
                    break;
            }
        }, 
    );
}
 function mostrarDiv(id) {
    const elemento = document.getElementById(id);
      const todositens = document.querySelectorAll('.item-conteudo');
    elemento.classList.toggle('oculto');
        // Esconde as outras divs
        todositens.forEach(item => { item.classList.add('oculto'); });
        const alvo = document.getElementById(id);
        if (alvo){
        alvo.classList.remove('oculto');}
        else {
            console.error("Elemento com id '" + id + "' não encontrado.");
        }
    }
  function mostrarInfo() {
    const blocos = document.querySelectorAll('.info-bloco');
    const botao = document.getElementById('Mais');
    
    if (blocos.length === 0) return;

    const estaFechado = blocos[0].classList.contains('oculto') || 
                        window.getComputedStyle(blocos[0]).display === 'none';

    blocos.forEach(bloco => {
        if (estaFechado) {
            bloco.classList.remove('oculto');
            bloco.style.display = 'block'; // Garante a exibição
        } else {
            bloco.classList.add('oculto');
            bloco.style.display = 'none'; // Força o fechamento
        }
    });

    if (botao) {
        botao.innerText = estaFechado ? "Menos informações" : "Mais informações";
    }
}

let eventoInstalacao;
const btnInstalar = document.getElementById('btn-instalar');
window.addEventListener('beforinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalacao = e;
    if (btnInstalar) {
        btnInstalar.style.diplay = 'block';
    }
});
    if (btnInstalar)  {
        btnInstalar.addEventListener('click', async () => {
    if (eventoInstalacao) {
        eventoInstalacao.prompt();
        const{outcome} = await eventoInstalacao.userChoice;
        console.log(`Resposta do usuário: ${outcome}`);
        eventoInstalacao = null;
        btnInstalar.style.display = 'none';
    }
});
}