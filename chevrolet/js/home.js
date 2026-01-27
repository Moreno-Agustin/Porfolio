document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // 1. OBJETIVOS DIARIOS
    // ==========================
    const objetivos = {
        kcal: 2700,
        pro: 150,
        carb: 365,
        grasa: 70,
    };

    // ==========================
    // 2. ESTADO ACTUAL DEL DÍA
    // ==========================
    let estado = {
        kcal: 0,
        pro: 0,
        carb: 0,
        grasa: 0,
    };

    let historial = [];
    let diasGuardados = []; // Array para guardar días completos

    // ==========================
    // 3. BASE DE ALIMENTOS SIMPLIFICADA (100g)
    // ==========================
    const alimentos = {
        // ==========================
        // PROTEÍNAS ANIMALES
        // ==========================
        huevo: { kcal: 155, pro: 13, carb: 1.1, grasa: 11 },
        clara_huevo: { kcal: 52, pro: 11, carb: 0.7, grasa: 0.2 },
        carne: { kcal: 200, pro: 26, carb: 0, grasa: 10 },
        milanesa_carne: { kcal: 250, pro: 20, carb: 10, grasa: 15 },
        milanesa_pechuga: { kcal: 220, pro: 22, carb: 10, grasa: 12 },
        carne_grasa: { kcal: 280, pro: 24, carb: 0, grasa: 20 },
        pollo_pechuga: { kcal: 165, pro: 31, carb: 0, grasa: 3.6 },
        pollo_muslo: { kcal: 209, pro: 26, carb: 0, grasa: 11 },
        pavo: { kcal: 135, pro: 29, carb: 0, grasa: 1 },
        cerdo_lomo: { kcal: 195, pro: 27, carb: 0, grasa: 9 },
        jamon_cocido: { kcal: 145, pro: 21, carb: 1, grasa: 6 },
        salchicha: { kcal: 300, pro: 12, carb: 3, grasa: 27 },

        // ==========================
        // PESCADOS Y MARISCOS
        // ==========================
        atun_lata_agua: { kcal: 116, pro: 26, carb: 0, grasa: 1 },
        atun_lata_aceite: { kcal: 198, pro: 29, carb: 0, grasa: 8 },
        salmon: { kcal: 208, pro: 20, carb: 0, grasa: 13 },
        merluza: { kcal: 90, pro: 19, carb: 0, grasa: 1 },
        sardinas: { kcal: 208, pro: 25, carb: 0, grasa: 11 },
        camarones: { kcal: 99, pro: 24, carb: 0.2, grasa: 0.3 },

        // ==========================
        // LÁCTEOS
        // ==========================
        leche_entera: { kcal: 61, pro: 3.2, carb: 4.8, grasa: 3.3 },
        leche_descremada: { kcal: 35, pro: 3.4, carb: 5, grasa: 0.2 },
        yogur_griego_0: { kcal: 59, pro: 10, carb: 3.6, grasa: 0.4 },
        yogur_natural: { kcal: 63, pro: 3.5, carb: 4.7, grasa: 3.3 },
        queso_crema: { kcal: 340, pro: 6, carb: 4, grasa: 34 },
        queso_muzzarella: { kcal: 280, pro: 22, carb: 3, grasa: 20 },
        ricota: { kcal: 174, pro: 11, carb: 3, grasa: 13 },

        // ==========================
        // CARBOHIDRATOS PRINCIPALES
        // ==========================
        arroz_cocido: { kcal: 130, pro: 2.7, carb: 28, grasa: 0.3 },
        arroz_crudo: { kcal: 365, pro: 7, carb: 80, grasa: 0.7 },
        pasta_cocida: { kcal: 131, pro: 5, carb: 25, grasa: 1.1 },
        papa_hervida: { kcal: 77, pro: 2, carb: 17, grasa: 0.1 },
        batata: { kcal: 86, pro: 1.6, carb: 20, grasa: 0.1 },
        quinoa_cocida: { kcal: 120, pro: 4.4, carb: 21, grasa: 1.9 },
        lentejas_cocidas: { kcal: 116, pro: 9, carb: 20, grasa: 0.4 },
        garbanzos_cocidos: { kcal: 164, pro: 9, carb: 27, grasa: 2.6 },

        // ==========================
        // PAN Y DERIVADOS (lo que pediste)
        // ==========================
        pan_blanco: { kcal: 265, pro: 9, carb: 49, grasa: 3.2 },
        pan_integral: { kcal: 247, pro: 13, carb: 41, grasa: 4.2 },

        // TOSTADAS (por 100g, suelen ser más secas)
        tostadas_pan: { kcal: 380, pro: 12, carb: 72, grasa: 5 },

        // ==========================
        // FRUTAS
        // ==========================
        banana: { kcal: 89, pro: 1.1, carb: 23, grasa: 0.3 },
        manzana: { kcal: 52, pro: 0.3, carb: 14, grasa: 0.2 },
        naranja: { kcal: 47, pro: 0.9, carb: 12, grasa: 0.1 },
        frutilla: { kcal: 32, pro: 0.7, carb: 7.7, grasa: 0.3 },
        uvas: { kcal: 69, pro: 0.7, carb: 18, grasa: 0.2 },

        // ==========================
        // VERDURAS 
        // ==========================
        pure_papa: { kcal: 95, pro: 2, carb: 21, grasa: 2.5 },
        acelga: { kcal: 19, pro: 1.8, carb: 3.7, grasa: 0.2 },
        espinaca: { kcal: 23, pro: 2.9, carb: 3.6, grasa: 0.4 },
        brocoli: { kcal: 34, pro: 2.8, carb: 7, grasa: 0.4 },
        zanahoria: { kcal: 41, pro: 0.9, carb: 10, grasa: 0.2 },
        tomate: { kcal: 18, pro: 0.9, carb: 3.9, grasa: 0.2 },
        lechuga: { kcal: 15, pro: 1.4, carb: 2.9, grasa: 0.2 },

        // ==========================
        // GRASAS / EXTRAS
        // ==========================
        aceite_oliva: { kcal: 884, pro: 0, carb: 0, grasa: 100 },
        manteca: { kcal: 717, pro: 0.9, carb: 0.1, grasa: 81 },
        manteca_mani: { kcal: 588, pro: 25, carb: 20, grasa: 50 },
        palta: { kcal: 160, pro: 2, carb: 9, grasa: 15 },

        // ==========================
        // DULCES (lo que pediste: mermelada)
        // ==========================
        mermelada: { kcal: 250, pro: 0.3, carb: 65, grasa: 0.2 },
        miel: { kcal: 304, pro: 0.3, carb: 82, grasa: 0 },

        // ==========================
        // SNACKS / EXTRA DEPORTISTA
        // ==========================
        frutos_secos_mix: { kcal: 600, pro: 20, carb: 20, grasa: 50 },
        almendras: { kcal: 579, pro: 21, carb: 22, grasa: 50 },
        nueces: { kcal: 654, pro: 15, carb: 14, grasa: 65 },
        chocolate_negro: { kcal: 600, pro: 8, carb: 46, grasa: 43 },
    };


    // ==========================
    // 4. ELEMENTOS DEL DOM
    // ==========================
    const kcalActual = document.querySelector("#kcalActual");
    const proActual = document.querySelector("#proActual");
    const carbActual = document.querySelector("#carbActual");
    const grasaActual = document.querySelector("#grasActual"); // Corregido ID

    const barraKcal = document.querySelector("#barraKcal");
    const barraPro = document.querySelector("#barraPro");
    const barraCarb = document.querySelector("#barraCarb");
    const barraGrasa = document.querySelector("#barraGrasa");

    const btnAñadir = document.querySelector(".btn-añadir");
    const btnBuscar = document.querySelector(".btn-buscar");
    const btnGuardar = document.querySelector(".btn-guardar");
    const btnReiniciar = document.querySelector(".btn-reiniciar");

    const listaHistorial = document.querySelector("#historialLista");
    const listaDiasElement = document.querySelector("#lista-dias"); // Nuevo contenedor

    // ==========================
    // 5. FUNCIONES AUXILIARES
    // ==========================
    function calcularPorcentaje(actual, objetivo) {
        return Math.min((actual / objetivo) * 100, 100);
    }

    function calcularMacros(alimentoKey, gramos) {
        const base = alimentos[alimentoKey];
        if (!base) return null;
        const factor = gramos / 100;

        return {
            kcal: base.kcal * factor,
            pro: base.pro * factor,
            carb: base.carb * factor,
            grasa: base.grasa * factor,
        };
    }

    // ==========================
    // 6. RENDERIZADO
    // ==========================
    function render() {
        // Actualizar Textos
        kcalActual.textContent = Math.round(estado.kcal);
        proActual.textContent = Math.round(estado.pro);
        carbActual.textContent = Math.round(estado.carb);
        grasaActual.textContent = Math.round(estado.grasa);

        // Actualizar Barras
        barraKcal.style.width = `${calcularPorcentaje(estado.kcal, objetivos.kcal)}%`;
        barraPro.style.width = `${calcularPorcentaje(estado.pro, objetivos.pro)}%`;
        barraCarb.style.width = `${calcularPorcentaje(estado.carb, objetivos.carb)}%`;
        barraGrasa.style.width = `${calcularPorcentaje(estado.grasa, objetivos.grasa)}%`;

        renderHistorial();
        renderDiasGuardados();
    }

    function renderHistorial() {
        listaHistorial.innerHTML = "";

        historial.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "historial-item";

            // Título con nombre y gramos
            const titulo = document.createElement("span");
            titulo.className = "historial-fecha";
            titulo.textContent = `${item.alimento.toUpperCase()} (${item.gramos}g)`;

            // Detalles de macros
            const detalles = document.createElement("span");
            detalles.className = "historial-macros";
            detalles.textContent = `${Math.round(item.macros.kcal)} kcal | P: ${Math.round(item.macros.pro)} | C: ${Math.round(item.macros.carb)} | G: ${Math.round(item.macros.grasa)}`;

            // Botón de eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "historial-borrar";
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = () => eliminarItem(index);

            div.appendChild(titulo);
            div.appendChild(detalles);
            div.appendChild(btnEliminar); // Añadir botón eliminar

            listaHistorial.appendChild(div);
        });
    }

    function renderDiasGuardados() {
        listaDiasElement.innerHTML = "";

        if (diasGuardados.length === 0) {
            listaDiasElement.innerHTML = "<p style='text-align:center; color:#888;'>No hay días guardados aún.</p>";
            return;
        }

        diasGuardados.forEach((dia, index) => {
            const card = document.createElement("div");
            card.className = "dia-card";

            const fecha = document.createElement("h4");
            fecha.textContent = dia.fecha;

            const kcalTotal = document.createElement("p");
            kcalTotal.textContent = `Total: ${Math.round(dia.kcal)} kcal`;
            kcalTotal.style.fontWeight = "bold";
            kcalTotal.style.color = "#243358";

            const macros = document.createElement("p");
            macros.style.fontSize = "0.85rem";
            macros.style.color = "#666";
            macros.textContent = `P: ${Math.round(dia.macros.pro)} | C: ${Math.round(dia.macros.carb)} | G: ${Math.round(dia.macros.grasa)}`;

            // Botón para borrar día del historial
            const btnBorrar = document.createElement("button");
            btnBorrar.className = "btn-borrar-dia-historial";
            btnBorrar.textContent = "×";
            btnBorrar.onclick = () => eliminarDiaGuardado(index);

            card.appendChild(fecha);
            card.appendChild(kcalTotal);
            card.appendChild(macros);
            card.appendChild(btnBorrar);

            listaDiasElement.appendChild(card);
        });
    }

    function eliminarDiaGuardado(index) {
        if (!confirm("¿Eliminar este registro del historial?")) return;
        diasGuardados.splice(index, 1);
        guardarAutomatico();
        renderDiasGuardados();
    }

    // ==========================
    // 7. LÓGICA DE ACTUALIZACIÓN
    // ==========================
    function agregarAlimento(nombre, gramos) {
        const macros = calcularMacros(nombre, gramos);

        estado.kcal += macros.kcal;
        estado.pro += macros.pro;
        estado.carb += macros.carb;
        estado.grasa += macros.grasa;

        historial.push({ alimento: nombre, gramos, macros });
        guardarAutomatico(); // Guardado automático por UX
        render();
    }

    function eliminarItem(index) {
        if (!confirm("¿Eliminar este alimento?")) return;

        const item = historial[index];

        estado.kcal -= item.macros.kcal;
        estado.pro -= item.macros.pro;
        estado.carb -= item.macros.carb;
        estado.grasa -= item.macros.grasa;

        // Evitar negativos por errores de redondeo
        if (estado.kcal < 0) estado.kcal = 0;
        if (estado.pro < 0) estado.pro = 0;
        if (estado.carb < 0) estado.carb = 0;
        if (estado.grasa < 0) estado.grasa = 0;

        historial.splice(index, 1);
        guardarAutomatico();
        render();
    }

    // ==========================
    // 8. EVENT LISTENERS
    // ==========================
    btnAñadir.addEventListener("click", () => {
        // Mostrar lista de alimentos disponibles para facilitar
        const listaAlimentos = Object.keys(alimentos).join(", ");

        let nombre = prompt(`Ingresa el alimento:\nDisponibles: ${listaAlimentos}`);
        if (!nombre) return;
        nombre = nombre.toLowerCase().trim();

        if (!alimentos[nombre]) {
            alert("⚠️ Alimento no encontrado en la base de datos.");
            return;
        }

        const gramos = prompt("¿Cuántos gramos?");
        if (!gramos || isNaN(gramos) || gramos <= 0) {
            alert("⚠️ Cantidad inválida.");
            return;
        }

        agregarAlimento(nombre, parseFloat(gramos));
    });

    // Botón Buscar (Alias de Añadir por ahora, o podría ser buscador real)
    btnBuscar.addEventListener("click", () => {
        btnAñadir.click();
    });

    btnGuardar.addEventListener("click", () => {
        guardarDia(); // Manual save
        alert("✅ Día guardado correctamente.");
    });

    btnReiniciar.addEventListener("click", () => {
        if (!confirm("⚠️ ¿Estás seguro de reiniciar todo el progreso de hoy?")) return;

        estado = { kcal: 0, pro: 0, carb: 0, grasa: 0 };
        historial = [];
        guardarAutomatico();
        render();
    });

    // ==========================
    // 9. PERSISTENCIA
    // ==========================
    function guardarAutomatico() {
        localStorage.setItem("macroEstado", JSON.stringify(estado));
        localStorage.setItem("macroHistorial", JSON.stringify(historial));
        localStorage.setItem("macroDiasGuardados", JSON.stringify(diasGuardados));
    }

    function guardarDia() {
        const fechaHoy = new Date().toLocaleDateString();

        // Guardar en el historial de días
        diasGuardados.push({
            fecha: fechaHoy,
            kcal: estado.kcal,
            macros: { ...estado } // Copia del estado actual
        });

        guardarAutomatico();
        renderDiasGuardados();
    }

    function cargarDatos() {
        const savedEstado = localStorage.getItem("macroEstado");
        const savedHistorial = localStorage.getItem("macroHistorial");
        const savedDias = localStorage.getItem("macroDiasGuardados");

        if (savedEstado) estado = JSON.parse(savedEstado);
        if (savedHistorial) historial = JSON.parse(savedHistorial);
        if (savedDias) diasGuardados = JSON.parse(savedDias);
    }

    // ==========================
    // 10. INICIALIZAR
    // ==========================
    cargarDatos();
    render();
});
