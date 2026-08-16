
function calcular() {
    var valor1 = input = document.getElementById('input').value;
    var valor2 = input = document.getElementById('input2').value;
    var valor3 = input = document.getElementById('input3').value;
    var valor4 = input = document.getElementById('input4').value;

    var basesum = parseFloat(valor1) + parseFloat(valor2);
    var alturasum = parseFloat(valor3) + parseFloat(valor4);

    var base = basesum / 2;
    var altura = alturasum / 2;
    var area = base * altura;

    document.getElementById('resultado').innerHTML = "A área é: " + area + ' m²';
    
}
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
    btnTema.innerText = ehModoEscuro ? "Tema Claro" : "Tema Escuro";
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

function calcularperimetro() {
    var valor1 = input = document.getElementById('inputp1').value;
    var valor2 = input = document.getElementById('inputp2').value;
    var valor3 = input = document.getElementById('inputp3').value;
    var valor4 = input = document.getElementById('inputp4').value;

    var perimetro = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3) + parseFloat(valor4);

    document.getElementById('resultadop').innerHTML = "O perímetro é: " + perimetro + ' m';
}
    function limparResultadosp() {
    document.getElementById('resultadop').innerHTML = '';
    document.getElementById('inputp1').value = '';
    document.getElementById('inputp2').value = '';
    document.getElementById('inputp3').value = '';
    document.getElementById('inputp4').value = '';
 }

function calcularSementes_Mudas() {
    var medida_comprimento = document.getElementById('inputarea').value / parseFloat(document.getElementById('dist-covas').value);
    var medida_largura = document.getElementById('inputlargura').value / parseFloat(document.getElementById('dist_larg').value);
    var total_covas = medida_comprimento * medida_largura;
    var sementes_mudas = total_covas * parseFloat(document.getElementById('sementes_covas').value);

    document.getElementById('resultado-sementes').innerHTML = "O total de sementes/mudas necessárias é: " + sementes_mudas.toFixed(0) + ' unidades';
}
    function limparResultadosSementes() {
    document.getElementById('resultado-sementes').innerHTML = '';
    document.getElementById('inputarea').value = '';
    document.getElementById('inputlargura').value = '';
    document.getElementById('dist-covas').value = '';
    document.getElementById('dist_larg').value = '';
    document.getElementById('sementes_covas').value = '';
 }

function tipoadubacao() {
    let metodo = document.getElementById('metodo-calculo').value;
    
    // Pegamos os grupos de inputs
    let campoArea = document.getElementById('input-adubo-area');
    let campoDoseRecomendada = document.getElementById('input-adubo-dose'); // Onde ele coloca quanto tem de adubo
    let grupoDoseEspecifica = document.getElementById('tipo-medida-adubacao'); // O select de kg/ha ou g/m2

    if (metodo === "adubo_area") {
        campoArea.style.display = "block";
        campoDoseRecomendada.style.display = "block";
        grupoDoseEspecifica.style.display = "none";
        // Esconde os inputs de dose específica (hectares/m2)
        document.getElementById('input-adubo-hectares').style.display = "none";
        document.getElementById('input-adubo-m2').style.display = "none";
    } else if (metodo === "adubo_dose") {
        campoArea.style.display = "block";
        campoDoseRecomendada.style.display = "none"; // Esconde o "quanto de adubo eu tenho"
        grupoDoseEspecifica.style.display = "block";
    } else {
        // Esconde tudo se não selecionar nada
        campoArea.style.display = "none";
        campoDoseRecomendada.style.display = "none";
        grupoDoseEspecifica.style.display = "none";
    }
}

 function alternarModos() {
    const metodo = document.getElementById('metodo-calculo').value;
    document.getElementById('secao-area-simples').style.display = (metodo === "adubo_area") ? "block" : "none";
    document.getElementById('secao-dose-rec').style.display = (metodo === "adubo_dose") ? "block" : "none";
}

function calcularAdubo() {
    const metodo = document.getElementById('metodo-calculo').value;
    if (metodo === "adubo_area") {
        res = document.getElementById('Resultado-simples');
    } else {
        res = document.getElementById('Resultado-recomendado');
    }
    
    // 1. Pegar Área e Unidade
    const valorArea = parseFloat(document.getElementById('input-adubo-area').value) || 0;
    const unidadeArea = document.getElementById('tipo-medida-area').value; // 'hectares' ou 'metros_quadrados'

    let resultadoFinalGramas = 0;

    if (metodo === "adubo_area") {
        // --- MODO ÁREA SIMPLES (CORRIGIDO) ---
        const valorDose = parseFloat(document.getElementById('dose-simples-valor').value) || 0;
        const unidadePeso = document.getElementById('unidade-simples-peso').value; // 'kg' ou 'g'
        
        // Transformamos a dose em gramas primeiro
        let doseEmGramas = (unidadePeso === "kg") ? valorDose * 1000 : valorDose;

        // AQUI ESTAVA O ERRO: Se for Hectare, precisamos multiplicar por 10.000 
        // para saber quantas gramas vão na área toda.
        if (unidadeArea === "hectares") {
            // Cálculo: (Área em Ha * 10.000 m2) * Dose
            // Se o usuário quer 8g por m2 em 7 hectares:
            resultadoFinalGramas = valorArea  * doseEmGramas;
        } else {
            // Se for Metro Quadrado, é direto:
            resultadoFinalGramas = valorArea * doseEmGramas;
        }
    } 
    else {
        // --- MODO DOSE RECOMENDADA ---
        let areaM2 = (unidadeArea === "hectares") ? valorArea * 10000 : valorArea;
        const tipoDose = document.getElementById('tipo-medida-adubacao').value;

        if (tipoDose === "kg_por_hectare") {
            const doseKgHa = parseFloat(document.getElementById('input-adubo-hectares').value) || 0;
            resultadoFinalGramas = areaM2 * (doseKgHa / 10000); 
        } else {
            const doseGm2 = parseFloat(document.getElementById('input-adubo-m2').value) || 0;
            resultadoFinalGramas = areaM2 * doseGm2;
        }
    }

    // 3. Exibição com conversão automática de unidade
    if (resultadoFinalGramas > 0) {
        if (resultadoFinalGramas >= 1000000) { 
            // Se for mais de 1000 kg, mostra em Toneladas
            res.innerHTML = "<strong>Total:</strong> " + (resultadoFinalGramas / 1000000).toFixed(2) + " t";
        } else if (resultadoFinalGramas >= 1000) {
            // Mostra em Kg
            res.innerHTML = "<strong>Total:</strong> " + (resultadoFinalGramas / 1000).toFixed(2) + " kg";
        } else {
            // Mostra em Gramas
            res.innerHTML = "<strong>Total:</strong> " + resultadoFinalGramas.toFixed(0) + " g";
        }
    } else {
        res.innerText = "⚠️ Insira os valores!";
    }
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

function calcularconvercoes() {
    var campode = document.getElementById('tipoconversao1');
    var campopara = document.getElementById('tipoconversao2');
    var inputElemento = document.getElementById('inputvalor');
    var display = document.getElementById('resultado_conversao');

    var valor = parseFloat(inputElemento.value);

    if (isNaN(valor)) {
        display.innerHTML = "Por favor, digite um valor.";
        return;
    }

    var resultado = 0;

    // Lógica para Hectares
    if (campode.value === "hectaresCom") {
        if (campopara.value === "m2Com2") {
            resultado = valor * 10000;
            display.innerHTML = "A área é: " + resultado + " m²";
        } else if (campopara.value === "alqueirespCom2") {
            resultado = valor / 2.42;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Alqueires Paulistas";
        } else if (campopara.value === "alqueiresMCom2") {
            resultado = valor / 4.84;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Alqueires Mineiros";
        } else {
            display.innerHTML = "A área é: " + valor + " Hectares";
        }
    } 
    // Lógica para Metros Quadrados
    else if (campode.value === "m2Com") {
        if (campopara.value === "hectaresCom2") {
            resultado = valor / 10000;
            display.innerHTML = "A área é: " + resultado + " Hectares";
        } 
        else if (campopara.value === "alqueirespCom2") {
            resultado = valor / 24200;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Alqueires Paulistas";
        }
        else if (campopara.value === "alqueiresMCom2") {
            resultado = valor / 48400;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Alqueires Mineiros";
        }
        else {
            display.innerHTML = "A área é: " + valor + " m²";
        }
    }
        // Lógica para Alqueires Paulistas
    else if (campode.value === "alqueirespCom") {
        if (campopara.value === "hectaresCom2") {
            resultado = valor * 2.42;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Hectares";
        }
        else if (campopara.value === "m2Com2") {
            resultado = valor * 24200;
            display.innerHTML = "A área é: " + resultado + " m²";
        }
        else if (campopara.value === "alqueiresMCom2") {
            resultado = valor / 2;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Alqueires Mineiros";
        }
        else {
            display.innerHTML = "A área é: " + valor + " Alqueires Paulistas";
        }
    }
        // Lógica para Alqueires Mineiros
    else if (campode.value === "alqueiresMCom") {
        if (campopara.value === "hectaresCom2") {
            resultado = valor * 4.84;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Hectares";
        }
        else if (campopara.value === "m2Com2") {
            resultado = valor * 48400;
            display.innerHTML = "A área é: " + resultado + " m²";
        }
        else if (campopara.value === "alqueirespCom2") {
            resultado = valor * 2;
            display.innerHTML = "A área é: " + resultado.toFixed(2) + " Alqueires Paulistas";
        }
        else {
            display.innerHTML = "A área é: " + valor + " Alqueires Mineiros";
        }
    }
        else {
            display.innerHTML = "Por favor, selecione unidades válidas para conversão.";
        }
}

// Essa é a função que o seu botão chama no HTML
function conversao_area() {
    calcularconvercoes();
}
function limparResultadosConversao() {
    document.getElementById('resultado_conversao').innerHTML = '';
    document.getElementById('inputvalor').value = '';
}

function Calcularveneno() {
    const area = parseFloat(document.getElementById('input-veneno-area').value);
    const dose = parseFloat(document.getElementById('input-veneno-dose').value);
    const resultadocalc = document.getElementById('Resultado-veneno');

    // PEGUE O VALOR DIRETAMENTE (Sem o === "valor")
    const medidaArea = document.getElementById('tipo-medida-veneno').value;
    const medidaDose = document.getElementById('tipo-medida-dose').value;

    if (isNaN(area) || isNaN(dose)) {
        resultadocalc.innerHTML = "Por favor, insira valores válidos.";
        return;
    }

    if (medidaArea === "hectares" && medidaDose === "l_por_hectare") {
        const resultado = area * dose;
        resultadocalc.innerHTML = "A quantidade de veneno necessária é: " + resultado.toFixed(2) + " L";
    } 
    else if (medidaArea === "metros_quadrados" && medidaDose === "ml_por_m2") {
        const resultado = area * dose;
        resultadocalc.innerHTML = "A quantidade de veneno necessária é: " + resultado.toFixed(2) + " ml";
    }
    else if (medidaArea === "hectares" && medidaDose === "ml_por_m2") {
        const resultado = area * 10000 * dose;
        resultadocalc.innerHTML = "A quantidade de veneno necessária é: " + resultado.toFixed(2) + " ml";
    }
    else if (medidaArea === "metros_quadrados" && medidaDose === "l_por_hectare") {
        const resultado = (area / 10000) * dose;
        resultadocalc.innerHTML = "A quantidade de veneno necessária é: " + resultado.toFixed(2) + " L";
    }
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