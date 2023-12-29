import { scheduleMigrationAction, scheduleMigrationOptions, scheduleMigrationService } from "./migration";


export const crons = {
    migration: {
        schedulerAction: scheduleMigrationAction,
        scheduleService: scheduleMigrationService,
        schedulerOptions: scheduleMigrationOptions
    }
}