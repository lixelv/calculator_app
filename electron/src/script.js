// region imports
let currentWindow
let Decimal

// Importing main modules
const remote = require("@electron/remote")
Decimal = require("decimal.js")
currentWindow = remote.getCurrentWindow()

console.log("Success import")

// New containts foranimate
let timers = {}
let uniqueIdCounter = 0

// Global constants for showing the calc result and for animation effect
const display = document.getElementById("main-object")
const output = document.getElementById("output")
const options = ["theme", "round"]

// Keys, that are compare with calculator buttons
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

// endregion
// region utils
// Using local storage with JSON for save and get data
function getFromLocalStorage(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function change_setting(theme_number, setting) {
    // Search for all classes that start with setting + "-"
    const currentThemeClasses = Array.from(document.body.classList).filter(
        (theme) => theme.startsWith(setting + "-")
    )

    // Remove all classes that start with setting + "-"
    console.log(currentThemeClasses)
    currentThemeClasses.forEach((themeClass) => {
        document.body.classList.remove(themeClass)
    })

    // Adding new class with setting + "-" + theme_number
    document.body.classList.add(setting + "-" + theme_number)
    saveToLocalStorage("user_" + setting, theme_number)
}

// Function generates unique id for animate func
function generateUniqueId() {
    uniqueIdCounter += 1
    return "unique-id-" + uniqueIdCounter
}

function animate(el, cls, duration) {
    // Check if the element has an id, if not - generate unique id
    if (!el.id) {
        el.id = generateUniqueId()
    }

    const elementId = el.id

    // If element already has animation class, remove it and reset animation
    if (timers[elementId]) {
        el.classList.remove(timers[elementId].class)
        void el.offsetWidth // Set reflow for reset animation
    }

    // Remove the timer if it exists
    if (timers[elementId]) {
        clearTimeout(timers[elementId].timeout)
    }

    // Add the animation class to the element
    el.classList.add(cls)

    // Set new timer for removing the animation class after the animation duration
    timers[elementId] = {
        class: cls,
        timeout: setTimeout(() => {
            el.classList.remove(cls)
            delete timers[elementId] // Delete the timer after the animation is complete
        }, duration),
    }
}

// Function for handle settings on start
function handle_setting(setting) {
    const value = getFromLocalStorage("user_" + setting) || 1
    document.body.classList.add(setting + "-" + value)
}

function on_start() {
    // Handle settings
    options.forEach(handle_setting)

    // Handle transparent buttons
    const buttons_state = getFromLocalStorage("transparentButtons") || "0"
    if (Number(buttons_state)) {
        document.body.classList.add("no-button")
    }

    // Handle position
    position = getFromLocalStorage("position")
    if (position) {
        currentWindow.setBounds({
            x: position["x"],
            y: position["y"],
        })
    }

    // Handle window size
    updateWindowSize(getFromLocalStorage("windowHeight") || 400, true)

    // Remove the hidden class when the app is ready
    document.body.style = ""

    // Also update the font size from local storage
    document.body.style.setProperty(
        "--theme-relative-font-size",
        getFromLocalStorage("fontSize") || 1
    )
}
// endregion
// region calculator

// Class for calculator, used to handle button clicks
class Calculator {
    constructor(output) {
        // Init variables for previous number and current operation, also setting the output on "0"
        // Current number was mad to handle pressing = multiple times
        this.output = output
        this.output.innerHTML = "0"
        this.prev_num = null
        this.current_number = null

        this.current_operation = null
        this.is_entered = false

        this.control = false

        // Init operators and control operations for handle button clicks
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
            "*": () => this.change_font_size(1.02),
            "/": () => this.change_font_size(1 / 1.02),
            AC: () => this.clear_settings(),
            0: () => this.switch_buttons(),
            1: () => change_setting(1, "theme"),
            2: () => change_setting(2, "theme"),
            3: () => change_setting(3, "theme"),
            4: () => change_setting(1, "round"),
            5: () => change_setting(2, "round"),
            6: () => change_setting(3, "round"),
        }
    }

    // Function for checking if string is numeric
    is_numeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    // Function for change window size
    change_size(size) {
        const currentSize = currentWindow.getSize()
        const newHeight = currentSize[1] * size

        // If new screen is too big or too small we are exiting function
        if (newHeight < 200 || newHeight > 1200) {
            return
        }

        // Changing window size
        updateWindowSize(newHeight)
    }

    change_font_size(size) {
        const currentFontSize = getComputedStyle(
            document.body
        ).getPropertyValue("--theme-relative-font-size")

        const newFontSize = Number(currentFontSize) * size

        // If new screen is too big or too small we are exiting function
        if (newFontSize < 0.5 || newFontSize > 1.2) {
            return
        }

        document.body.style.setProperty(
            "--theme-relative-font-size",
            newFontSize || 1
        )

        saveToLocalStorage("fontSize", newFontSize)
    }

    // Function for switch buttons from transparent to not transparent and ovice versa
    switch_buttons() {
        // Getting current state
        let current_state = localStorage.getItem("transparentButtons") || "0"
        current_state = Number(current_state) ? 0 : 1

        // Saving current state
        saveToLocalStorage("transparentButtons", current_state)

        // Switching class
        if (current_state) {
            document.body.classList.add("no-button")
        } else {
            document.body.classList.remove("no-button")
        }
    }

    // Function for clear settings
    clear_settings() {
        document.body.classList = ["transition"]
        document.body.style = ""

        options.forEach((option) => {
            document.body.classList.add(option + "-1")
            saveToLocalStorage("user_" + option, 1)
        })
        saveToLocalStorage("transparentButtons", 0)
        saveToLocalStorage("fontSize", 1)
    }

    // Function for enterung the second number
    make_operation(value) {
        this.current_operation = value
        this.current_number = null
        this.prev_num = this.output.innerHTML

        this.output.innerHTML = "0"
    }

    // Function for handle paste if it is legit
    handle_paste(text) {
        const expression = /[^0-9e\.\,\-\+]/

        if (expression.test(text)) {
            return ""
        } else {
            return text
        }
    }

    // Function adding a number to the output
    append_value(value) {
        if (
            this.output.innerHTML === "0" &&
            (this.is_numeric(value) || value === "-")
        ) {
            this.output.innerHTML = ""
        }
        this.output.innerHTML += value
    }

    // Function for clearing the output
    AC_clear() {
        this.output.innerHTML = "0"

        this.is_entered = false

        this.current_number = null
        this.prev_num = null
        this.current_operation = null
    }

    // Function for removing the last one symbol
    // And it handles 0 as well, like "ERROR" also
    clear_output() {
        if (this.output.innerHTML.length > 0 && this.output.innerHTML !== "0") {
            this.output.innerHTML = this.output.innerHTML.slice(0, -1)
        }
        if (this.output.innerHTML === "") {
            this.output.innerHTML = "0"
        }
    }

    // Function for calculating the result
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

    // Function for evaluating the result
    handle_eval() {
        let result = this.calculate()

        // Saving the second number as number for new operation
        // To handle multiple =
        if (this.current_number === null) {
            this.current_number = this.output.innerHTML
        }

        // Saving the result as fisrt operation number
        this.prev_num = result

        // If result is not finite we are showing error
        if (result.isFinite()) {
            result = result.toString()
            this.show_success(result)
        } else {
            this.show_error(`Invalid expression: ${this.output.innerHTML}`)
        }
    }

    // Function for handling operations
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

    // Function for handling button presses
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

    // Function for showing errors
    show_error(error) {
        console.log(error)
        const element = display
        this.output.innerHTML = "ERROR"
        animate(element, "error", 800)
    }

    // Function for showing successful results
    show_success(result) {
        console.log(result)
        const element = display
        this.output.innerHTML = result
        animate(element, "success", 800)
    }
}

let calculator = new Calculator(output)

// Function for handling button clicks
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

// Function for handling keydown events
function handle_keydown(event) {
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
}

// Function for handling paste events
function handle_paste(event) {
    // Disable default behavior if necessary
    event.preventDefault()

    // Get data from clipboard
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedData = calculator.handle_paste(clipboardData.getData("Text"))

    calculator.append_value(pastedData)
    const element = display
    animate(element, "copy-paste", 800)
}

// Function for handling copy events
function handle_copy(event) {
    // Disable default behavior if necessary
    event.preventDefault()
    let content = calculator.output.innerHTML

    if (content == "ERROR") {
        content = "0"
    }

    if (navigator.clipboard) {
        // Insert text data into clipboard
        navigator.clipboard.writeText(content)
        const element = display
        animate(element, "copy-paste", 800)
    } else {
        console.error("Clipboard API not supported")
    }
}

document.addEventListener("keydown", handle_keydown)
document.addEventListener("paste", handle_paste)
document.addEventListener("copy", handle_copy)
document.addEventListener("DOMContentLoaded", on_start)
Array.from(document.getElementsByClassName("number-button")).forEach(
    handle_button_click
)
Array.from(document.getElementsByClassName("operation-button")).forEach(
    handle_button_click
)
Array.from(document.getElementsByClassName("close-button")).forEach(
    handle_button_click
)
// endregion
// region electron

if (currentWindow !== undefined) {
    function updateWindowSize(height, first_time = false) {
        const ratio = 1.5
        let removed = false

        height = height || window.height
        let width = height / ratio

        height = Math.ceil(height)
        width = Math.ceil(width)
        // Add a small margin for safety

        if (!first_time) {
            document.body.classList.remove("transition")
            removed = true
        }

        currentWindow.setSize(width, height)
        saveToLocalStorage("windowHeight", height)
        console.log(currentWindow.getBounds(), height, width)

        if (!first_time && removed) {
            setTimeout(() => document.body.classList.add("transition"), 50)
        }
    }
    // window.addEventListener("resize", updateWindowSize)

    display.onmousedown = function (event) {
        // Get current window position
        let windowBounds = currentWindow.getBounds()

        // Remember initial cursor position
        let startMouseX = event.screenX
        let startMouseY = event.screenY

        function onMouseMove(event) {
            // Calculate cursor offset
            let deltaX = event.screenX - startMouseX
            let deltaY = event.screenY - startMouseY

            // Move window by this offset
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

        event.preventDefault() // Prevent default behavior
    }
} else {
    function updateWindowSize() {
        alert("Not supported on this platform")
    }
}

// endregion
