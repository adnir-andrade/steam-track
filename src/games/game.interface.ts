export interface Game {
    id: number;
    name: string;
    genre?: string;
    main_story_hours?: number;
    completionist_hours?: number;
    total_achievements?: number;
}