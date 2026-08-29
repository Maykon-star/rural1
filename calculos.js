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
function calcularperimetro() {
    var valor1 = input = document.getElementById('inputp1').value;
    var valor2 = input = document.getElementById('inputp2').value;
    var valor3 = input = document.getElementById('inputp3').value;
    var valor4 = input = document.getElementById('inputp4').value;

    var perimetro = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3) + parseFloat(valor4);

    document.getElementById('resultadop').innerHTML = "O perímetro é: " + perimetro + ' m';
}
function calcularSementes_Mudas() {
    var medida_comprimento = document.getElementById('inputarea').value / parseFloat(document.getElementById('dist-covas').value);
    var medida_largura = document.getElementById('inputlargura').value / parseFloat(document.getElementById('dist_larg').value);
    var total_covas = medida_comprimento * medida_largura;
    var sementes_mudas = total_covas * parseFloat(document.getElementById('sementes_covas').value);

    document.getElementById('resultado-sementes').innerHTML = "O total de sementes/mudas necessárias é: " + sementes_mudas.toFixed(0) + ' unidades';
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