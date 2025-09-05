export type LogEntry = {
    id: string;
    typeId: string;
    timestamp: Date;
    unix: number;
    note: string | null;
    description: string | null;
    score: number;
};

export type LogType = {
    id: string;
    name: string;
    icon: string;
    color: string;
};

export type LogEntryData = {
    log_entries: LogEntry;
    log_types: LogType;
};

export type InitialData = Partial<{
    id: string;
    typeId: string;
    logTypeName: string;
    note: string;
    description: string;
    score: number;
    timestamp: Date;
    selectedTags: { id: string; label: string }[];
    selectedTagIds: string[];
}>;

export type Entries = LogEntryData[] | never[];

export type Result<T> = {
    ok: boolean;
    error?: string;
    data?: T;
};
