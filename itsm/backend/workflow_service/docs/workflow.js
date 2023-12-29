// Load the workflow JSON file
const workflow = require('./tsk_ticket_workflow_v2.json');

/* TODO:
Workflow Engine Features
1. validate when user update status
    - get the new status user trying to update and validate with its previous step.
2. persist all the workflow steps in database by ticket id user followed
3. workflow can be created only once.
4. Edit the workflow impacts previously created tickets has to be considered, can be done with running migrations scripts.
5. User can move forth and back between workflow status
6. A new workflow can be created by Uploading json with steps.
7. Newly created workflow has to be validated before creation.
8. Only Admin can create/upload workflow.
9. Workflows created has to be mapped against ticket type.
*/

// Define a function to execute a step
function executeStep(step) {
  console.log(`Executing step ${step.name}: ${step.description}`);
  // Perform any necessary logic here...
}

// Define a function to process a workflow
function processWorkflow(workflow) {
  let currentStep = workflow.steps[0];
  while (currentStep.type !== 'end') {
    executeStep(currentStep);
    // Determine the next step(s) based on the step type
    if (currentStep.type === 'task') {
      currentStep = workflow.steps.find(step => step.id === currentStep.next[0]);
    } else if (currentStep.type === 'decision') {
      // Prompt the user to select an option
      // For simplicity, we'll just choose the first option for now
      const selectedOption = currentStep.options[1];
      currentStep = workflow.steps.find(step => step.id === selectedOption.next[0]);
    } else {
      // Handle any other step types as needed
    }
  }
  // We've reached the end of the workflow
  console.log('Workflow complete!');
}


// Next Step in Workflow Given Current Step
// TODO: Incase of Decision, valid next step has to be choosen
function getNextStep(currentStep) {
  let nextStep = {}
  // Determine the next step(s) based on the step type
  if (currentStep.type === 'task') {
    nextStep = workflow.steps.find(step => step.id === currentStep.next[0]);
  } else if (currentStep.type === 'decision') {
    // Prompt the user to select an option
    // For simplicity, we'll just choose the first option for now
    // TODO: for decision list of options have to be returned
    const selectedOption = currentStep.options[0];
    nextStep = workflow.steps.find(step => step.id === selectedOption.next[0]);
  } else if (currentStep.type === 'end') {
    // We've reached the end of the workflow
    console.log('Last step in workflow!');
    nextStep = currentStep
  } else {
    // Handle any other step types as needed
    console.log("Unhandled type in workflow")
  }
  return nextStep
}


function getStepById(stepId) {
  let step = workflow.steps.find(step => step.id === stepId);
  return step;
}

function getNextStepById(currentStepId) {
  currentStep = getStepById(currentStepId)
  nextStep = getNextStep(currentStep)
  console.log(nextStep)
}

function getCurrentStepType(currentStepId) {
  currentStep = getStepById(currentStepId)
  return currentStep.type;
}

// TODO: Update workflow step should validate against workflow
// TODO: Validate the workflow json for any deadlocks and infinite loops
function validateWorkflowNextStep(currentStepId, nextStepId) {
  console.log("currentStepId: ", currentStepId)
  console.log("nextStepId: ", nextStepId)

  let currentStep = workflow.steps.find(step => step.id === currentStepId);
  console.log(currentStep)
  currentStepType = getCurrentStepType(currentStepId)
  isValid = false;
  console.log(currentStepType)
  switch (currentStepType) {
    case "decision":
      // check the next step is in array of options
      // get options in array
      currentStep = getStepById(currentStepId)
      for (const option of currentStep.options) {
        if (nextStepId === option.next[0]) {
          isValid = true
          break;
        }
      }
      break;
    case "task":
      console.log("inside task")
      console.log(currentStep.next[0], nextStepId)
      if (currentStep.next[0] === nextStepId)
        isValid = true;
      break;
    default:
      break;
  }
  return (isValid)
}


//  represent workflow
function traverseWorkflow() {
  /* TODO: 
  - check valid workflow json
  - start with first step and traverse through next step
  - for decision block append * to step id
  - result has to be saved in array of arrays
  - continue until end block is found
  */

  //  get first step
  workflow_traversal = []

  let currentStep = workflow.steps[0];
  workflow_traversal.push(currentStep.id)

  while (currentStep.type !== 'end') {
    executeStep(currentStep);
    // Determine the next step(s) based on the step type
    if (currentStep.type === 'task') {
      currentStep = workflow.steps.find(step => step.id === currentStep.next[0]);
      workflow_traversal.push(currentStep.id)
    } else if (currentStep.type === 'decision') {
      // Prompt the user to select an option
      // For simplicity, we'll just choose the first option for now
      // TODO: traversal in case of decision block has to be addressed
      const selectedOption = currentStep.options[0];
      prevStep = workflow_traversal.pop()
      workflow_traversal.push(`${prevStep}*`)
      currentStep = workflow.steps.find(step => step.id === selectedOption.next[0]);
      workflow_traversal.push(`${currentStep.id}`)
    } else {
      // Handle any other step types as needed
    }
  }
  // We've reached the end of the workflow
  console.log('Workflow complete!');
  console.log(workflow_traversal)
}

// Call the processWorkflow function with the loaded workflow JSON
processWorkflow(workflow);

console.log('*****************')
nextStep = getNextStep({
  "id": 5,
  "name": "Step 5",
  "description": "This is the final step in the workflow.",
  "type": "end"
})

console.log(nextStep)

console.log('*****************')
getNextStepById(2)

console.log('*****************')
type = getCurrentStepType(5)
console.log(type)

console.log('*****************')
isValid = validateWorkflowNextStep(2, 4)
console.log(isValid)

console.log('*****************')
traverseWorkflow()