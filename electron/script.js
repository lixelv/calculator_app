let currentWindow
let Decimal

try {
    const remote = require("@electron/remote")
    Decimal = require("decimal.js")
    currentWindow = remote.getCurrentWindow()
    console.log("Success import")
} catch (e) {
    console.log(e)
}

function getFromLocalStorage(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function change_setting(theme_number, setting) {
    // Находим все классы, начинающиеся с "theme-"
    const currentThemeClasses = Array.from(document.body.classList).filter(
        (theme) => theme.startsWith(setting + "-")
    )

    console.log(currentThemeClasses)
    // Удаляем каждый найденный класс
    currentThemeClasses.forEach((themeClass) => {
        document.body.classList.remove(themeClass)
    })

    // Добавляем новый класс темы
    document.body.classList.add(setting + "-" + theme_number)
    saveToLocalStorage("user_" + setting, theme_number)
}

const output = document.getElementById("output")

const keys = {
    Delete: "AC",
    Backspace: "⌫",
    Enter: "=",
    Escape: "×",
    Alt: "⌃",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    ",": ".",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "=": "=",
}

// region utils
let timers = {}
let uniqueIdCounter = 0
const display = document.getElementById("main-object")

function generateUniqueId() {
    uniqueIdCounter += 1
    return "unique-id-" + uniqueIdCounter
}

function animate(el, cls, duration) {
    // Проверяем, есть ли у элемента id, если нет - генерируем уникальный id
    if (!el.id) {
        el.id = generateUniqueId()
    }

    const elementId = el.id

    // Если элемент уже имеет анимационный класс, удаляем его и сбрасываем анимацию
    if (timers[elementId]) {
        el.classList.remove(timers[elementId].class)
        void el.offsetWidth // Принудительный reflow для сброса анимации
    }

    // Если существует таймер для этого элемента, очищаем его
    if (timers[elementId]) {
        clearTimeout(timers[elementId].timeout)
    }

    // Добавляем новый анимационный класс к элементу
    el.classList.add(cls)

    // Устанавливаем новый таймер для удаления класса после завершения анимации
    timers[elementId] = {
        class: cls,
        timeout: setTimeout(() => {
            el.classList.remove(cls)
            delete timers[elementId] // Удаляем запись таймера после его завершения
        }, duration),
    }
}
// endregion

class Calculator {
    constructor(output) {
        this.output = output
        this.output.innerHTML = "0"
        this.prev_num = null
        this.current_number = null

        this.current_operation = null
        this.is_entered = false

        this.control = false
        this.operators = {
            AC: (value) => {
                this.AC_clear()
            },
            "⌃": (value) => {
                if (this.control) {
                    this.control = false
                } else {
                    this.control = true
                }
            },
            "⌫": this.clear_output.bind(this),
            "=": this.handle_eval.bind(this),
            "+": this.make_operation.bind(this),
            "-": (value) => {
                if (this.output.innerHTML === "0") {
                    this.output.innerHTML = "-"
                } else {
                    this.make_operation(value)
                }
            },
            "*": this.make_operation.bind(this),
            "/": this.make_operation.bind(this),
        }
        this.control_operations = {
            "+": () => this.change_size(1.1),
            "-": () => this.change_size(1 / 1.1),
            0: () => this.switch_buttons(),
            1: () => change_setting(1, "theme"),
            2: () => change_setting(2, "theme"),
            3: () => change_setting(3, "theme"),
            4: () => change_setting(1, "round"),
            5: () => change_setting(2, "round"),
            6: () => change_setting(3, "round"),
            7: () => change_setting(1, "font"),
            8: () => change_setting(2, "font"),
            9: () => change_setting(3, "font"),
        }
    }

    is_numeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    change_size(size) {
        let currentSize = currentWindow.getSize()

        let newHeight = currentSize[1] * size
        let newWidth = currentSize[0] * size

        if (newHeight < 200 || newHeight > 1200) {
            return
        }

        console.log(currentSize, newHeight, newWidth)

        // Вызываем метод для обновления размера окна
        currentWindow.setSize(Math.floor(newWidth), Math.floor(newHeight))

        // Обновляем размер окна

        updateWindowSize(newHeight) // updateWindowSize()
    }

    switch_buttons() {
        let current_state = localStorage.getItem("transparentButtons") || "0"
        current_state = Number(current_state) ? 0 : 1

        saveToLocalStorage("transparentButtons", current_state)
        if (current_state) {
            document.body.classList.add("no-button")
        } else {
            document.body.classList.remove("no-button")
        }
    }

    make_operation(value) {
        this.current_operation = value
        this.current_number = null
        this.prev_num = this.output.innerHTML

        this.output.innerHTML = "0"
    }

    handle_paste(text) {
        const expression = /[^0-9e\.\,\-\+]/

        if (expression.test(text)) {
            return ""
        } else {
            return text
        }
    }

    append_value(value) {
        if (
            this.output.innerHTML === "0" &&
            (this.is_numeric(value) || value === "-")
        ) {
            this.output.innerHTML = ""
        }
        this.output.innerHTML += value
    }

    AC_clear() {
        this.output.innerHTML = "0"

        this.is_entered = false

        this.current_number = null
        this.prev_num = null
        this.current_operation = null
    }

    clear_output() {
        if (this.output.innerHTML.length > 0 && this.output.innerHTML !== "0") {
            this.output.innerHTML = this.output.innerHTML.slice(0, -1)
        }
        if (this.output.innerHTML === "") {
            this.output.innerHTML = "0"
        }
    }

    calculate() {
        const last_num = new Decimal(
            this.current_number || this.output.innerHTML
        )

        if (this.current_operation && this.prev_num) {
            const prev = new Decimal(this.prev_num)
            switch (this.current_operation) {
                case "+":
                    return prev.plus(last_num)
                case "-":
                    return prev.minus(last_num)
                case "*":
                    return prev.times(last_num)
                case "/":
                    return prev.dividedBy(last_num)
            }
        } else {
            return last_num
        }
    }

    handle_eval() {
        let result = this.calculate()
        if (this.current_number === null) {
            this.current_number = this.output.innerHTML
        }
        this.prev_num = result

        if (result.isFinite()) {
            result = result.toString()
            // if (result[result.length - 1] === "-") {
            //     result = result.slice(0, -1)
            // }
            this.show_success(result)
        } else {
            this.show_error(`Invalid expression: ${this.output.innerHTML}`)
        }
    }

    handle_operation(value) {
        if (this.control && value in this.control_operations) {
            this.control_operations[value]()
        } else if (value in this.operators) {
            try {
                this.operators[value](value)
            } catch (e) {
                this.show_error(e)
            }
        } else if (this.is_numeric(value)) {
            this.append_value(value)
        }
    }

    handle_press(value) {
        if (value == "×") {
            window.close()
        }

        if (this.output.innerHTML === "0" && value !== ".") {
            this.handle_operation(value)
        } else if (this.output.innerHTML === "ERROR") {
            this.AC_clear()
            this.handle_press(value)
        } else if (value == "." && !this.output.innerHTML.includes(".")) {
            this.output.innerHTML += value
        } else {
            this.handle_operation(value)
        }
    }

    show_error(error) {
        console.log(error)
        const element = display
        this.output.innerHTML = "ERROR"
        animate(element, "error", 800)
    }

    show_success(result) {
        console.log(result)
        const element = display
        this.output.innerHTML = result
        animate(element, "success", 800)
    }
}

let calculator = new Calculator(output)

// document.addEventListener("DOMContentLoaded", updateWindowSize)

function handle_button_click(button) {
    button.onclick = () => {
        if (button.innerHTML === "⌃") {
            if (button.classList.contains("activated-button")) {
                button.classList.remove("activated-button")
            } else {
                button.classList.add("activated-button")
            }
        }
        animate(button, "animated", 600)
        calculator.handle_press(button.innerHTML)
    }
}

Array.from(document.getElementsByClassName("number-button")).forEach(
    handle_button_click
)
Array.from(document.getElementsByClassName("operation-button")).forEach(
    handle_button_click
)
Array.from(document.getElementsByClassName("close-button")).forEach(
    handle_button_click
)

document.addEventListener("keydown", (event) => {
    if (event.key in keys) {
        const value = keys[event.key]
        const elements = Array.from(document.getElementsByTagName("button"))

        if (event.key == "Enter") {
            event.preventDefault()
        }

        elements.forEach((el) => {
            if (el.innerHTML == value) {
                el.click()
            }
        })
    }
})

document.addEventListener("keydown", (event) => {
    console.log(`Нажата клавиша: ${event.key}`)
})

document.addEventListener("paste", function (event) {
    // Отключаем стандартное поведение, если это необходимо
    event.preventDefault()

    // Получаем данные из буфера обмена
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedData = calculator.handle_paste(clipboardData.getData("Text"))

    calculator.append_value(pastedData)
    const element = display
    animate(element, "copy-paste", 800)
})

document.addEventListener("copy", function (event) {
    // Отключаем стандартное поведение, если это необходимо
    event.preventDefault()
    let content = calculator.output.innerHTML

    if (content == "ERROR") {
        content = "0"
    }

    if (navigator.clipboard) {
        // Вставляем текстовые данные в буфер обмена
        navigator.clipboard.writeText(content)
        const element = display
        animate(element, "copy-paste", 800)
    } else {
        console.error("Clipboard API not supported")
    }
})

// contextBridge.exposeInMainWorld("electron", {
//     resizeWindow: (width, height) =>
//         ipcRenderer.send("resize-window", width, height),
// })

function handle_setting(setting) {
    const value = getFromLocalStorage("user_" + setting) || "1"
    console.log(setting + "-" + value)
    document.body.classList.add(setting + "-" + value)
}

document.addEventListener("DOMContentLoaded", () => {
    ;["theme", "round", "font"].forEach(handle_setting)

    const buttons_state = getFromLocalStorage("transparentButtons") || "0"
    if (Number(buttons_state)) {
        document.body.classList.add("no-button")
    }

    position = getFromLocalStorage("position")
    currentWindow.setBounds({
        x: position["x"],
        y: position["y"],
    })
    updateWindowSize(getFromLocalStorage("windowHeight"))

    // Remove the hidden class when the app is ready
    document.body.style = ""
})

if (currentWindow !== undefined) {
    function updateWindowSize(height) {
        const ratio = 1.5

        height = height || window.height
        let width = height / ratio

        height = Math.ceil(height)
        width = Math.ceil(width)
        // Добавляем небольшой отступ для безопасности

        currentWindow.setSize(width, height)
        saveToLocalStorage("windowHeight", height)
        console.log(currentWindow.getBounds(), height, width)
    }
    // window.addEventListener("resize", updateWindowSize)

    display.onmousedown = function (event) {
        // Получаем текущую позицию окна
        let windowBounds = currentWindow.getBounds()

        // Запоминаем начальную позицию курсора
        let startMouseX = event.screenX
        let startMouseY = event.screenY

        function onMouseMove(event) {
            // Вычисляем смещение курсора
            let deltaX = event.screenX - startMouseX
            let deltaY = event.screenY - startMouseY

            // Перемещаем окно на это смещение
            currentWindow.setBounds({
                x: windowBounds.x + deltaX,
                y: windowBounds.y + deltaY,
                width: windowBounds.width,
                height: windowBounds.height,
            })
        }

        document.addEventListener("mousemove", onMouseMove)

        display.onmouseup = function () {
            document.removeEventListener("mousemove", onMouseMove)

            let windowBounds = currentWindow.getBounds()
            saveToLocalStorage("position", {
                x: windowBounds.x,
                y: windowBounds.y,
            })

            display.onmouseup = null
        }

        event.preventDefault() // Предотвращаем стандартное поведение
    }
} else {
    function updateWindowSize() {
        alert("Not supported on this platform")
    }
}
