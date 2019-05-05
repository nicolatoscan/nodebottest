import { ContextMessageUpdate } from "telegraf"

export abstract class BaseCommandController {
    constructor() {
    }

    abstract cmd(ctx: ContextMessageUpdate): void
}