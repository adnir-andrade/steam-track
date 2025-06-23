export interface UserGame {
    id: number;
    userId: number;
    gameId: number;
    statusId: number;
    achievements_unlocked: number;
    is_favorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}