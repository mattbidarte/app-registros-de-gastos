// =============== DARK MODE ===============
const main = document.querySelector('main')
const btnDark = document.querySelector('.togglebtn')
const toggle = document.querySelector('.bi-toggle-off')

btnDark.addEventListener('click', () => {
    let val = main.classList.toggle("dark")
    toggle.classList.toggle('bi-toggle-on')
    localStorage.setItem('modo', val)
})

let valor = localStorage.getItem('modo')
if(valor == "true"){
    main.classList.add('dark')
    toggle.classList.add('bi-toggle-on')
} else {
    main.classList.remove('dark')
    toggle.classList.add('bi-toggle-off')
}

// =============== APP ===============
// =============== PLANTILLA OBJETOS ===============
class Gasto {
    constructor (detalle, monto){
        this.tipo = 'Gasto'
        this.detalle = detalle
        this.monto = parseFloat(monto)
        this.fecha = new Date()
    }
}

class Ingreso {
    constructor (detalle, monto){
        this.tipo = 'Ingreso'
        this.detalle = detalle
        this.monto = parseFloat(monto)
        this.fecha = new Date()
    }
}

// =============== VARIABLES LOCALSTORAGE ===============
localStorage.length === 0 && (
    localStorage.setItem('balance', 0),
    localStorage.setItem('arrayBalance', "[]")
)

// =============== VARIABLES DOM ===============
const container = document.querySelector('#container')
const containerDolar = document.querySelector('.containerDolar')
const tgeneral = document.querySelector('#tgeneral')
const tgasto = document.querySelector('#tgasto')
const tingreso = document.querySelector('#tingreso')
const tregistro = document.querySelector('#tregistro')
const divRegistros = document.querySelector('#container__registros-items')

// =============== MUESTREO TOTALES ===============
console.log(JSON.parse(localStorage.arrayBalance))
const reciboArray = JSON.parse(localStorage.arrayBalance)
reciboArray.reverse() //Para ordenar de mas reciente a mas antiguo

const arrIngresos = reciboArray.filter((el) => el.tipo.includes('Ingreso'))
const arrGastos = reciboArray.filter((el) => el.tipo.includes('Gasto'))

function filtrarPorMes(obj) {
    const mesActual = new Date().getMonth()
    const obtenerMes = new Date(obj.fecha).getMonth()

    if ((obtenerMes) == (mesActual)) {
        return true
    } 
}

const arrIngMesActual = arrIngresos.filter(filtrarPorMes).map(item => item.monto).reduce((prev, curr) => prev + curr, 0)
const arrGasMesActual = arrGastos.filter(filtrarPorMes).map(item => item.monto).reduce((prev, curr) => prev + curr, 0)

console.log('Array ing Filtrado\n', arrIngMesActual);
console.log('Array gas Filtrado\n', arrGasMesActual);

tgeneral.innerHTML = `Balance general:<br>$${new Intl.NumberFormat('de-DE').format(+localStorage.balance)}`
tgasto.innerHTML = `Gasto mensual:<br>$${new Intl.NumberFormat('de-DE').format(arrGasMesActual)}`
tingreso.innerHTML = `Ingreso mensual:<br>$${new Intl.NumberFormat('de-DE').format(arrIngMesActual)}`


// =============== BUTTONS ===============
const btnGasto = document.querySelector('#container__buttons--gasto')
const btnIngreso = document.querySelector('#container__buttons--ingreso')

// =============== MUESTREO REGISTROS ===============
const filter = document.querySelector('.registros__select')

if(reciboArray.length == 0){
    divRegistros.innerHTML = '<p style="font-size: 2em; margin: 20px 10px">Sin registros...</p>'
}else {
    reciboArray.forEach((item) => {
        const div = document.createElement("div")
        div.className = `container__registros-item`
        div.id = `container__registros-item`
        let fecha = new Date(item.fecha).toLocaleDateString();
        //Si es un ingreso se muestra una flecha hacía arriba, sino hacia abajo
        if(item.tipo === "Ingreso"){
            div.innerHTML = `<i class="bi bi-arrow-up-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
        } else {
            div.innerHTML = `<i class="bi bi-arrow-down-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
        }
        divRegistros.appendChild(div)
    });
}

filter.addEventListener('change', () => {
    switch (filter.value) {
        case 'noFilter':
            divRegistros.innerHTML = ''
            if(reciboArray.length == 0){
                divRegistros.innerHTML = '<p style="font-size: 2em; margin: 20px 10px">Sin registros...</p>'
            }else {
                reciboArray.forEach((item) => {
                    const div = document.createElement("div")
                    div.className = `container__registros-item`
                    div.id = `container__registros-item`
                    let fecha = new Date(item.fecha).toLocaleDateString();
                    //Si es un ingreso se muestra una flecha hacía arriba, sino hacia abajo
                    if(item.tipo === "Ingreso"){
                        div.innerHTML = `<i class="bi bi-arrow-up-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
                    } else {
                        div.innerHTML = `<i class="bi bi-arrow-down-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
                    }
                    divRegistros.appendChild(div)
                });
            }   
            break
            
        case 'ingresos':
            divRegistros.innerHTML = ''

            const arrayIngresos = reciboArray.filter((el) => el.tipo.includes('Ingreso'))
            if(arrayIngresos.length == 0){
                divRegistros.innerHTML = '<p style="font-size: 2em; margin: 20px 10px">Sin registros...</p>'
            }else {
                arrayIngresos.forEach((item) => {
                    const div = document.createElement("div")
                    div.className = `container__registros-item`
                    div.id = `container__registros-item`
                    let fecha = new Date(item.fecha).toLocaleDateString();
                    
                    div.innerHTML = `<i class="bi bi-arrow-up-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
                    divRegistros.appendChild(div)
                });
            }
            break

        case 'gastos':
            divRegistros.innerHTML = ''

            const arrayGastos = reciboArray.filter((el) => el.tipo.includes('Gasto'))
            if(arrayGastos.length == 0){
                divRegistros.innerHTML = '<p style="font-size: 2em; margin: 20px 10px">Sin registros...</p>'
            }else {
                arrayGastos.forEach((item) => {
                    const div = document.createElement("div")
                    div.className = `container__registros-item`
                    div.id = `container__registros-item`
                    let fecha = new Date(item.fecha).toLocaleDateString();
                    
                    div.innerHTML = `<i class="bi bi-arrow-down-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
                    divRegistros.appendChild(div)
                });
            }
            break

        case 'mes':
            divRegistros.innerHTML = ''

            if(reciboArray.length == 0){
                divRegistros.innerHTML = '<p style="font-size: 2em; margin: 20px 10px">Sin registros...</p>'
            }else {
                reciboArray.forEach((item) => {
                    let fecha = new Date(item.fecha).getMonth()
                    let mesActual = new Date().getMonth()

                    if(fecha == mesActual) {
                        fecha = new Date(item.fecha).toLocaleDateString()
                        const div = document.createElement("div")
                        div.className = `container__registros-item`
                        div.id = `container__registros-item`
                        if(item.tipo === "Ingreso"){
                            div.innerHTML = `<i class="bi bi-arrow-up-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
                        } else {
                            div.innerHTML = `<i class="bi bi-arrow-down-short" style="margin-right:5px; font-size: 1.5em"></i><p><span class="container__registros-item--tipo">${item.tipo}:</span> ${fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
                        }
                        divRegistros.appendChild(div)
                    }
                });
            }   
            break
    }
})

// =============== EVENTOS BOTONES ===============

// =============== CLICK BTN INGRESO ===============
btnIngreso.addEventListener('click', () => {
    container.classList.remove("container")
    containerDolar.style.display='none'
    container.innerHTML= `
    <div class="containerButton">
        <h2 class="tRegistroIngreso">Registro de Ingreso</h2>
        <form class="form" action="">
            <input id="inpDetalleIngreso" class="formInput" type="text" placeholder="Detalle" autocomplete="off">
            <input id="inpMontoIngreso" class="formInput" type="number" placeholder="Monto" autocomplete="off">
            <input type="submit" id="btnRegistroIngreso" class="btnRegistroIngreso" value="Registrar Ingreso">
            <button id="btnVolver" class="btnVolver">Volver</button>
        </form>
    </div>
    `
    containerDolar.style.display="none"
    const btnRegistroIngreso = document.querySelector('#btnRegistroIngreso')
    const inpDetalle = document.querySelector('#inpDetalleIngreso')
    const inpMonto = document.querySelector('#inpMontoIngreso')
    const btnVolver = document.querySelector('#btnVolver')

    btnRegistroIngreso.addEventListener('click', (e) => {
        e.preventDefault();
        if (inpDetalle.value == "" || inpMonto.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'No dejes espacios en blanco'
              })
        }else {
            let balance = +inpMonto.value + Number(localStorage.balance)

            localStorage.setItem('balance', balance)

            let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
            arrayBalance.push(new Ingreso(inpDetalle.value, inpMonto.value))
            localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));

            Toastify({
                text: "Ingreso registrado correctamente!",
                duration: 3000,
                offset: { 
                    y: 60
                },
                className: "tostada"
            }).showToast();

            inpDetalle.value = ""
            inpMonto.value = ""
        }
    })
    btnVolver.addEventListener('click', () => {
        location.reload()
    })
})

// =============== CLICK BTN GASTO ===============
btnGasto.addEventListener('click', () => {
    container.classList.remove("container")
    containerDolar.style.display='none'
    container.innerHTML= `
    <div class="containerButton">
        <h2 class="tRegistroIngreso">Registro de Gasto</h2>
        <form class="form" action="">
            <input id="inpDetalleIngreso" class="formInput" type="text" placeholder="Detalle" autocomplete="off">
            <input id="inpMontoIngreso" class="formInput" type="number" placeholder="Monto" autocomplete="off">
            <input type="submit" id="btnRegistroIngreso" class="btnRegistroIngreso" value="Registrar Gasto">
            <button id="btnVolver" class="btnVolver">Volver</button>
        </form>
    </div>
    `
    containerDolar.style.display="none"
    const btnRegistroIngreso = document.querySelector('#btnRegistroIngreso')
    const inpDetalle = document.querySelector('#inpDetalleIngreso')
    const inpMonto = document.querySelector('#inpMontoIngreso')
    const btnVolver = document.querySelector('#btnVolver')

    btnRegistroIngreso.addEventListener('click', (e) => {
        e.preventDefault();
        if (inpDetalle.value == "" || inpMonto.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'No dejes espacios en blanco'
              })
        }else {
            if(+inpMonto.value > +localStorage.balance){
                Swal.fire({
                    icon: 'error',
                    title: 'El monto supera al balance general',
                    text: `Balance: $${localStorage.balance}`,
                  })
            }else {
                let balance = Number(localStorage.balance) - Number(inpMonto.value)

                localStorage.setItem('balance', balance)

                let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
                arrayBalance.push(new Gasto(inpDetalle.value, inpMonto.value))
                localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));

                Toastify({
                    text: "Gasto registrado correctamente!",
                    duration: 3000,
                    offset: { 
                        y: 60
                    },
                    className: "tostada"
                }).showToast();
            
                inpDetalle.value = ""
                inpMonto.value = ""
            }
        }
    })
    btnVolver.addEventListener('click', () => {
        location.reload()
    })
})

// =============== REINICIAR LOCALSTORAGE ===============
let btnReiniciar = document.querySelector('#btnReiniciar')

btnReiniciar.addEventListener('click', () =>{
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Se reiniciaran todos los valores",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, reiniciar!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Datos borrados!',
                'Se han reiniciado los valores',
                'success',
            )
            localStorage.clear()
            setTimeout(()=> {
                location.reload()
            }, 1500)
        }
      })
})
// =============== CAMBIAR SECCION ===============
document.querySelector('.arrowDwn').addEventListener('click', () => {
    window.scrollBy(0, window.innerHeight);
})

document.querySelector('.arrowUp').addEventListener('click', () => {
    window.scrollBy(0, -window.innerHeight);
})

// =============== CAMBIO DE MONEDA ===============
const cambioBtn = document.querySelector('.contizacionHoy__btn')

cambioBtn.addEventListener('click', () => {
    const moneda = document.querySelector('.contizacionHoy__select').value
    const mostrarCambio = document.querySelector('.contizacionHoy__result')
    const urlExchangeUsd = `https://v6.exchangerate-api.com/v6/85bbd3d8579a2bb85201db9f/pair/USD/${moneda}`
    const urlExchangeEur = `https://v6.exchangerate-api.com/v6/85bbd3d8579a2bb85201db9f/pair/EUR/${moneda}`
    
    if(moneda == ''){
        Swal.fire({
            icon: 'error',
            title: 'Debes que elegir una moneda'
          })
    }else{
        mostrarCambio.innerHTML = `<h3><span>Dolar=</span> CARGANDO...</h3><h3><span>Euro=</span> CARGANDO...</h3>`
        fetch(urlExchangeUsd)
            .then((res => {return res.json()}))
            .then(cambio => {
                let cambioUsd = Number(cambio.conversion_rate).toFixed(2) 
                
                fetch(urlExchangeEur)
                    .then((res => {return res.json()}))
                    .then(cambio => {
                        console.log(urlExchangeEur);
                        console.log(cambio);
                        let cambioEur = Number(cambio.conversion_rate).toFixed(2)
                        mostrarCambio.innerHTML = `<h3><span>Dolar=</span> $${cambioUsd} ${moneda}</h3><h3><span>Euro=</span> $${cambioEur} ${moneda}</h3>`
                    })
                    .catch((err) => {
                        console.log(err)
                        alert(err)
                    })
            })
        
    }
})