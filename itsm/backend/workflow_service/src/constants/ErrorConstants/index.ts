import { ActionErrors } from "./actions.errors";
import { NodesErrors } from "./nodes.errors";
import { ValidationErrors } from "./validation.error";
import { WorkflowErros } from "./workflow.errors";
import {TestApiErrors} from './testApi.errors'
export const ErrorConstants = {
    ActionErrors: ActionErrors,
    ValidationErrors: ValidationErrors,
    NodesErrors: NodesErrors,
    WorkFlowErrors: WorkflowErros,
    TestApiErrors:TestApiErrors
}