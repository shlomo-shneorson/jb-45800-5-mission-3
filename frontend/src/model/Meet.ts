import type { DevGroup } from "./DevGroup";
import type { DraftMeet } from "./DraftMeet";

export interface Meet extends DraftMeet{
    id:string,
    devGroup:DevGroup
} 