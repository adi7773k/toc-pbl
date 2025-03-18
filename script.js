document.getElementById('convertButton').addEventListener('click', function() {
    const algorithmInput = document.getElementById('algorithmInput').value;
    const resultDiv = document.getElementById('result');

    if (algorithmInput.trim() === "") {
        resultDiv.innerText = "Please enter an algorithm.";
        return;
    }

    const turingSteps = convertToTuringMachineSteps(algorithmInput);
    resultDiv.innerText = turingSteps.join('\n');

    // Reset animation
    resultDiv.style.opacity = 0; // Start hidden
    resultDiv.style.transform = 'translateY(20px)'; // Start slightly below
    void resultDiv.offsetWidth; // Trigger reflow to restart animation
    resultDiv.style.opacity = 1; // Fade in
    resultDiv.style.transform = 'translateY(0)'; // Move to original position
});

function convertToTuringMachineSteps(algorithm) {
    const steps = [];
    const lines = algorithm.split('\n');

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith("if")) {
            steps.push(`Check condition: ${line}`);
            steps.push("Transition to appropriate state based on condition.");
        } else if (line.startsWith("while")) {
            steps.push(`Start loop: ${line}`);
            steps.push("Transition to loop state.");
        } else if (line.startsWith("print")) {
            steps.push(`Output: ${line.replace("print", "").trim()}`);
        } else if (line.startsWith("assign")) {
            steps.push(`Assign value: ${line.replace("assign", "").trim()}`);
        } else if (line.startsWith("return")) {
            steps.push(`Return value: ${line.replace("return", "").trim()}`);
        } else if (line.length > 0) {
            steps.push(`Execute: ${line}`);
        }
    });

    return steps;
}